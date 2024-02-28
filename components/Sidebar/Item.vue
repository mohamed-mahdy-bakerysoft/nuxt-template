<script setup lang="ts">
import useWallet from '@/composables/useWallet'
import Constants from '@/utils/Constants'
import { useRouter, useRoute } from 'vue-router'
const { isConnected, address } = useWallet()
const props = defineProps({
  label: String,
  to: String,
  id: String,
  icon: String,
  onActive: Function,
  requiresAuth: Boolean,
  isMobile: Boolean,
  indexActive: Number,
  indexItem: String
})
const { to, requiresAuth, label, onActive, id, indexItem } = props
const _id = `sidebar-item-${id}`
const walletStore = useWalletStore()
const route = useRoute()
const router = useRouter()
const isHidden = computed(() => {
  return !to
})
watch(
  [() => address.value, () => route],
  ([newAddress, newRoute], []) => {
    if (newRoute.path === to) {
      return router.push(Constants.ROUTES[0].path)
    }
    if (newRoute.path === to) {
      return onActive && onActive(_id, indexItem)
    }
  },
  {
    deep: true
  }
)

onMounted(() => {
  if (route.path === to) {
    onActive && onActive(_id, indexItem)
  }
})
const isDisabled = computed(() => {
  return requiresAuth && !isConnected.value
})
const click = () => {
  if (isDisabled.value) {
    return walletStore.toggleModalWallets()
  }
}
</script>
<template>
  <component
    v-if="!isHidden"
    :is="isDisabled ? 'span' : 'router-link'"
    :to="to"
    class="item flex gap-4 hover:bg-blueGray-light-200 !bg-opacity-30 cursor-pointer w-full capitalize text-[16px] leading-[22px] font-bold px-[10px] py-[14px] pl-[50px]"
    :class="[
      isMobile ? 'is-mobile' : 'transition-colors duration-[0.4s]',
      isMobile && indexActive == Number(indexItem) ? 'bg-blueGray-light-200' : '',
      indexActive == Number(indexItem) ? 'text-blueGray-50' : 'text-blueGray-300',
      // isDisabled ? 'text-neutral-500 pointer-events-none' : '',
      !isMobile && indexActive == Number(indexItem) - 1 ? 'previous-active' : '',
      !isMobile && indexActive == Number(indexItem) + 1 ? 'next-active' : ''
    ]"
    :id="_id"
    @click="click"
  >
    <BaseIcons :name="icon" />
    {{ label }}
  </component>
</template>

<style scoped lang="scss">
.item:not(.is-mobile) {
  position: relative;
  z-index: 5;
}
.previous-active {
  border-top-right-radius: 22px;
}
.next-active {
  border-bottom-right-radius: 22px;
}
.item:hover {
  z-index: 2;
}

.item.router-link-active:not(.is-mobile) {
  &:hover {
    background-color: transparent;
  }
}
</style>
