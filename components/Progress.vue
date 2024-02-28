<script setup lang="ts">
const props = defineProps({
  time: {
    type: Number,
    required: true
  },
  isOpen: {
    type: Boolean,
    required: true
  },
  circle: {
    type: Boolean,
    default: false
  },
  progressProps: {
    type: Object,
    default: () => ({})
  }
})
const show = ref(false)
const intervalTime = 100
const intervalTimeSlow = 100

const progress = ref(0)
let intervalId: any = null

watch(
  () => props.isOpen,
  (newValue: any) => {
    if (newValue) {
      startProgress()
    } else {
      resetProgress()
    }
  }
)

function startProgress() {
  progress.value = 0
  show.value = true
  intervalId = setInterval(() => {
    if (progress.value < 85) {
      progress.value += (intervalTime / props.time) * 100
    } else {
      clearInterval(intervalId)
      startProgressSlow()
    }
  }, intervalTime)
}

function startProgressSlow() {
  intervalId = setInterval(() => {
    if (progress.value < 100) {
      progress.value += 0.02
    } else {
      clearInterval(intervalId)
    }
  }, 100)
}

function resetProgress() {
  clearInterval(intervalId)
  progress.value = 100
  setTimeout(() => {
    show.value = false
    progress.value = 0
  }, 500)
}

onMounted(() => {
  if (props.isOpen) {
    startProgress()
  }
})

onUnmounted(() => {
  clearInterval(intervalId)
})
</script>
<template>
  <div v-if="show" class="container-progress">
    <BaseProgressLinear v-bind="progressProps" :value="progress" v-if="!circle" />
    <BaseProgressCircular v-bind="progressProps" :value="progress" v-else>
      <span class="text-inherit">{{ progress.toFixed(0) }}%</span>
    </BaseProgressCircular>
  </div>
</template>

<style scoped lang="scss">
.container-progress {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.4);
  padding: 20%;
}
</style>
