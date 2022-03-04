import { BigNumber } from 'ethers'
import { useMemo, useState } from 'react'
import { TOKENSWAP_VESTING_ADDRESSES } from '../constants'
import { useActiveWeb3React } from '.'
import { useVestingContract } from './useContract'
import { useSingleCallResult, useSingleContractMultipleData } from './useMultiCall'
import {useWeb3Context} from '@/context/web3'
import { useAsyncWeb3Call } from '.'


export function useVestingIds(vestingAddress) {
  const {account} = useWeb3Context()
  const vestingContract = useVestingContract(vestingAddress)
  const [vestingIds, setVestingIds] = useState([])
  console.log({vestingContract, account})

  // multicallContract.methods.aggregate(
    
  // )

  useAsyncWeb3Call(
    vestingContract?.methods?.getActiveGrants(account)?.encodeABI(),
    setVestingIds,
    vestingContract
  )
  return vestingIds
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
