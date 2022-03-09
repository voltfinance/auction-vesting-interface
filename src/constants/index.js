import { ChainId, Token } from '@fuseio/fuse-swap-sdk'

export const MULTICALL_ADDRESS = "0x3CE6158b7278Bf6792e014FA7B4f3c6c46fe9410"
export const VOLT_ADDRESS = "0x34Ef2Cc892a88415e9f02b91BfA9c91fC0bE6bD4"
export const VOLT = new Token(ChainId.FUSE, VOLT_ADDRESS, 18, 'VOLT', 'Volt')

export const TOKEN_SWAP_CONTRACTS = {
  "0x9B2BC0df082BdAD4C2FeaB73704a6EAe304a8A0e": {
    name: "Ecosystem Round 0.003",
    address: "0x9B2BC0df082BdAD4C2FeaB73704a6EAe304a8A0e",
    tokenSale: "0x341D19E4e0c3C1b009F6Af46324B0128F91231cA",
    isSingleVesting: false
  },
  "0x763c3d72dbdeb498D3dc196B68c9fb8e1d7B61b3": {
    name: "Ecosystem Round 0.0035",
    address: "0x763c3d72dbdeb498D3dc196B68c9fb8e1d7B61b3",
    tokenSale: "0x4E693E8CfFCF7AA7E149C9D54690a1EB6ef3952F",
    isSingleVesting: false
  },
  "0xBFDE08aB662B907146c78077310E4c2fFaCD302E": {
    name: "Ecosystem Round 0.004",
    address: "0xBFDE08aB662B907146c78077310E4c2fFaCD302E",
    tokenSale: "0x4D303E6bFB675588e4c6928ecf65Ca80723Bf394",
    isSingleVesting: false
  },
  "0xEE7E908e5B2667eA5c7E82e4d69cd755f74594AC": {
    name: "Ecosystem Round 0.006",
    address: "0xEE7E908e5B2667eA5c7E82e4d69cd755f74594AC",
    tokenSale: "0x6Eb6a038741FeDc23fE67f0727ba43D15D147958",
    isSingleVesting: true
  },

}

export const NetworkContextName = 'NETWORK'
