export default function useDisclose() {
  const isOpen = ref(false)
  const toggle = () => (isOpen.value = !isOpen.value)
  const onClose = () => (isOpen.value = false)
  const onOpen = () => (isOpen.value = true)
  return { isOpen, toggle, onClose, onOpen }
}
