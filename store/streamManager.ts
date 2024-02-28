import { Subscription } from 'rxjs'
import { defineStore } from 'pinia'
export const useStreamManagerStore = defineStore('streamManagerStore', () => {
  const store = ref<Record<string, Subscription>>({})
  const set = (stream: Subscription, streamKey: string, force?: boolean) => {
    if (store.value[streamKey]) {
      if (!force) {
        return null
      }
      store.value[streamKey].unsubscribe()
    }
    // console.log('stream ', streamKey, 'is ready')
    store.value[streamKey] = stream
  }
  const get = (streamKey: string) => {
    if (!store.value[streamKey]) {
      return null
    }
    return store.value[streamKey]
  }

  const cancelAll = () => {
    // console.log('cancel all stream')
    Object.keys(store.value).forEach((key) => {
      store.value[key].unsubscribe()
    })
  }
  const cancel = (streamKey: string) => {
    if (!store.value[streamKey]) {
      return null
    }
    // console.log('cancel', streamKey)
    store.value[streamKey].unsubscribe()
    delete store.value[streamKey]
  }
  const cancelIfExists = (streamKey: string) => {
    if (!store.value[streamKey]) {
      return
    }
    store.value[streamKey].unsubscribe()
    delete store.value[streamKey]
  }
  const generateStreamKey = (request: any) => {
    let streamKey = ''
    if (request.page) {
      streamKey += request.page
    }
    if (request.class_id) {
      streamKey += request.class_id
    }
    if (request.id) {
      streamKey += '-' + request.id
    }
    if (request.project_id) {
      streamKey += '-' + request.project_id
    }
    if (request.owner) {
      streamKey += '-owner=' + request.owner
    }
    if (request.address) {
      streamKey += '-address=' + request.address
    }
    if (request.status) {
      streamKey += '-status=' + request.status
    }
    if (request.height) {
      streamKey += '-height=' + request.height
    }
    if (request.modules) {
      streamKey += '-modules=' + request.modules.join(',')
    }
    return streamKey
  }

  return { store, set, get, cancelAll, cancel, cancelIfExists, generateStreamKey }
})
