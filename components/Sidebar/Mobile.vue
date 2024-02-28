<script setup>
import Constants from '@/utils/Constants'
const ROUTES = Constants.ROUTES
const position = ref(0)
const indexActive = ref(-1)
const onActive = (id, index) => {
  indexActive.value = index
}
const generateId = (index) => {
  return index + '_mobile'
}
defineProps(['isOpen', 'click', 'onClose'])
</script>
<template>
  <div
    class="md:hidden inset-0 z-10 fixed w-full h-full"
    :class="isOpen ? 'elvisible' : 'elhidden'"
  >
    <div class="absolute inset-0 bg-black opacity-50" tabindex="0" @click="onClose"></div>
  </div>
  <div
    class="sidebar bg-blueGray-800 md:!left-[-100%] top-0 left-0 fixed h-full w-3/4 z-10 flex flex-col transition-transform duration-500"
    :class="isOpen ? 'translate-x-0' : '-translate-x-full'"
  >
    <div class="flex h-[var(--header-height)] items-center">
      <FluxLogo class="flex-1 pl-[33px]" />
      <BaseButton @click="onClose" icon="close" size="small" />
    </div>
    <div class="mobile flex flex-col w-full">
      <SidebarItem
        v-for="(route, index) in ROUTES"
        :label="route.name"
        :to="route.path"
        :id="generateId(index)"
        :indexItem="index"
        :key="route.name"
        @click="click"
        :onActive="onActive"
        :requiresAuth="route.requiresAuth"
        :isMobile="true"
        :indexActive="indexActive"
        :icon="route.icon"
      />
    </div>
  </div>
</template>

<style scoped>
.elhidden {
  opacity: 0;
  top: -100000px;
  transition: opacity 0.5s ease 0s, top 0s linear 0.5s;
}
.elvisible {
  opacity: 1;
  top: 0;
  transition: top 0s linear 0s, opacity 0.5s ease 0.01s;
}

.sidebar {
  width: var(--sidebar-width);
}
.sidebar-active {
  top: v-bind('position');
  transition: all 0.2s ease-in-out;
}
</style>
