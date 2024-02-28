<script setup>
import Constants from '@/utils/Constants'
const ROUTES = Constants.ROUTES
const position = ref(0)
const indexActive = ref(-1)
const onActive = (id, index) => {
  indexActive.value = index
  const element = document.getElementById(id)
  if (!element) return
  position.value = element.offsetTop - 22 + 'px'
}
</script>
<template>
  <div class="sidebar flex absolute bg-blueGray-800 ml-4 -left-[350px] md:relative md:left-0">
    <div class="h-[var(--header-height)] flex items-center pl-[33px]">
      <FluxLogo />
    </div>
    <SidebarItem
      v-for="(route, index) in ROUTES"
      :label="route.name"
      :to="route.path"
      :id="index.toString()"
      :indexItem="index.toString()"
      :key="route.name"
      :onActive="onActive"
      :requiresAuth="route.requiresAuth"
      :indexActive="indexActive"
      :icon="route.icon"
    />
    <div class="absolute sidebar-active text-blueGray-900" v-if="indexActive != -1">
      <IconsSidebarActive />
    </div>
  </div>
</template>

<style scoped>
.sidebar {
  width: var(--sidebar-width);
  min-width: var(--sidebar-width);
  height: calc(100vh - 32px);
  margin-top: 16px;
  border-radius: 16px;
  flex-direction: column;
  z-index: 2;
}
.sidebar-active {
  top: v-bind('position');
  z-index: 0;
  transition: all 0.2s ease-in-out;
}
</style>
