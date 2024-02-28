import useWallet from './useWallet'
export default function useDisconnectWallet(callback: Function) {
  const { address } = useWallet()
  watch([() => address.value], ([newAddress], []) => {
    if (!newAddress) {
      callback && callback()
    }
  })
}
