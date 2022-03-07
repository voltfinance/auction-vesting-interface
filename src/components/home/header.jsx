import React from 'react'
import wallet from '@/assets/images/wallet.svg'
import { useWeb3Context } from '@/context/web3'
import useSwitchNetwork from '@/hooks/useSwitchNetwork'
import useFuseBalance from '@/hooks/useFuseBalance'
import voltage from '@/assets/images/voltage_icon.png'
import { fromWei } from '@/utils/number'
import {useNavigate} from 'react-router-dom'

function Header () {
  const navigate = useNavigate()
  const { account, toggleWeb3Modal, chainId } = useWeb3Context()
  const switchNetwork = useSwitchNetwork()
  const fuseBalance = fromWei(useFuseBalance(account))

  return (
    <div className='header'>
      <img className='icon' alt='voltage' src={voltage} onClick={() => {navigate('/')}}/>
    </div>
  )
}

export default Header
