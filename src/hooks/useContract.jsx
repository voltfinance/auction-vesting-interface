import { useMemo } from 'react'
import { useWeb3Context } from '../context/web3'
import ERC20_ABI from '../constants/abis/erc20.json'
import TOKEN_SALE_ABI from '../constants/abis/tokenSale.json'
import VESTING_ABI from '../constants/abis/vesting.json'
import MULTICALL_ABI from '../constants/abis/multicall.json'
import { MULTICALL_ADDRESS } from '../constants'

export function useContract (address, ABI) {
  const { web3 } = useWeb3Context()

  return useMemo(() => {
    if (web3 && address && ABI) {
      return new web3.eth.Contract(ABI, address)
    } else {
      return null
    }
  }, [address, web3, ABI])
}

export function useMultipleContractsSingleInterface(addresses, ABI) {
  const { web3 } = useWeb3Context()

  return useMemo(() => {
    if (web3 && addresses.length && ABI){
      return addresses.map((address) => {
        return new web3.eth.Contract(ABI, address)
      })
    } else {
      return []
    }
  }, [addresses, ABI])

}

export function useTokenContract (address) {
  return useContract(address, ERC20_ABI)
}

export function useTokenSaleContract (address) {
  return useContract(address, TOKEN_SALE_ABI)
}

export function useVestingContract(vestingAddress) {
  return useContract(vestingAddress, VESTING_ABI)
}

export function useMultiCallContract() {
  return useContract(MULTICALL_ADDRESS, MULTICALL_ABI)
}