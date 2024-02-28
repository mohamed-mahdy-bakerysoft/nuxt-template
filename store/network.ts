import { defineStore } from 'pinia'
import { Network } from '@/libs/sdk-ts/packages/networks'
import { NetworkStoreType } from '@/utils/interface'
import { initClient } from '@/app/services/client'
import { getNetworkStore, setNetworkStore } from '@/utils'
export const useNetworkStore = defineStore('networkStore', () => {
  const store = ref<NetworkStoreType>({
    network: getNetworkStore() as Network,
    connected: false
  })

  const setStore = (data: any) => {
    let keys = Object.keys(data) as Array<keyof NetworkStoreType>
    keys.forEach((key) => {
      store.value = {
        ...store.value,
        [key]: data[key]
      }
    })
  }
  const _setNetwork = (network: Network) => {
    initClient(network)
    setNetworkStore(network)
    setStore({ network })
  }
  return { setStore, store, setNetwork: _setNetwork }
})
