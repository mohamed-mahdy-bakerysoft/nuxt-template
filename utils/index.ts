import dayjs from 'dayjs'
import { NFTStatus } from '@/libs/sdk-ts/chain/flux/fnft/v1beta1/nft'
import Constants from './Constants'
import { NFTType, Product } from './interface'
import { S3Obj } from '@/libs/sdk-ts/chain/flux/indexer/media/query'
import * as media from '@/libs/sdk-ts/chain/flux/indexer/media/query'
import { Network, defaultNetwork, getNetworkEndpoint } from '@/libs/sdk-ts/packages/networks'
import { ChainRestTendermintApi } from '@/libs/sdk-ts/packages/client'
import {
  DEFAULT_BLOCK_TIMEOUT_HEIGHT,
  BigNumberInBase,
  getEthereumAddress
} from '@/libs/sdk-ts/packages/utils'
const cloudfrontUrl = import.meta.env.VITE_CLOUDFRONT_URL
/**
 * Store data in the local storage
 * @param key The key to store the data under
 * @param value The value to store
 */
export function setStore(key: string, value: any): void {
  localStorage.setItem(key, JSON.stringify(value))
}

/**
 * Retrieve data from the local storage
 * @param key The key to retrieve the data from
 */
export function getStore(key: string): any {
  const item = localStorage.getItem(key)
  if (!item) return null
  return JSON.parse(item)
}

export function getShortAddress(address: string): string {
  try {
    return `${address.substring(0, 6)}...${address.substring(address.length - 6)}`
  } catch (e) {
    return address
  }
}

export function getDeepValue(obj: any, path: string) {
  const parts = path.split('.')
  return parts.reduce((acc: any, part: string) => acc && acc[part], obj)
}

export function getAverageRGB(imgEl: any) {
  if (!imgEl.value) {
    return { r: 0, g: 0, b: 0 }
  }
  imgEl.value.crossOrigin = 'anonymous'
  var blockSize = 5, // only visit every 5 pixels
    defaultRGB = { r: 0, g: 0, b: 0 }, // for non-supporting envs
    canvas = document.createElement('canvas'),
    context = canvas.getContext && canvas.getContext('2d'),
    data,
    width,
    height,
    i = -4,
    length,
    rgb = { r: 0, g: 0, b: 0 },
    count = 0
  if (!context) {
    return defaultRGB
  }

  height = canvas.height = imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height
  width = canvas.width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width
  canvas.height = 150
  canvas.width = 300
  context.drawImage(imgEl.value, 0, 0)

  try {
    data = context.getImageData(0, 0, 300, 150)
  } catch (e) {
    return defaultRGB
  }

  length = data.data.length

  while ((i += blockSize * 4) < length) {
    ++count
    rgb.r += data.data[i]
    rgb.g += data.data[i + 1]
    rgb.b += data.data[i + 2]
  }

  // ~~ used to floor values
  rgb.r = ~~(rgb.r / count)
  rgb.g = ~~(rgb.g / count)
  rgb.b = ~~(rgb.b / count)

  return rgb
}

export function isValidUrl(string: string) {
  let url

  try {
    url = new URL(string)
  } catch (_) {
    return false
  }

  return url.protocol === 'http:' || url.protocol === 'https:'
}

export function isPositiveInteger(number: number) {
  return Number.isInteger(number) && number > 0
}

export function isNumberAndGreaterThanZero(number: number) {
  return typeof number === 'number' && number > 0
}

export function isDateGreaterThanCurrent(timestamp: number) {
  const inputDate = new Date(timestamp)
  const currentDate = new Date()

  return inputDate > currentDate
}

export function calculateDaysToISOTimestamp(isoTimestamp: any): number {
  try {
    const targetDate = dayjs(Number(isoTimestamp))
    const currentDate = dayjs()
    const diffInMs = targetDate.diff(currentDate, 'day')
    return diffInMs
  } catch (error: any) {
    return 0
  }
}

export function convertToKFormat(number: any) {
  if (number < 1000) {
    return number.toString()
  }
  let divided = number / 1000
  let formatted = divided % 1 === 0 ? divided.toFixed(0) : divided.toFixed(1)
  return formatted + 'K'
}

export function calculateProgressPercentage({
  supply,
  available_shares,
  owner_equity_percent
}: any) {
  const maxAvailableShares = calculateMaxAvailableShares(supply, owner_equity_percent)
  const sales = maxAvailableShares - available_shares
  return (Number(owner_equity_percent) + (sales / supply) * 100).toFixed(2)
}

