<script setup>
import { ref } from 'vue'

import { WALLET_ICONS } from '@/utils/Constants'
const { onSelectWallet, isOpen, onClose } = defineProps({
  isOpen: Boolean,
  onClose: Function,
  onSelectWallet: Function
})

const walletSelect = ref(null)
const WALLET_LIST = ref([
  {
    key: 'keplr',
    name: 'Keplr',
    icon: WALLET_ICONS.keplr
  },
  {
    key: 'metamask',
    name: 'Metamask',
    icon: WALLET_ICONS.metamask
  }
])

const handleSelectWallet = async (wallet) => {
  if (walletSelect.value) return
  try {
    walletSelect.value = wallet
    await onSelectWallet(wallet)
    onClose && onClose()
  } catch (e) {
    console.log(e)
  }
  walletSelect.value = null
}
</script>
<template>
  <BaseModal :isOpen="isOpen" :onClose="onClose" contentClass="w-[90%] max-w-[500px] min-w-[340px]">
    <template #header>
      <h2 class="text-xl">Connect to Nuxt</h2>
    </template>
    <div class="flex-1 flex flex-wrap gap-2 items-center justify-center mt-3">
      <div
        v-for="wallet in WALLET_LIST"
        class="flex p-8 w-full relative sm:w-[200px] h-[200px] justify-center flex-col items-center gap-[4px] text-[18px] font-bold hover:bg-blueGray-light-200 cursor-pointer border-blueGray-light-200 border rounded-lg"
        :key="wallet.key"
        @click="handleSelectWallet(wallet)"
        :class="walletSelect?.key ? 'cursor-not-allowed hover:bg-transparent' : ''"
      >
        <img :src="wallet.icon" alt="wallet-icon" class="w-[48px] h-[48px] mt-2" />
        {{ wallet.name }}
        <div
          v-if="walletSelect?.key === wallet.key"
          class="!absolute w-full h-full flex items-center justify-center bg-blueGray-light-200"
        >
          <BaseProgressCircular rotate width="40" height="40" class="text-primary-400" />
        </div>
      </div>
    </div>
  </BaseModal>
</template>

<style scoped>
h2 {
  margin-top: 0;
  font-size: 24px;
  font-weight: bold;
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

li {
  padding: 12px 16px;
  margin-bottom: 8px;
  border-radius: 4px;
  text-align: left;
  cursor: pointer;
  transition: background-color 0.3s ease;
  border: 1px solid;
}

li:last-child {
  margin-bottom: 0;
}
</style>
