import React, { useCallback } from 'react'
import { Text } from 'rebass'
import { formatEther } from 'ethers/lib/utils'
import Row from './Row'
import { ButtonGradient } from './Button'
import VoltIcon from '../../../assets/images/volt.svg'
import { Link } from 'react-router-dom'
// import { useVestingClaimableIds, useVestingTotalUnclaimedAmounts } from '../../../hooks/useVesting'
// import { useVestingContract } from '../../../hooks/useContract'


export default function ClaimVestingTableRow({ vestingAddress, name }) {
//   const vestingContract = useVestingContract(vestingAddress, true)
//   const userUnclaimedAmounts = useVestingTotalUnclaimedAmounts(vestingAddress, account ?? undefined)
//   const claimableIds = useVestingClaimableIds(vestingAddress, account ?? undefined)

  const userUnclaimedAmounts = [123,123,123]
  const claimableIds = ["0x1"]

//   const onClaim = useCallback(
//     async (id) => {
//       if (!vestingContract || !id) return
//       try {
//         await vestingContract.claimVestedTokens(id)
//       } catch (error) {
//         console.error(error)
//       }
//     },
//     [vestingContract]
//   )

  return (
    <Row
      padding={'11px 15px 11px 29px'}
      color={'white'}
      backgroundColor={'black'}
      justifyContent={'space-between'}
      borderRadius={'12px'}
      marginBottom={'5px'}
    >
      <Text>{name}</Text>
      <Text display={'flex'} alignItems={'center'} marginLeft={'20px'}>
        <img src={VoltIcon} alt="" style={{ width: '25px', paddingBottom: '-8px', margin: 'auto' }} />
        {parseInt(formatEther(userUnclaimedAmounts))}
      </Text>
      {claimableIds?.map((userVestingId, index) => (
        
        <Link to={'/unvest/' + vestingAddress}>
        <ButtonGradient
          key={userVestingId}
          width={'100px'}
          height={'32px'}
          padding={'0px'}
          onClick={() => {}}
        >
          Claim
        </ButtonGradient>
        </Link>
      ))}
    </Row>
  )
}