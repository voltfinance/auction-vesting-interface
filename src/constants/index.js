import { ChainId, Token } from '@fuseio/fuse-swap-sdk'

export const MULTICALL_ADDRESS = "0x3CE6158b7278Bf6792e014FA7B4f3c6c46fe9410"
export const VOLT_ADDRESS = "0xc82F2CfBF7aA54a3b6fFd0f687Da0B0107532a2B"
export const VOLT = new Token(ChainId.FUSE, VOLT_ADDRESS, 18, 'VOLT', 'Volt')

export const TOKENSWAP_VESTING_ADDRESSES = {
  '0.03': '0xb71B47ff8B10A68237ee10D81762E276654F981b',
  '0.035': '0xaDd618BFFEe9e54A3E65083AB437dCDd633103F5',
  '0.04': '0x33650cb8e6cC0621aE08bAc2904Aca95FcEF5655',
  '0.06': '0xfa1d759e5B9Cb6675CF2Ac8F235ab4eedc78c42E'
}
export const NetworkContextName = 'NETWORK'
