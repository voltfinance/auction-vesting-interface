import { ChainId, Token } from '@fuseio/fuse-swap-sdk'

export const MULTICALL_ADDRESS = "0x3CE6158b7278Bf6792e014FA7B4f3c6c46fe9410"
export const VOLT_ADDRESS = "0xc82F2CfBF7aA54a3b6fFd0f687Da0B0107532a2B"
export const VOLT = new Token(ChainId.FUSE, VOLT_ADDRESS, 18, 'VOLT', 'Volt')

export const TOKEN_SWAP_CONTRACTS = {
  "0xb71B47ff8B10A68237ee10D81762E276654F981b": {
    name: "Ecosystem Round 0.003",
    address: "0xb71B47ff8B10A68237ee10D81762E276654F981b",
    tokenSale: "0x341D19E4e0c3C1b009F6Af46324B0128F91231cA",
    isSingleVesting: false
  },
  "0xaDd618BFFEe9e54A3E65083AB437dCDd633103F5": {
    name: "Ecosystem Round 0.0035",
    address: "0xaDd618BFFEe9e54A3E65083AB437dCDd633103F5",
    tokenSale: "0x4E693E8CfFCF7AA7E149C9D54690a1EB6ef3952F",
    isSingleVesting: false
  },
  "0x33650cb8e6cC0621aE08bAc2904Aca95FcEF5655": {
    name: "Ecosystem Round 0.004",
    address: "0x33650cb8e6cC0621aE08bAc2904Aca95FcEF5655",
    tokenSale: "0x4D303E6bFB675588e4c6928ecf65Ca80723Bf394",
    isSingleVesting: false
  },
  "0xfa1d759e5B9Cb6675CF2Ac8F235ab4eedc78c42E": {
    name: "Ecosystem Round 0.006",
    address: "0xfa1d759e5B9Cb6675CF2Ac8F235ab4eedc78c42E",
    tokenSale: "0x6Eb6a038741FeDc23fE67f0727ba43D15D147958",
    isSingleVesting: true
  },

}

export const NetworkContextName = 'NETWORK'
