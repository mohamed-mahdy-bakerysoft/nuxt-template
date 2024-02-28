import { useNetworkStore } from '@/store/network'

export default function useWatchNetworkChange(callback: Function) {
  const networkStore = useNetworkStore()
  watch(
    [() => networkStore.store.network, () => networkStore.store.connected],
    ([newNetwork, newConnected], [oldNetwork, oldConnected]) => {
      // Exit the function if 'newNetwork' is not defined.
      if (!newNetwork) return
      if (!newConnected) return

      // If the network has changed (newNetwork is different from oldNetwork),
      // or the connection status has changed from disconnected to connected,
      // call the provided callback function.
      if (newNetwork !== oldNetwork || (!oldConnected && newConnected)) {
        callback && callback()
      }
    }
  )
}
