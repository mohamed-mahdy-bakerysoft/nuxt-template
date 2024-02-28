<script setup>
import useWallet from '@/composables/useWallet'
const { isConnected } = useWallet()
</script>
<template>
  <div v-if="!isConnected" class="disabled-page"></div>
</template>
<style scoped>
.disabled-page {
  width: 100%;
  height: 100%;
  position: absolute;
  backdrop-filter: blur(1px);
  z-index: 3;
  top: 0;
}
</style>
