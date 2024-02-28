<script setup>
const props = defineProps({
  timestamp: {
    type: Number,
    required: true
  },
  onCountdownEnd: {
    type: Function,
    default: () => {}
  }
})

const countdown = ref('')

const calculateCountdown = () => {
  const now = new Date()
  const endTime = new Date(props.timestamp)
  const timeDiff = endTime - now

  if (timeDiff > 0) {
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000)

    countdown.value =
      days > 0
        ? `${days} days  ${hours.toString()}h`
        : `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds
            .toString()
            .padStart(2, '0')}`
  } else {
    countdown.value = '0 day'
    props.onCountdownEnd()
  }
}

let intervalId = null
onMounted(() => {
  intervalId = setInterval(calculateCountdown, 1000)
  calculateCountdown()
})

onBeforeUnmount(() => {
  if (intervalId) {
    clearInterval(intervalId)
  }
})

const countdownDisplay = computed(() => countdown.value)
</script>

<template>
  <span>
    {{ countdownDisplay }}
  </span>
</template>
