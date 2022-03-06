import { useMemo, useState } from 'react'
import { TOKENSWAP_VESTING_ADDRESSES } from '../constants'
import BigNumber from 'bignumber.js'
import {
  useVestingContract,
  useMultipleContractsSingleInterface,
} from './useContract'
import {
  useMultiCallSameData,
  useSingleCallMultiData,
  useSingleCallResult,
} from './useMultiCall'
import { useWeb3Context } from '@/context/web3'
import VESTING_ABI from '@/constants/abis/vesting.json'
import useSingleContractCall from './useSingleContractCall'

export function useDecodeSolidityUintArrays(bytesArray) {
  return useWeb3DecodeParameters(bytesArray, ['uint256[]'])
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
    return Object.keys(TOKENSWAP_VESTING_ADDRESSES).map((key) => {
      return TOKENSWAP_VESTING_ADDRESSES[key]
    })
  }, [TOKENSWAP_VESTING_ADDRESSES])
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
    return new Map(claims.map((claim, i) => [vestingIds[i], Object.values(claim)]))
  }, [claims, vestingIds])

  return useMemo(() => Object.fromEntries(entries), [entries])
}

export function useTotalClaim(vestingAddress) {
  const claims = useClaims(vestingAddress)
  return useMemo(() => {
    return Object.values(claims).reduce((mem, claim) => mem.plus(claim[1]), BigNumber(0))
  }, [claims])
}

export function useAllClaims() {
  // TODO:
  // const allVestingIds = useAllVestingIds()
  // // vestingIds.forEach((elem) => {console.log(elem[0])})
  // const
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
