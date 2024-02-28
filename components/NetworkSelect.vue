<script setup lang="ts">
import { Network, networkEndpoints } from '@/libs/sdk-ts/packages/networks'
import { useStreamManagerStore } from '@/store/streamManager'
const userStore = useUserStore()
const networkStore = useNetworkStore()
const walletStore = useWalletStore()
const streamManagerStore = useStreamManagerStore()

const network = computed(() => networkStore.store.network)
const onSelectNetwork = (newVal: Network) => {
  try {
    if (newVal === network.value) return
    streamManagerStore.cancelAll()
    userStore.resetStore()
    walletStore.resetStore()
    networkStore.setNetwork(newVal)
  } catch (e) {
    console.log(e)
  }
}
const networksList = Object.keys(networkEndpoints).map((key) => {
  return {
    name: networkEndpoints[key as Network].name as string,
    value: key as Network
  }
})
const menu = ref()
</script>
<template>
  <BaseDropdown
    v-model="menu"
    :popperHideTriggers="(triggers:Array<any>) => [...triggers, 'click']"
  >
    <BaseButton class="flex items-center !px-4" size="medium">
      <BaseIcons
        name="dot"
        v-if="networkStore.store.connected"
        class="mr-[4px] w-4 h-4 text-[#27dd23]"
      />
      <div class="flex items-center">
        {{ network }}
        <BaseIcons v-show="!menu" name="angleDown" />
        <BaseIcons v-show="menu" name="angleUp" />
      </div>
    </BaseButton>
    <template #content>
      <div>
        <div
          v-for="(item, index) in networksList"
          :key="index"
          @click="onSelectNetwork(item.value)"
          class="hover:bg-blueGray-light-50 flex items-center gap-2 cursor-pointer"
        >
          <p class="px-8 py-2">{{ item.name }}</p>
        </div>
      </div>
    </template>
  </BaseDropdown>
</template>
