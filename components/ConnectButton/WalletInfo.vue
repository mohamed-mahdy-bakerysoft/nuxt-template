<script setup lang="ts">
import { useSnackbarStore } from '~/store/snackbar'
const snackbarStore = useSnackbarStore()
const props = defineProps({
  logo: String,
  address: {
    type: String,
    required: true,
    default: ''
  }
})
const copy = () => {
  navigator.clipboard.writeText(props.address)
  snackbarStore.show({
    message: 'Address copied',
    color: 'success'
  })
}
</script>

<template>
  <div class="flex gap-[4px] items-center">
    <img :src="logo" alt="metaMaskLogo" class="w-[32px] h-[32px]" />
    <p class="flex-1 text-xs">{{ getShortAddress(address) }}</p>
    <BaseButton icon="copy" class="text-blueGray-400" size="xs" @click="copy" />
  </div>
</template>
