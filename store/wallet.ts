// store/filters.ts
import { defineStore } from 'pinia'
import { WalletStoreType } from '@/utils/interface'

export const useWalletStore = defineStore('walletStore', () => {
  const store = ref<WalletStoreType>({
    address: '',
    balance: 0,
    isConnected: false,
    walletName: '',
    assets: [],
    isOpenModalWallets: false
  })

  const setStore = (data: any) => {
    let keys = Object.keys(data) as Array<keyof WalletStoreType>
    keys.forEach((key) => {
      store.value = {
        ...store.value,
        [key]: data[key]
      }
    })
  }
  const pushAssets = (assets: Array<any>) => {
    assets.forEach((item: any) => {
      const index = store.value.assets.findIndex((i: any) => i.denom === item.denom)
      if (index === -1) {
        store.value.assets.push(item)
      } else {
        store.value.assets[index] = item
      }
    })
  }
  const removeAssets = (assets: Array<any>) => {
    store.value.assets = store.value.assets.filter(
      (item: any) => !assets.some((_asset) => _asset.denom === item.denom)
    )
  }
  const toggleModalWallets = () => {
    store.value.isOpenModalWallets = !store.value.isOpenModalWallets
  }
  const resetStore = () => {
    store.value = {
      address: '',
      balance: 0,
      isConnected: false,
      walletName: '',
      assets: [],
      isOpenModalWallets: false
    }
  }

  return { setStore, store, pushAssets, removeAssets, resetStore, toggleModalWallets }
})
