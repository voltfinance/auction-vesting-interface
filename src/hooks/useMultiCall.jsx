// import { Interface, FunctionFragment } from '@ethersproject/abi'
// import { Contract } from '@ethersproject/contracts'
import { useMemo, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { useActiveWeb3React } from './'
// import { useBlockNumber } from './'

// import { useWeb3Context } from "../context/web3";
// import MULTICALL_ABI from '@/constants/abis/multicall.json'
import { useMultiCallContract } from "./useContract";
import { useAsyncWeb3Call } from './'

function useAggregateCallData(calls){
  // calls: [{contract: Contract, method: String(methodName), args: [arguments]}, {...}]
  return useMemo(() => calls?.map(({contract, method, args}) => {
    if(!contract || !contract.methods[method] || !args) return
    return {
      target: contract._address,
      callData: contract.methods[method](...args).encodeABI()
    }
  }), [calls])
}

export function useSingleCallSetResult(contract, method, args, setResult){
  const multiCall = useMultiCallContract()
  const callData = useAggregateCallData([{contract, method, args}])
  const promise = useMemo(() => {
    if(!multiCall) return
    return multiCall.methods.aggregate(callData).call()
  }, [multiCall, contract, method, args])

  useAsyncWeb3Call(promise, setResult, [])    
}

export function useSingleCallResult(contract, method, args){
  const multiCall = useMultiCallContract()
  const callData = useAggregateCallData([{contract, method, args}])
  const [result, setResult] = useState(undefined)
  const promise = useMemo(() => {
    if(!multiCall) return
    return multiCall.methods.aggregate(callData).call()
  }, [multiCall, contract, method, args])

  useAsyncWeb3Call(promise, setResult, [])
  return result
}

export function useSingleCallMultiData(contract, method, argsArray){
  const multiCall = useMultiCallContract()
  const calls = useMemo(() => {
    return argsArray?.map((args) => {
      return {contract, method, args}
    })
  }, [contract, method, argsArray])
  const callData = useAggregateCallData(calls)
  const [result, setResult] = useState(undefined)
  const promise = useMemo(() => {
    if(!multiCall || !callData) return
    return multiCall.methods.aggregate(callData).call()
  
  }, [multiCall, contract, callData])
  promise?.then(setResult) // TODO use hooks
  // useAsyncWeb3Call(promise, setResult, [])
  return result
}

export function useMultiCallSameData(contracts, method, args) {
  const multiCall = useMultiCallContract()
  const calls = useMemo(() => {
    if(!contracts || !method || !args) return 
    return contracts.map((contract) => {
      return {contract, method, args}
    })
  }, [contracts, method, args])
  const callData = useAggregateCallData(calls)
  const [result, setResult] = useState(undefined)
  const promise = useMemo(() => {
    if(!multiCall || !callData) return
    return multiCall.methods.aggregate(callData).call()
  }, [multiCall, contracts, callData])

  useAsyncWeb3Call(promise, setResult, [])
  return result
}

export function useMultiCall(contracts, methods, argsArray){
  const multiCall = useMultiCallContract()
  const calls = useMemo(() => {
    if(!contracts || !methods || !argsArray || contracts.length != methods.length || methods.length != argsArray.length) return
    return argsArray.map((args, i) => {
      return {contract: contracts[i], method: methods[i], args: argsArray[i]}
    })
  }, [contracts, methods, argsArray])
  const callData = useAggregateCallData(calls)
  const [result, setResult] = useState(undefined)
  const promise = useMemo(() => {
    if(!multiCall || !callData) return
    return multiCall.methods.aggregate(callData).call()
  }, [multiCall, contracts, callData])

  useAsyncWeb3Call(promise, setResult, [])
  return result
}

