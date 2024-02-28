<script setup lang="ts">
import { getAddresses, walletStrategy } from '@/app/services/wallet'
import { onMounted } from 'vue'
import { setStore, getStore } from '@/utils'
import { getFluxAddress, Wallet } from '@/libs/sdk-ts/packages'
import Constants from '@/utils/Constants'
import { useWalletStore } from '@/store/wallet'
import { useSnackbarStore } from '@/store/snackbar'
const walletSelect = ref(getStore(Constants.STORAGE.wallet))
const userStore = useUserStore()

onMounted(async () => {
  await handleConnectWallet()
})
function isRunningInMetaMask() {
  return typeof window.ethereum !== 'undefined' && window.ethereum.isMetaMask
}
const device = useDevice()
const snackbarStore = useSnackbarStore()
const walletStore = useWalletStore()
const { isConnected, isOpenModalWallets } = useWallet()
async function handleConnectWallet() {
  try {
    if (walletSelect.value) {
      if (device.isMobile && walletSelect.value === Wallet.Metamask && !isRunningInMetaMask()) {
        return handleConnectMetamaskMobile()
      }
      await handleConnectDesktop()
    }
  } catch (e: any) {
    throw e
  }
}

const handleConnectDesktop = async () => {
  try {
    walletStrategy.setWallet(walletSelect.value)
    let address = ''
    let _address = await getAddresses()
    setStore(Constants.STORAGE.wallet, walletSelect.value)
    if (walletSelect.value === Wallet.Metamask) {
      address = getFluxAddress(_address[0])
    } else {
      address = _address[0]
    }
    walletStore.setStore({
      address,
      walletName: walletSelect.value,
      isConnected: true
    })
  } catch (e: any) {
    snackbarStore.show({
      message: e.message,
      color: 'warning'
    })
    throw e
  }
}
const handleConnectMetamaskMobile = async () => {
  setStore(Constants.STORAGE.wallet, walletSelect.value)
  const currentUrl = window.location.href
  window.location.href =
    'https://metamask.app.link/dapp/' + currentUrl + '?callbackUri=' + currentUrl
}

const handleSelectWallet = async (wallet: { key: string }) => {
  walletSelect.value = wallet.key
  return handleConnectWallet()
}
const onClose = () => {
  walletStore.toggleModalWallets()
}

const handleOpenModal = () => {
  if (!isConnected.value) {
    walletStore.toggleModalWallets()
  }
}
</script>

<template>
  <div class="flex items-center">
    <BaseButton
      v-if="!isConnected"
      variant="primary"
      @click="handleOpenModal"
      class="button-connect"
    >
      <BaseIcons name="walletBifold" class="mr-1" />
      Connect Wallet
    </BaseButton>
    <BaseDropdown v-if="isConnected" popperClass="rounded-[16px] overflow-hidden">
      <BaseAvatar :src="userStore.store.userInfo.avatar" />
      <template #content> <ConnectButtonMenuAction /></template>
    </BaseDropdown>
    <ModalWallets
      :isOpen="isOpenModalWallets"
      :onClose="onClose"
      :onSelectWallet="handleSelectWallet"
    />
  </div>
</template>
