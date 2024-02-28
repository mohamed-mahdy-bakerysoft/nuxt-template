import './interface'

import * as keplrLogo from '@/assets/images/keplrLogo.png'
import * as metaMaskLogo from '@/assets/images/metaMaskLogo.png'
import { Wallet } from '@/libs/sdk-ts/packages'

const Constants = {
  STORAGE: {
    wallet: 'wallet',
    network: 'network',
    timeoutFaucet: 'timeoutFaucet',
    assetLinksMapTimestamp: 'assetLinksMapTimestamp'
  },
  ROUTES: [
    {
      path: '/',
      name: 'Home',
      icon: 'chartLine'
    },
    {
      path: '/faucet',
      name: 'Faucet',
      icon: 'selectPoint',
      requiresAuth: true
    }
  ],
  MEDIA: {
    thumbnail: 'thumbnail.jpeg',
    link: 'link.pdf',
    info: 'info.txt',
    video: 'video.mp4',
    image: 'image.jpeg'
  },
  TIME_CLOUDFRONT_UPDATED: 12000,
  TIME_RELOAD_ASSETS: 300000 // 5 minuste
}
export const WALLET_ICONS = {
  [Wallet.Metamask]: metaMaskLogo.default,
  [Wallet.Keplr]: keplrLogo.default
}

export default Constants
