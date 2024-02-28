import { computed } from 'vue'
import { useWalletStore } from '@/store/wallet'

export default function useWallet() {
  const walletStore = useWalletStore()
  const address = computed(() => walletStore.store.address)
  const balance = computed(() => walletStore.store.balance)
  const isConnected = computed(() => walletStore.store.isConnected)
  const walletName = computed(() => walletStore.store.walletName)
  const assets = computed(() => walletStore.store.assets)
  const isOpenModalWallets = computed(() => walletStore.store.isOpenModalWallets)
  return { address, balance, isConnected, walletName, assets, isOpenModalWallets }
}
