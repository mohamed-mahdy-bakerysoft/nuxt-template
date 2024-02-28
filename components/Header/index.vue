<script setup>
const isOpen = ref(false)

function click() {
  isOpen.value = false
}
function onClose() {
  isOpen.value = false
}
function onOpen() {
  isOpen.value = true
}
</script>
<script></script>
<template>
  <div class="header flex">
    <Container class="flex items-center flex-row justify-center h-inherit">
      <div class="flex md:hidden items-center mr-[12px] ml-[-18px]">
        <BaseButton @click="onOpen" icon="menu" />
      </div>

      <div class="flex-1"></div>
      <div class="flex gap-[12px] items-center">
        <NetworkSelect />
        <ConnectButton />
      </div>
    </Container>
  </div>
  <SidebarMobile :isOpen="isOpen" :click="click" :onClose="onClose" />
</template>

<style scoped>
.header {
  min-height: var(--header-height);
  /* background-color: var(--appbar-background); */
}
</style>
