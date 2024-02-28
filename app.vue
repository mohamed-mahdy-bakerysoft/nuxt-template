<script setup lang="ts">
import { initClient } from '@/app/services/client'
import { useNetworkStore } from '@/store/network'
const networkStore = useNetworkStore()
const requesting = ref(false)

useHead({
  bodyAttrs: {
    class: 'text-blueGray-50 dark:text-blueGray-50 bg-blueGray-50 dark:bg-blueGray-900'
  }
})
onMounted(() => {
  initClient(networkStore.store.network)
})
</script>
<template>
  <NuxtLayout>
    <div class="flex h-[100vh]">
      <Sidebar />
      <div class="flex-1 overflow-x-hidden flex flex-col">
        <Header></Header>
        <Container class="overflow-auto container flex flex-col">
          <NuxtPage />
        </Container>
      </div>
    </div>
    <Loading v-if="requesting" />
    <BaseSnackbar />
  </NuxtLayout>
</template>

<style scoped>
.container {
  max-height: calc(100vh - var(--header-height));
  max-width: 100vw;
}
</style>
