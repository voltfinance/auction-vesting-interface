import { useMemo, useState } from 'react'
import { TOKENSWAP_VESTING_ADDRESSES } from '../constants'
import {
  useVestingContract,
  useMultipleContractsSingleInterface,
} from './useContract'
import { useMultiCallSameData, useSingleCallResult } from './useMultiCall'
import { useWeb3Context } from '@/context/web3'
import VESTING_ABI from '@/constants/abis/vesting.json'

export function useDecodeSolidityUintArrays(bytesArray) {
  // bytesArray: ['0x00..00': EncodedArray, '0x00..00': EncodedArray, ...]
  // returns [['1','2','3'], ['3'], ...]
  const { web3 } = useWeb3Context()
  return useMemo(() => {
    return bytesArray.map((bytes) =>
      web3.eth.abi.decodeParameter('uint256[]', bytes),
    )
  }, [web3, bytesArray])
}

export function useVestingIds(vestingAddress) {
  const { account } = useWeb3Context()
  const vestingContract = useVestingContract(vestingAddress)

  const vestingIds = useSingleCallResult(vestingContract, 'getActiveGrants', [
    account,
  ])
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
  const rawResult = useMultiCallSameData(contracts, 'getActiveGrants', [account])
  const results = useDecodeSolidityUintArrays(rawResult?.returnData ?? [])
  return results
}

// export function useUnclaimedAmount(vestingAddress, grantId){
//   const {account} = useWeb3Context()
//   const vestingContract = useVestingContract(vestingAddress)
//   const [claims, setClaims] = useState(0)

//   useAsyncWeb3Call(
//     vestingContract.methods.calculateGrantClaim(grantId).call(),
//     setClaims
//   )
// }

// export function useVestingIds(vestingAddress, account) {
//   const vestingContract = useVestingContract(vestingAddress)
//   console.log(vestingContract)
//   const claimIdsResult = useSingleCallResult(vestingContract, 'getActiveGrants', [account])

//   return useMemo(() => {
//     if(!claimIdsResult) return
//     return claimIdsResult.result?.[0]
//   }, [claimIdsResult?.result])
// }

// export function useVestingClaims(vestingAddress, account) {
//   const vestingIds = useVestingIds(vestingAddress, account)
//   const vestingContract = useVestingContract(vestingAddress)
//   const userClaims = useSingleContractMultipleData(
//     vestingContract,
//     'tokenGrants',
//     vestingIds ? vestingIds.map((id) => [id]) : undefined
//   )

//   return useMemo(
//     () =>
//       vestingIds &&
//       vestingIds.reduce((memo, vestingId, index) => {
//         memo[vestingId] = userClaims?.[index]?.result
//         return memo
//       }, {}),
//     [userClaims, vestingIds]
//   )
// }

// export function useVestingUnclaimedAmounts(vestingAddress, account) {
//   const vestingContract = useVestingContract(vestingAddress)
//   console.log({vestingContract, account})
//   const vestingIds = useVestingIds(vestingAddress, account)
//   const unclaimedAmounts = useSingleContractMultipleData(
//     vestingContract,
//     'calculateGrantClaim',
//     vestingIds ? vestingIds.map((id) => [id]) : undefined
//   )
//   console.log("giusgoiu")
//   console.log(vestingIds)
//   console.log(vestingContract)
//   console.log(unclaimedAmounts)

//   return useMemo(
//     () =>
//       vestingIds
//         ? vestingIds.reduce((memo, vestingId, index) => {
//             memo[vestingId] = unclaimedAmounts[index]?.result?.[1]
//             return memo
//           }, {})
//         : {},
//     [unclaimedAmounts, vestingIds]
//   )
// }

// export function useVestingTotalUnclaimedAmounts(vestingAddress, account) {
//   const unclaimedAmounts = useVestingUnclaimedAmounts(vestingAddress, account)

//   return useMemo(() => {
//     return Object.values(unclaimedAmounts).reduce((memo, amount) => memo?.add(amount ?? 0), BigNumber.from(0))
//   }, [unclaimedAmounts])
// }

// export function useVestingClaimableIds(vestingAddress, account) {
//   const unclaimedAmounts = useVestingUnclaimedAmounts(vestingAddress, account)

//   return Object.keys(unclaimedAmounts)
//     .map((key) => (unclaimedAmounts?.[key]?.gt(0) ? key : undefined))
//     .filter(Boolean)
// }

// export function useVestingTotalUnclaimedAmount() {
//   const { account } = useActiveWeb3React()
//   const [swapAClaimableAmount] = [useVestingTotalUnclaimedAmounts(TOKENSWAP_VESTING_ADDRESSES['0.03'], account ?? undefined)]
//   return swapAClaimableAmount
// }
