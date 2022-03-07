import React, { useCallback } from 'react'
import { Text } from 'rebass'
import { formatEther } from 'ethers/lib/utils'
import { useNavigate } from 'react-router-dom'
import Row from './Row'
import { ButtonGradient } from './Button'
import VoltIcon from '../../../assets/images/volt.svg'
import { Link } from 'react-router-dom'
import { useTotalClaim } from '../../../hooks/useVesting'
// import { useVestingClaimableIds, useVestingTotalUnclaimedAmounts } from '../../../hooks/useVesting'
// import { useVestingContract } from '../../../hooks/useContract'


export default function ClaimVestingTableRow({ vestingAddress, name }) {
  const navigate = useNavigate()
  const totalClaim = useTotalClaim(vestingAddress)

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
        {totalClaim.shiftedBy(-18).decimalPlaces(4).toString()}
        
      </Text>
        <ButtonGradient
          width={'100px'}
          height={'32px'}
          padding={'0px'}
          onClick={() => {navigate(`/unvest/${vestingAddress}`)}}
        >
          Claim
        </ButtonGradient>
    </Row>
  )
}