export function calculateTargetAmount(supply: number | string, amount: number | string) {
  return Number(supply) * Number(amount)
}

export function getOwnerMockData(publicAddress: string, name: string) {
  return {
    publicAddress,
    name: name ?? '-',
    verify: true
  }
}
function calculateMaxAvailableShares(supply: number, owner_equity_percent: number) {
  return Math.floor(Number(supply - calculateMaxOwnerEquityAmount(supply, owner_equity_percent)))
}
function calculateMaxOwnerEquityAmount(supply: number, owner_equity_percent: number) {
  return supply * (owner_equity_percent / 100)
}

// multiple number ber with 10^decimals use BigNumber
export function multipleNumberWithDecimals(number: number, decimals: number) {
  return (number * Math.pow(10, decimals)).toString()
}

// divide number ber with 10^decimals use BigNumber
export function divideNumberWithDecimals(number: number, decimals: number) {
  return (number / Math.pow(10, decimals)).toString()
}

export const nftIsISO = (nft: any) => {
  return nft.status === NFTStatus.ISO
}
export const nftIsFailed = (nft: any) => {
  return nft.status === NFTStatus.Failed
}
export const nftIsActive = (nft: any) => {
  return nft.status === NFTStatus.Active
}

export const nftStatus = (nft: any) => {
  if (nftIsISO(nft)) {
    return 'ISO'
  }
  if (nftIsFailed(nft)) {
    return 'Failed'
  }
  if (nftIsActive(nft)) {
    return 'Production'
  }
  return 'Unknown'
}
export const isLuxAddress = (address: string) => {
  try {
    let prefix = address.slice(0, 3)
    if (prefix !== 'lux') return false
    getEthereumAddress(address)
    return true
  } catch (e) {
    return false
  }
}

// Project
export const getProjectPath = (project: NFTType): string => {
  const networkId = getNetworkStore()
  const path = `${networkId}/${project.class_id}/${project.id}`
  return path
}
export const getProjectLink = (project: NFTType, key: string, removeSuffix = false): string => {
  const path = getProjectPath(project)
  const link = `${cloudfrontUrl}${path}/${key}`

  return removeSuffix ? link : addSuffixToLink(link)
}

export const getProjectThumbnailKey = (): S3Obj => {
  return {
    key: Constants.MEDIA.thumbnail,
    op: media.S3Operation.Put
  }
}
export const getProjectLinkKey = (): S3Obj => {
  return {
    key: Constants.MEDIA.link,
    op: media.S3Operation.Put
  }
}
export const getProjectInfoKey = (): S3Obj => {
  return {
    key: Constants.MEDIA.info,
    op: media.S3Operation.Put
  }
}
export const getProjectVideoKey = (): S3Obj => {
  return {
    key: Constants.MEDIA.video,
    op: media.S3Operation.Put
  }
}
export const getProjectThumbnailLink = (project: NFTType, removeSuffix = false): string => {
  return getProjectLink(project, Constants.MEDIA.thumbnail, removeSuffix)
}
export const getProjectLinkLink = (project: NFTType, removeSuffix = false): string => {
  return getProjectLink(project, Constants.MEDIA.link, removeSuffix)
}
export const getProjectInfoLink = (project: NFTType, removeSuffix = false): string => {
  return getProjectLink(project, Constants.MEDIA.info, removeSuffix)
}
export const getProjectVideoLink = (project: NFTType, removeSuffix = false): string => {
  return getProjectLink(project, Constants.MEDIA.video, removeSuffix)
}

// Product
export const getProductPath = (product: Product): string => {
  const networkId = getNetworkStore()
  const path = `${networkId}/${product.class_id}/${product.id}/${product.product_id}`
  return path
}
export const getProductLink = (product: Product, key: string, removeSuffix = false): string => {
  const path = getProductPath(product)
  const link = `${cloudfrontUrl}${path}/${key}`
  return removeSuffix ? link : addSuffixToLink(link)
}
export const getProductThumbnailKey = (): S3Obj => {
  return {
    key: Constants.MEDIA.thumbnail,
    op: media.S3Operation.Put
  }
}
export const getProductLinkKey = (): S3Obj => {
  return {
    key: Constants.MEDIA.link,
    op: media.S3Operation.Put
  }
}
export const getProductInfoKey = (): S3Obj => {
  return {
    key: Constants.MEDIA.info,
    op: media.S3Operation.Put
  }
}
export const getProductVideoKey = (): S3Obj => {
  return {
    key: Constants.MEDIA.video,
    op: media.S3Operation.Put
  }
}

