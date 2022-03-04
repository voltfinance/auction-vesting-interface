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
  return useMemo(() => calls.map(({contract, method, args}) => {
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
    return argsArray.map((args) => {
      return {contract, method, args}
    })
  }, [contract, method, argsArray])
  const callData = useAggregateCallData(calls)
  const [result, setResult] = useState(undefined)
  const promise = useMemo(() => {
    return multiCall.methods.aggregate(callData).call()
  }, [multiCall, contract, method, args])

  useAsyncWeb3Call(promise, setResult, [])
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
  console.log(callData)
  const promise = useMemo(() => {
    if(!multiCall || !callData) return
    return multiCall.methods.aggregate(callData).call()
  }, [multiCall, contracts, callData])

  useAsyncWeb3Call(promise, setResult, [])
  return result
}


// import { AppDispatch, AppState } from '../index'
// import {
//   addMulticallListeners,
//   Call,
//   removeMulticallListeners,
//   parseCallKey,
//   toCallKey,
//   ListenerOptions
// } from './actions'

// function isMethodArg(x){
//   return ['string', 'number'].indexOf(typeof x) !== -1
// }

// function isValidMethodArgs(x){
//   return (
//     x === undefined ||
//     (Array.isArray(x) && x.every(xi => isMethodArg(xi) || (Array.isArray(xi) && xi.every(isMethodArg))))
//   )
// }


// const INVALID_RESULT= { valid: false, blockNumber: undefined, data: undefined }

// // use this options object
// export const NEVER_RELOAD = {
//   blocksPerFetch: Infinity
// }

// async function fetchChunk(
//   multicallContract,
//   chunk,
//   minBlockNumber
// ){
//   console.debug('Fetching chunk', multicallContract, chunk, minBlockNumber)
//   let resultsBlockNumber, returnData
//   try {
//     ;[resultsBlockNumber, returnData] = await multicallContract.aggregate(chunk.map(obj => [obj.address, obj.callData]))
//   } catch (error) {
//     console.debug('Failed to fetch chunk inside retry', error)
//     throw error
//   }
//   if (resultsBlockNumber.toNumber() < minBlockNumber) {
//     console.debug(`Fetched results for old block number: ${resultsBlockNumber.toString()} vs. ${minBlockNumber}`)
//     throw new RetryableError('Fetched for old block number')
//   }
//   return { results: returnData, blockNumber: resultsBlockNumber.toNumber() }
// }

// // the lowest level call for subscribing to contract data
// function useCallsData(calls, options) {
//   const { chainId } = useActiveWeb3React()
//   const blockNo = useBlockNumber()
// //   const callResults = useSelector<AppState, AppState['multicall']['callResults']>(state => state.multicall.callResults)
// //   const dispatch = useDispatch<AppDispatch>()
//   console.log(calls)
//   console.log(options)

//   // const serializedCallKeys = useMemo(
//   //   () =>
//   //     JSON.stringify(
//   //       calls
//   //         ?.filter((c) => Boolean(c))
//   //         ?.map(toCallKey)
//   //         ?.sort() ?? []
//   //     ),
//   //   [calls]
//   // )

//   // // update listeners when there is an actual change that persists for at least 100ms
//   // useEffect(() => {
//   //   const callKeys = JSON.parse(serializedCallKeys)
//   //   if (!chainId || callKeys.length === 0) return undefined
//   //   const calls = callKeys.map(key => parseCallKey(key))
//   //   // dispatch(
//   //   //   addMulticallListeners({
//   //   //     chainId,
//   //   //     calls,
//   //   //     options
//   //   //   })
//   //   // )

//   //   return () => {
//   //   //   dispatch(
//   //   //     removeMulticallListeners({
//   //   //       chainId,
//   //   //       calls,
//   //   //       options
//   //   //     })
//   //   //   )
//   //   }
//   // }, [chainId, options, serializedCallKeys])

//   // return useMemo(
//   //   () =>
//   //     calls.map(call => {
//   //       if (!chainId || !call) return INVALID_RESULT

//   //       const result = callResults[chainId]?.[toCallKey(call)]
//   //       let data
//   //       if (result?.data && result?.data !== '0x') {
//   //         data = result.data
//   //       }

