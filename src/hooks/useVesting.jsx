import { useMemo, useState } from 'react'
import { TOKEN_SWAP_CONTRACTS } from '../constants'
import BigNumber from 'bignumber.js'
import {
  useVestingContract,
  useMultipleContractsSingleInterface,
} from './useContract'
import {
  useDoubleMultiCallSingleMethod,
  useMultiCallSameData,
  useSingleCallMultiData,
  useSingleCallResult,
} from './useMultiCall'
import { useWeb3Context } from '@/context/web3'
import VESTING_ABI from '@/constants/abis/vesting.json'
import TOKENSALE_ABI from '@/constants/abis/tokenSale.json'

export function useDecodeSolidityUintArrays(bytesArray) {
  return useWeb3DecodeParameters(bytesArray, ['uint256[]'])
}

export function useAllVestedTokens() {
  // const { account, web3 } = useWeb3Context()
  // const tokenSaleAddresses = useMemo(
  //   () =>
  //     Object.values(TOKEN_SWAP_CONTRACTS).map((contract) => contract.tokenSale),
  //   [TOKEN_SWAP_CONTRACTS],
  // )
  // const tokenSaleContracts = useMultipleContractsSingleInterface(tokenSaleAddresses, TOKENSALE_ABI)
  // TODO: calculate
  return []
}

function useWeb3DecodeParameters(bytesArray, argTypes) {
  const { web3 } = useWeb3Context()
  return useMemo(() => {
    return bytesArray.map((bytes) =>
      web3.eth.abi.decodeParameters(argTypes, bytes),
    )
  }, [web3, bytesArray, argTypes])
}

export function useVestingIds(vestingAddress) {
  const { account } = useWeb3Context()
  const vestingContract = useVestingContract(vestingAddress)

  const rawResult = useSingleCallResult(vestingContract, 'getActiveGrants', [
    account,
  ])
  const ret = useDecodeSolidityUintArrays(rawResult?.returnData ?? [])
  const vestingIds = useMemo(
    () => (ret?.length && Object.values(ret[0]).length ? ret[0]['0'] : []),
    [ret],
  )
  return vestingIds
}

export function useAllVestingIds() {
  const { account } = useWeb3Context()
  const vestingAddresses = useMemo(() => {
    return Object.keys(TOKEN_SWAP_CONTRACTS)
  }, [TOKEN_SWAP_CONTRACTS])
  const contracts = useMultipleContractsSingleInterface(
    vestingAddresses,
    VESTING_ABI,
  )
  const rawResult = useMultiCallSameData(contracts, 'getActiveGrants', [
    account,
  ])
  const results = useDecodeSolidityUintArrays(rawResult?.returnData ?? [])
  return results
}

export function useClaims(vestingAddress) {
  const vestingContract = useVestingContract(vestingAddress)
  const vestingIds = useVestingIds(vestingAddress)
  const args = useMemo(() => vestingIds?.map((id) => [id]), [vestingIds])
  const rawResult = useSingleCallMultiData(
    vestingContract,
    'calculateGrantClaim',
    args,
  )
  const claims = useWeb3DecodeParameters(rawResult?.returnData ?? [], [
    'uint16',
    'uint256',
  ])

  const entries = useMemo(() => {
    return new Map(
      claims.map((claim, i) => [vestingIds[i], Object.values(claim)]),
    )
  }, [claims, vestingIds])

  return useMemo(() => Object.fromEntries(entries), [entries])
}

export function useTotalClaim(vestingAddress) {
  const claims = useClaims(vestingAddress)
  return useMemo(() => {
    return Object.values(claims).reduce(
      (mem, claim) => mem.plus(claim[1]),
      BigNumber(0),
    )
  }, [claims])
}

export function useAllClaims() {
  const { web3 } = useWeb3Context()
  const allVestingIds = useAllVestingIds()
  const argsArray = useMemo(
    () => allVestingIds.map((res) => Object.values(res)[0].map((arg) => [arg])),
    [allVestingIds],
  )
  const vestingAddresses = useMemo(() => Object.keys(TOKEN_SWAP_CONTRACTS), [])
  const contracts = useMultipleContractsSingleInterface(
    vestingAddresses,
    VESTING_ABI,
  )
  const callObjects = useMemo(() => {
    if (contracts?.length && contracts.length === argsArray?.length) {
      return argsArray.map((args, i) => {
        return {
          contract: contracts[i],
          method: 'calculateGrantClaim',
          argsArray: args,
        }
      })
    }
    return []
  }, [contracts, allVestingIds])
  const rawResult = useDoubleMultiCallSingleMethod(callObjects)
  const allClaims = useMemo(() => {
    return rawResult.map((res) => {
      return res[1]
        .map((bytes) =>
          web3.eth.abi.decodeParameters(['uint16', 'uint256'], bytes),
        )
        .reduce((mem, res) => {
          return mem.plus(res[1])
        }, BigNumber(0))
    })
  }, [rawResult, web3])
  return allClaims
}

export function useClaim(vestingAddress, grantId) {
  const vestingContract = useVestingContract(vestingAddress)
  const rawResult = useSingleCallResult(
    vestingContract,
    'calculateGrantClaim',
    [grantId],
  )
  const claims = useWeb3DecodeParameters(rawResult?.returnData ?? [], [
    'uint16',
    'uint256',
  ])
  return claims
}
