import { defineStore } from 'pinia'
import { UserStoreType } from '@/utils/interface'
export const useUserStore = defineStore('userStore', () => {
  const store = ref<UserStoreType>({
    userInfo: {
      avatar:
        'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/2430d959-ea06-470f-a7c4-45c9d358e25f/dg4w17r-4e2a0d83-063a-4185-8135-0660e4e87ade.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzI0MzBkOTU5LWVhMDYtNDcwZi1hN2M0LTQ1YzlkMzU4ZTI1ZlwvZGc0dzE3ci00ZTJhMGQ4My0wNjNhLTQxODUtODEzNS0wNjYwZTRlODdhZGUucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.l8d8rYZP8hXP-wDYqBgmlQ2OVcoJZ9N2VMOfJfZVsfY',
      displayName: 'Flux User'
    }
  })

  const setStore = (data: any) => {
    let keys = Object.keys(data) as Array<keyof UserStoreType>
    keys.forEach((key) => {
      store.value = {
        ...store.value,
        [key]: data[key]
      }
    })
  }
  const resetStore = () => {
    store.value = {
      userInfo: {
        avatar:
          'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/2430d959-ea06-470f-a7c4-45c9d358e25f/dg4w17r-4e2a0d83-063a-4185-8135-0660e4e87ade.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzI0MzBkOTU5LWVhMDYtNDcwZi1hN2M0LTQ1YzlkMzU4ZTI1ZlwvZGc0dzE3ci00ZTJhMGQ4My0wNjNhLTQxODUtODEzNS0wNjYwZTRlODdhZGUucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.l8d8rYZP8hXP-wDYqBgmlQ2OVcoJZ9N2VMOfJfZVsfY',
        displayName: 'Flux User'
      }
    }
  }
  return {
    setStore,
    store,
    resetStore
  }
})
