import { ChainId, EthereumChainId } from '@/libs/sdk-ts/packages'
export const IS_PRODUCTION: boolean = import.meta.env.PROD as boolean
export const IS_DEVELOPMENT: boolean = !IS_PRODUCTION

const env = {
  VITE_ALCHEMY_GOERLI_KEY: import.meta.env.VITE_ALCHEMY_GOERLI_KEY,
  VITE_ALCHEMY_KEY: import.meta.env.VITE_ALCHEMY_KEY,
  VITE_NETWORK: import.meta.env.VITE_NETWORK,
  VITE_ETHEREUM_CHAIN_ID: import.meta.env.VITE_ETHEREUM_CHAIN_ID,
  VITE_CHAIN_ID: import.meta.env.VITE_CHAIN_ID
}

export const ALCHEMY_GOERLI_KEY = env.VITE_ALCHEMY_GOERLI_KEY

export const alchemyRpcEndpoint = `https://eth-goerli.alchemyapi.io/v2/${ALCHEMY_GOERLI_KEY}`
export const alchemyWsRpcEndpoint = `wss://eth-goerli.ws.alchemyapi.io/v2/${ALCHEMY_GOERLI_KEY}`

export const ETHEREUM_CHAIN_ID = (env.VITE_ETHEREUM_CHAIN_ID ||
  EthereumChainId.Mainnet) as EthereumChainId
export const CHAIN_ID = (env.VITE_CHAIN_ID || ChainId.Testnet) as ChainId

export const DEFAULT_BLOCK_TIMEOUT_HEIGHT = 30
