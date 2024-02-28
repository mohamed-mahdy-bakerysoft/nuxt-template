import { Network } from '@/libs/sdk-ts/packages/networks'
declare global {
  interface Window {
    keplr: any
  }
}
export interface MsgCreateType {
  url: string
  class_id: string
  supply: string
  initial_price: string
  ISO_success_percent: string
  accepted_payment_denom: string
  dividend_interval: string
  ISO_timestamp: string
  owner_equity_percent: string
}
export type InitialPriceType = {
  denom: string
  amount: string
}
export type Revenue = {
  denom: string
  amount: string
}
export interface Holder {
  address: string
  shares: string
  class_id: string
  id: string
}
export interface NFTType {
  name: string
  image: string
  id: string
  class_id: string
  uri: string
  supply: string
  available: string
  initial_price: InitialPriceType
  ISO_success_percent: string
  accepted_payment_denom: string
  dividend_interval: string
  ISO_timestamp: string
  revenue: Revenue
  last_dividend_timestamp: string
  owner: string
  active: boolean
  available_shares: string
  views: string
  txHash: string
  investors: string
  credit: string
  riskLevel: string
  avgROI: string
  ownerName: string
  holders: Holder[]
  episodes: Object[]
  status: number
  products: Product[]
  amount: string
  thumbnail: string
  link: string
  shares: string
  product_count: string
}
export interface ClassType {
  id: string
  name: string
  description: string
  image: string
  creator: string
  active: boolean
  txHash: string
}
export interface InvestPageStoreType {
  isFetched: boolean
  data: NFTType[]
}
export interface ContentPageStoreType {
  isFetched: boolean
  data: NFTType[]
}
export interface UserStoreType {
  userInfo: {
    avatar: string
    displayName: string
  }
}
export interface WalletStoreType {
  address: string
  balance: number
  isConnected: boolean
  walletName: string
  assets: any[]
  isOpenModalWallets: boolean
}
export interface HolderType {
  address: string
  shares: string
  class_id: string
  id: string
}
export interface Offering {
  url: string
  price: {
    denom: string
    amount: string
  }
  purchase_count: string
  title: string
  description: string
  image: string
  isProgress: boolean
}

export interface Product {
  class_id: string
  id: string
  product_id: string
  title: string
  description: string
  content_url: string
  offerings: Offering[]
  revenue: Revenue
  tags: string[]
  verified: boolean
  name: string
  video: string
  episodes: Array<any>
  reactions: string
  views: string
  ownerName: string
  image: string
  thumbnail: string
}
export interface NetworkStoreType {
  network: Network
  connected: boolean
}
export interface SettingStoreType {
  classes: ClassType[]
  verifiers: string[]
}
export interface TableColumnType {
  key: string
  class?: string | null
  label?: string | null
  cellClass?: string | null
  component?: {
    render: (row: any) => any
    props?: Record<string, any>
    getProps?: (row: any) => Record<string, any>
    click: (row: any) => void
  }
  actions?: [
    {
      label?: string
      props?: Record<string, any>
      getProps?: (row: any) => Record<string, any>
      click?: (row: any) => void
      type?: string
    }
  ]
  display?: (row: any) => string
  click?: (row: any) => void
}
export {}
