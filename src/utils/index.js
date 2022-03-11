import { getAddress } from '@ethersproject/address'
import { BigNumber } from '@ethersproject/bignumber'

export function calculateGasMargin (value) {
  return value.mul(BigNumber.from(10000).add(BigNumber.from(1000))).div(BigNumber.from(10000))
}
// returns the checksummed address if the address is valid, otherwise returns false
export function isAddress (value) {
  try {
    return getAddress(value)
  } catch {
    return false
  }
}
