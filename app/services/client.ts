import { useNetworkStore } from '@/store/network'
import { useSnackbarStore } from '@/store/snackbar'
import axios from 'axios'
import {
  IndexerGrpcClient,
  IndexerStreamClient,
  ChainGrpcClient,
  ChainStreamClient,
  getNetworkEndpoint,
  Network
} from '@/libs/sdk-ts/packages'
import { getNetworkStore } from '@/utils'
let networkEndpoint = getNetworkEndpoint(getNetworkStore())
const chainGrpcClient: ChainGrpcClient = new ChainGrpcClient(networkEndpoint.lcd)
const chainStreamClient: ChainStreamClient = new ChainStreamClient(networkEndpoint.lcd)
const indexerGrpcClient: IndexerGrpcClient = new IndexerGrpcClient(networkEndpoint.api)
const indexerStreamClient: IndexerStreamClient = new IndexerStreamClient(networkEndpoint.api)
let subscriptionStreamEvent: any = null
export const initClient = (network: Network) => {
  const { setStore } = useNetworkStore()
  try {
    networkEndpoint = getNetworkEndpoint(network)
    chainGrpcClient.changeEndpoint(networkEndpoint.lcd)
    chainStreamClient.changeEndpoint(networkEndpoint.lcd)
    indexerGrpcClient.changeEndpoint(networkEndpoint.api)
    indexerStreamClient.changeEndpoint(networkEndpoint.api)
    setStore({ connected: true })
    onStreamCheckNetwork()
  } catch (err) {
    console.log(err)
  }
}

const onStreamCheckNetwork = async () => {
  const snackbarStore = useSnackbarStore()
  const networkStore = useNetworkStore()
  const { indexerProviderStreamClient } = getClients()
  try {
    // stream block
    const request = {
      height: '0'
    }
    if (subscriptionStreamEvent) {
      subscriptionStreamEvent.unsubscribe()
    }
    subscriptionStreamEvent = indexerProviderStreamClient.getStreamBlock({
      request,
      callback: (res: any) => {
        if (!networkStore.store.connected) {
          networkStore.setStore({ connected: true })
          snackbarStore.show({
            message: 'Network connected',
            color: 'success'
          })
        }
      },
      onStatusCallback: (err: any) => {
        if (err.code === 2) {
          snackbarStore.show({
            message: 'Network error, Cannot connect to the server',
            color: 'error'
          })
          setTimeout(() => {
            onStreamCheckNetwork()
          }, 5000)
        }
        networkStore.setStore({ connected: false })
      }
    })
  } catch (err) {
    console.log(err)
    networkStore.setStore({ connected: false })
  }
}

export const getClients = () => {
  return {
    chainTxClient: chainGrpcClient.transaction,
    chainAuthQueryClient: chainGrpcClient.auth,
    chainFnftQueryClient: chainGrpcClient.fnft,
    chainBankQueryClient: chainGrpcClient.bank,
    chainBazaarQueryClient: chainGrpcClient.bazaar,
    chainStreamEvent: chainStreamClient.streamEvent,
    indexerWeb3gwQueryClient: indexerGrpcClient.web3gw,
    indexerMediaQueryClient: indexerGrpcClient.media,
    indexerAccountQueryClient: indexerGrpcClient.account,
    indexerFnftQueryClient: indexerGrpcClient.fnft,
    indexerProviderQueryClient: indexerGrpcClient.provider,
    indexerBazaarQueryClient: indexerGrpcClient.bazaar,
    indexerFnftStreamClient: indexerStreamClient.fnft,
    indexerBazaarStreamClient: indexerStreamClient.bazaar,
    indexerProviderStreamClient: indexerStreamClient.provider
  }
}
//delay func
export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
export const handleResponse = async (res: any) => {
  if (res.tx_response.code !== 0) {
    throw new Error(res.tx_response.raw_log)
  }

  const txHash = res.tx_response.txhash
  //delay 1s
  await delay(1000)
  await pollTxHash(txHash)
  return res
}

const MAX_ATTEMPTS = 10
// poll tx hash if tx is successful continue, if pending set timeout and poll again
const pollTxHash: any = async (txHash: string, attempts: number = 0) => {
  const { store } = useNetworkStore()
  const network = getNetworkEndpoint(store.network)
  try {
    const res = await axios.get(`${network.tm}/tx?hash=0x${txHash}`)
    if (res.data.result.tx_result.code === 0) {
      return res
    }
    throw new Error(res.data?.result?.tx_result?.log)
  } catch (err: any) {
    if (err?.response?.status === 500 && attempts < MAX_ATTEMPTS) {
      await delay(2000)
      return pollTxHash(txHash, attempts + 1)
    }
    throw err
  }
}
