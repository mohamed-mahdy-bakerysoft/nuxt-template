<script setup lang="ts">
import { faucet } from '@/app/services/indexer'
import useWallet from '@/composables/useWallet'
import { useSnackbarStore } from '@/store/snackbar'
import { useNetworkStore } from '@/store/network'
// import Constants from '@/utils/constants'
import { setStore, getStore } from '@/utils'
const _1day = 24 * 60 * 60 * 1000
const snackbarStore = useSnackbarStore()
const networkStore = useNetworkStore()
const { address } = useWallet()
const isConnected = computed(() => networkStore.store.connected)
const requesting = ref(false)
const disabled = ref(false)
const lastFaucet = ref(null)
const getFaucetList = () => {
  return JSON.parse(getStore(Constants.STORAGE.timeoutFaucet) || '{}')
}

const initState = (newAddress: string) => {
  if (!newAddress) {
    lastFaucet.value = null
    return
  }
  const _lastFaucet = getFaucetList()
  if (_lastFaucet && _lastFaucet[newAddress]) {
    lastFaucet.value = _lastFaucet[newAddress]
    const now = new Date().getTime()
    const diff = now - _lastFaucet[newAddress]
    if (diff < _1day) {
      disabled.value = true
    }
    return
  }
  disabled.value = false
}
onMounted(() => {
  initState(address.value)
})
watch(
  [() => address.value],
  ([newAddress], []) => {
    initState(newAddress)
  },
  {
    deep: true
  }
)
const onCountdownEnd = () => {
  disabled.value = false
  setStore(Constants.STORAGE.timeoutFaucet, '')
}
const _faucet = async () => {
  requesting.value = true
  try {
    await faucet(address.value)
    snackbarStore.show({
      message: 'Faucet successfully',
      color: 'success'
    })
    let faucetList = getFaucetList()
    faucetList[address.value] = new Date().getTime()
    lastFaucet.value = faucetList[address.value]
    disabled.value = true
    setStore(Constants.STORAGE.timeoutFaucet, JSON.stringify(faucetList))
  } catch (e: any) {
    snackbarStore.show({
      message: e.message ?? 'Faucet failed',
      color: 'error'
    })
  }
  requesting.value = false
}
</script>

<template>
  <div class="p-8 items-center border border-blueGray-light-300 rounded-xl flex flex-wrap gap-4">
    <div class="flex-1">
      <div class="mb-3 flex gap-2">
        <p class="text-[20px] font-bold">Flux Faucet</p>
        <div
          class="py-1 px-3 text-[14px] flex border border-blueGray-light-300 text-blueGray-300 rounded-2xl"
          v-if="lastFaucet"
        >
          Next Faucet in:
          <Countdown
            :timestamp="new Date(lastFaucet).getTime() + _1day"
            :onCountdownEnd="onCountdownEnd"
            class="ml-[8px]"
          />
        </div>
      </div>
      <p class="text-blueGray-300">
        User can claim <span class="text-blueGray-50 font-bold">10 LUX </span>and
        <span class="text-blueGray-50 font-bold">100k USDT</span> for each account every 24h
      </p>
    </div>
    <div class="w-full md:w-auto">
      <BaseButton
        variant="primary"
        :disabled="!address || disabled || !isConnected"
        :loading="requesting"
        @click="_faucet"
      >
        Request
      </BaseButton>
    </div>
  </div>
</template>
