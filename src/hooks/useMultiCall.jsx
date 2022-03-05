// import { Interface, FunctionFragment } from '@ethersproject/abi'
// import { Contract } from '@ethersproject/contracts'
import { useMemo, useState, useCallback, useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { useActiveWeb3React } from './'
// import { useBlockNumber } from './'

// import { useWeb3Context } from "../context/web3";
// import MULTICALL_ABI from '@/constants/abis/multicall.json'
import { useMultiCallContract } from './useContract'
import { useAsyncWeb3Call } from './'
import { multicastChannel } from 'redux-saga'

function useAggregateCallData(calls) {
  // calls: [{contract: Contract, method: String(methodName), args: [arguments]}, {...}]
  return useMemo(
    () =>
      calls?.map(({ contract, method, args }) => {
        if (!contract || !contract.methods[method] || !args) return
        return {
          target: contract._address,
          callData: contract.methods[method](...args).encodeABI(),
        }
      }),
    [calls],
  )
}

export function useDoubleMultiCallSingleMethod(callObjects) {
  const multiCall = useMultiCallContract()
  const firstLvlCalls = useMemo(() => {
    let multiCalls = callObjects?.map(({ contract, method, argsArray }) => {
      return argsArray?.map((args) => {
        return { contract, method, args }
      })
    })
    multiCalls?.map((calls) => {
      return calls?.map(({ contract, method, args }) => {
        if (!contract || !args) return
        return {
          target: contract?.address,
          callData: contract.methods[method](...args).encodeABI(),
        }
      })
    })
  }, [callObjects])
  const calls = useMemo(() => {
    return firstLvlCalls?.map((multiCalls) => {
      return {
        contract: multiCall,
        method: 'aggregate',
        args: multiCall?.methods?.aggregate(multiCalls)?.encodeABI(),
      }
    })
  }, [firstLvlCalls, multiCall])
  const callData = useAggregateCallData(calls)
  return useMultiCallResult(callData)
}

function useMultiCallResult(callData) {
  const multiCall = useMultiCallContract()
  const [result, setResult] = useState(undefined)
  // useEffect(() => {
  //   if(!multiCall || !callData) return
  //   multiCall.methods.aggregate(callData).call().then(setResult)
  // }, [multiCall, callData])

  const fetchResult = useCallback(async () => {
    if (multiCall) {
      const result = await multiCall.methods.aggregate(callData).call()
      setResult(result)
    }
  }, [setResult])

  useEffect(() => {
    if (callData && multiCall) {
      fetchResult()
    }
  }, [callData, multiCall])

  return result
}

export function useSingleCallSetResult(contract, method, args, setResult) {
  const multiCall = useMultiCallContract()
  const callData = useAggregateCallData([{ contract, method, args }])
  const promise = useMemo(() => {
    if (!multiCall) return
    return multiCall.methods.aggregate(callData).call()
  }, [multiCall, contract, method, args])

  useAsyncWeb3Call(promise, setResult, [])
}

export function useSingleCallResult(contract, method, args) {
  const callData = useAggregateCallData([{ contract, method, args }])
  return useMultiCallResult(callData)
}

export function useSingleCallMultiData(contract, method, argsArray) {
  const calls = useMemo(() => {
    return argsArray?.map((args) => {
      return { contract, method, args }
    })
  }, [contract, method, argsArray])
  const callData = useAggregateCallData(calls)
  return useMultiCallResult(callData)
}

export function useMultiCallSameData(contracts, method, args) {
  const calls = useMemo(() => {
    if (!contracts || !method || !args) return
    return contracts.map((contract) => {
      return { contract, method, args }
    })
  }, [contracts, method, args])
  const callData = useAggregateCallData(calls)
  return useMultiCallResult(callData)
}

export function useMultiCall(contracts, methods, argsArray) {
  const calls = useMemo(() => {
    if (
      !contracts ||
      !methods ||
      !argsArray ||
      contracts.length != methods.length ||
      methods.length != argsArray.length
    )
      return
    return argsArray.map((args, i) => {
      return { contract: contracts[i], method: methods[i], args: argsArray[i] }
    })
  }, [contracts, methods, argsArray])
  const callData = useAggregateCallData(calls)
  return useMultiCallResult(callData)
}