//   //       return { valid: true, data, blockNumber: result?.blockNumber }
//   //     }),
//   //   [callResults, calls, chainId]
//   // )
// }


// const INVALID_CALL_STATE = { valid: false, result: undefined, loading: false, syncing: false, error: false }
// const LOADING_CALL_STATE = { valid: true, result: undefined, loading: true, syncing: true, error: false }

// function toCallState(
//   callResult,
//   contractInterface,
//   fragment,
//   latestBlockNumber
// ) {
//   if (!callResult) return INVALID_CALL_STATE
//   const { valid, data, blockNumber } = callResult
//   if (!valid) return INVALID_CALL_STATE
//   if (valid && !blockNumber) return LOADING_CALL_STATE
//   if (!contractInterface || !fragment || !latestBlockNumber) return LOADING_CALL_STATE
//   const success = data && data.length > 2
//   const syncing = (blockNumber ?? 0) < latestBlockNumber
//   let result = undefined
//   if (success && data) {
//     try {
//       result = contractInterface.decodeFunctionResult(fragment, data)
//     } catch (error) {
//       console.debug('Result data parsing failed', fragment, data)
//       return {
//         valid: true,
//         loading: false,
//         error: true,
//         syncing,
//         result
//       }
//     }
//   }
//   return {
//     valid: true,
//     loading: false,
//     syncing,
//     result: result,
//     error: !success
//   }
// }

// export function useSingleContractMultipleData(
//   contract,
//   methodName,
//   callInputs,
//   options
// ) {
//   const fragment = useMemo(() => contract?.interface?.getFunction(methodName), [contract, methodName])

//   const calls = useMemo(
//     () =>
//       contract && fragment && callInputs && callInputs.length > 0
//         ? callInputs.map(inputs => {
//             return {
//               address: contract.address,
//               callData: contract.interface.encodeFunctionData(fragment, inputs)
//             }
//           })
//         : [],
//     [callInputs, contract, fragment]
//   )

//   const results = useCallsData(calls, options)

//   const latestBlockNumber = useBlockNumber()

//   return useMemo(() => {
//     return results.map(result => toCallState(result, contract?.interface, fragment, latestBlockNumber))
//   }, [fragment, contract, results, latestBlockNumber])
// }

// export function useMultipleContractSingleData(
//   addresses,
//   contractInterface,
//   methodName,
//   callInputs,
//   options
// ) {
//   const fragment = useMemo(() => contractInterface.getFunction(methodName), [contractInterface, methodName])
//   const callData = useMemo(
//     () =>
//       fragment && isValidMethodArgs(callInputs)
//         ? contractInterface.encodeFunctionData(fragment, callInputs)
//         : undefined,
//     [callInputs, contractInterface, fragment]
//   )

//   const calls = useMemo(
//     () =>
//       fragment && addresses && addresses.length > 0 && callData
//         ? addresses.map(address => {
//             return address && callData
//               ? {
//                   address,
//                   callData
//                 }
//               : undefined
//           })
//         : [],
//     [addresses, callData, fragment]
//   )

//   const results = useCallsData(calls, options)

//   const latestBlockNumber = useBlockNumber()

//   return useMemo(() => {
//     return results.map(result => toCallState(result, contractInterface, fragment, latestBlockNumber))
//   }, [fragment, results, contractInterface, latestBlockNumber])
// }

// export function useSingleCallResult(
//   contract,
//   methodName,
//   inputs,
//   options
// ) {
//   const fragment = useMemo(() => contract?.interface?.getFunction(methodName), [contract, methodName])

//   const calls = useMemo(() => {
//     return contract && fragment && isValidMethodArgs(inputs)
//       ? [
//           {
//             address: contract.address,
//             callData: contract.interface.encodeFunctionData(fragment, inputs)
//           }
//         ]
//       : []
//   }, [contract, fragment, inputs])

//   let result = useCallsData(calls, options)

//   const latestBlockNumber = useBlockNumber()

//   return useMemo(() => {
//     if(!result) return INVALID_RESULT
//     return toCallState(result[0], contract?.interface, fragment, latestBlockNumber)
//   }, [result, contract, fragment, latestBlockNumber])
// }
