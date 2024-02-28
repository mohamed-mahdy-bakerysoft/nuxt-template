<script setup lang="ts">
import { useWalletStore } from '@/store/wallet'
import { getEthereumAddress, Wallet } from '@/libs/sdk-ts/packages'
import * as ethLogo from '@/assets/images/ethLogo.png'
import { WALLET_ICONS } from '@/utils/Constants'
import { setStore } from '@/utils'
import WalletInfo from './WalletInfo.vue'
const userStore = useUserStore()
const walletLogo = WALLET_ICONS
const walletStore = useWalletStore()
const { address, walletName } = useWallet()

const disconnect = async () => {
  setStore(Constants.STORAGE.wallet, '')
  walletStore.setStore({
    address: '',
    walletName: '',
    isConnected: false
  })
}
const list = ref([
  {
    icon: 'account',
    label: 'Profile'
  },
  {
    icon: 'bell',
    label: 'Notification'
  },
  {
    icon: 'logout',
    label: 'Logout',
    action: disconnect
  }
])
</script>

<template>
  <div class="p-2 rounded-[16px]" @click.stop>
    <div class="p-4 rounded-[12px] border border-blueGray-light-100">
      <div class="flex gap-2">
        <BaseAvatar size="sm" :src="userStore.store?.userInfo?.avatar" />
        <p class="font-bold text-md">{{ userStore.store?.userInfo?.displayName }}</p>
      </div>
      <div class="mt-3 p-3 bg-blueGray-light-50 rounded-[16px]">
        <p class="flex items-center gap-2 text-xs font-bold text-blueGray-400 mb-3">
          Connected wallet <BaseIcons name="dot" class="w-[6px] h-[6px] text-green-400" />
        </p>
        <WalletInfo :logo="walletLogo[walletName as Wallet]" :address="address" />
        <template v-if="walletName === Wallet.Metamask">
          <div class="border-b border-blueGray-light-100 my-3" />
          <WalletInfo :logo="ethLogo.default" :address="getEthereumAddress(address)" />
        </template>
      </div>
    </div>

    <div class="mt-2">
      <div
        v-for="item in list"
        :key="item.label"
        class="flex rounded-lg items-center gap-3 p-3 cursor-pointer hover:bg-blueGray-light-300"
        @click="item.action && item.action()"
      >
        <BaseIcons :name="item.icon" class="w-[24px] h-[24px]" />
        <p>{{ item.label }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.v-enter-active,
.v-leave-active {
  height: 62px;
  transition: all 0.3s;
}
.v-enter-from,
.v-leave-to {
  height: 0px;
  opacity: 0;
}
</style>
