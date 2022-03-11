import { useMemo, useState, useEffect } from 'react'
import { useMultiCallContract } from './useContract'
import { useWeb3Context } from '../context/web3'

export default function useSingleContractCall (contract, method, args = []) {
  const { chainId } = useWeb3Context()

  const [result, setResult] = useState(null)

  const memoArgs = useMemo(() => args, [args])

  const call = async () => {
    if (!contract || !method || (result && result.returnData.length)) return

    const callResult = await contract.methods[method](...memoArgs).call()
    setResult(callResult)
  }

  useEffect(() => {
    call()
  }, [contract, method, memoArgs, chainId])

  return result
}

function useAggregateCallData (calls) {
  // calls: [{contract: Contract, method: String(methodName), args: [arguments]}, {...}]
  return useMemo(
    () => {
      return calls?.map(({ contract, method, args }) => {
        if (!contract || !contract.methods[method] || !args) return
        return {
          target: contract._address,
          callData: contract.methods[method](...args).encodeABI()
        }
      })
    },
    [calls]
  )
}

export function useDoubleMultiCallSingleMethod (callObjects) {
  const multiCall = useMultiCallContract()
  const firstLvlCalls = useMemo(() => {
    const multiCalls = callObjects?.map(({ contract, method, argsArray }) => {
      return argsArray?.map((args) => {
        return { contract, method, args }
      })
    })
    return multiCalls?.map((_calls) => {
      return _calls?.map(({ contract, method, args }) => {
        if (!contract || !args) return
        return {
          target: contract?._address,
          callData: contract.methods[method](...args).encodeABI()
        }
      })
    })
  }, [callObjects])
  const calls = useMemo(() => {
    return firstLvlCalls?.map((multiCalls) => {
      return {
        contract: multiCall,
        method: 'aggregate',
        args: [[{ target: multiCall._address, callData: multiCall?.methods?.aggregate(multiCalls)?.encodeABI() }]]
      }
    })
  }, [firstLvlCalls, multiCall])
  const callData = useAggregateCallData(calls)
  const rawResult = useMultiCallResult(callData)
  const { web3 } = useWeb3Context()
  return useMemo(() => {
    if (!rawResult || !web3) return []
    return Object.values(rawResult[1]).map((res) => {
      return web3.eth.abi.decodeParameters(['uint256', 'bytes[]'], res)
    }).map((res) => {
      return web3.eth.abi.decodeParameters(['uint256', 'bytes[]'], res[1][0])
    })
  }, [web3, rawResult])
}

function useMultiCallResult (callData) {
  const multiCall = useMultiCallContract()
  const result = useSingleContractCall(multiCall, 'aggregate', [callData])
  return result
}

export function useSingleCallResult (contract, method, args) {
  const callData = useAggregateCallData([{ contract, method, args }])
  return useMultiCallResult(callData)
}

export function useSingleCallMultiData (contract, method, argsArray) {
  const calls = useMemo(() => {
    return argsArray?.map((args) => {
      return { contract, method, args }
    })
  }, [contract, method, argsArray])
  const callData = useAggregateCallData(calls)
  return useMultiCallResult(callData)
}

export function useMultiCallSameData (contracts, method, args) {
  const calls = useMemo(() => {
    if (!contracts || !method || !args) return
    return contracts.map((contract) => {
      return { contract, method, args }
    })
  }, [contracts, method, args])
  const callData = useAggregateCallData(calls)
  return useMultiCallResult(callData)
}

export function useMultiCall (contracts, methods, argsArray) {
  const calls = useMemo(() => {
    if (
      !contracts ||
      !methods ||
      !argsArray ||
      contracts.length != methods.length ||
      methods.length != argsArray.length
    ) { return }
    return argsArray.map((args, i) => {
      return { contract: contracts[i], method: methods[i], args: argsArray[i] }
    })
  }, [contracts, methods, argsArray])
  const callData = useAggregateCallData(calls)
  return useMultiCallResult(callData)
}