export const getProductThumbnailLink = (product: Product, removeSuffix = false): string => {
  return getProductLink(product, Constants.MEDIA.thumbnail, removeSuffix)
}
export const getProductLinkLink = (product: Product, removeSuffix = false): string => {
  return getProductLink(product, Constants.MEDIA.link, removeSuffix)
}
export const getProductInfoLink = (product: Product, removeSuffix = false): string => {
  return getProductLink(product, Constants.MEDIA.info, removeSuffix)
}
export const getProductVideoLink = (product: any, removeSuffix = false): string => {
  return getProductLink(product, Constants.MEDIA.video, removeSuffix)
}
// ----------------------------

// Offerings
export const getOfferingPath = (product: Product): string => {
  const networkId = getNetworkStore()
  const path = `${networkId}/${product.class_id}/${product.id}/${product.product_id}`
  return path
}
export const getOfferingLink = (product: Product, key: string, removeSuffix = false): string => {
  const path = getOfferingPath(product)
  const link = `${cloudfrontUrl}${path}/${key}`
  return removeSuffix ? link : addSuffixToLink(link)
}
export const getOfferingKey = (index: number, key: string): string => {
  return index + '/' + key
}
export const getOfferingImageKey = (index: number): S3Obj => {
  return {
    key: getOfferingKey(index, Constants.MEDIA.image),
    op: media.S3Operation.Put
  }
}
export const getOfferingInfoKey = (index: number): S3Obj => {
  return {
    key: getOfferingKey(index, Constants.MEDIA.info),
    op: media.S3Operation.Put
  }
}
export const getOfferingImageLink = (
  product: Product,
  index: number,
  removeSuffix = false
): string => {
  return getOfferingLink(product, getOfferingKey(index, Constants.MEDIA.image), removeSuffix)
}
export const getOfferingInfoLink = (
  product: Product,
  index: number,
  removeSuffix = false
): string => {
  return getOfferingLink(product, getOfferingKey(index, Constants.MEDIA.info), removeSuffix)
}
// ----------------------------

export const getAssetLinksMapTimestamp = (): Record<string, number> => {
  return JSON.parse(getStore(Constants.STORAGE.assetLinksMapTimestamp) || '{}')
}
export const setAssetLinksMapTimestamp = (data: Array<string> | string): void => {
  let timestamp = new Date().getTime()
  let oldTimestamp = getAssetLinksMapTimestamp()
  if (typeof data === 'string') {
    oldTimestamp[data] = timestamp
  }
  if (Array.isArray(data)) {
    data.map((item: string) => {
      oldTimestamp[item] = timestamp
    })
  }
  setStore(Constants.STORAGE.assetLinksMapTimestamp, JSON.stringify(oldTimestamp))
}

export const addSuffixToLink = (link: string): string => {
  return link
  // const timestamp = getAssetLinksMapTimestamp()
  // let suffix = timestamp[link] || 0
  // if (new Date(suffix + Constants.TIME_RELOAD_ASSETS) < new Date()) {
  //   suffix = new Date().getTime()
  //   timestamp[link] = suffix
  //   setStore(Constants.STORAGE.assetLinksMapTimestamp, JSON.stringify(timestamp))
  // }
  // return `${link}?${suffix}`
}

export const getNetworkStore = (): Network => {
  return getStore(Constants.STORAGE.network) || defaultNetwork
}
export const setNetworkStore = (network: Network): void => {
  setStore(Constants.STORAGE.network, network)
}

export const getTimeoutHeight = async () => {
  let network = getNetworkStore()
  const lcd = getNetworkEndpoint(network).lcd
  const chainRestTendermintApi = new ChainRestTendermintApi(lcd)
  const latestBlock = await chainRestTendermintApi.fetchLatestBlock()
  const latestHeight = latestBlock.header.height
  return new BigNumberInBase(latestHeight).plus(DEFAULT_BLOCK_TIMEOUT_HEIGHT)
}

export const deepClone = (obj: any) => {
  return JSON.parse(JSON.stringify(obj))
}

export const getInfoFromDenom = (denom: string) => {
  let res = denom.split(':')
  return {
    class_id: res[0],
    id: res[1]
  }
}
export const getDenom = (class_id: string, id: string) => {
  return `${class_id}:${id}`
}
