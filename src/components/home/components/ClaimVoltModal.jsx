import React from 'react'
import { useWeb3Context } from '../../../context/web3'
import ClaimVestingTable from './ClaimVestingTable'
import ConnectOrSwitch from './ConnectOrSwitch'

export default function ClaimVoltModal () {
  const { account, chainId } = useWeb3Context()

  if (!account || chainId !== 122) return (<ConnectOrSwitch />)

  return (
    <ClaimVestingTable />
  )
}
