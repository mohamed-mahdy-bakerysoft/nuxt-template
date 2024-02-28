import useWallet from './useWallet'
export default function useWatchAddressChange(callback: Function) {
  const { address } = useWallet()
  // Watch for changes in the user's address.
  // This function is similar to the previous one but specifically focuses on changes in the user's address.
  watch([() => address.value], ([newAddress], [oldAddress]) => {
    // Exit the function if 'newAddress' is not defined.
    if (!newAddress) return

    // If the user's address has changed (newAddress is different from oldAddress),
    if (newAddress !== oldAddress) {
      try {
        callback && callback(newAddress)
      } catch (e) {
        // Log any errors that occur during the fetch process.
        console.log(e)
      }
    }
  })
}
