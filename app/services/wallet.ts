import { CHAIN_ID } from '@/app/utils/constants'
import { getClients } from './client'
import { useWalletStore } from '@/store/wallet'
import { Coin } from '@/libs/sdk-ts/chain/cosmos/base/v1beta1/coin'
import { Wallet } from '@/libs/sdk-ts/packages'
import WalletStrategy from '@/libs/sdk-ts/packages/wallet'
export const walletStrategy: any = new WalletStrategy(Wallet.Keplr, CHAIN_ID)

export const getAddresses = async (): Promise<string[]> => {
  const addresses = await walletStrategy.getAddresses()

  if (addresses.length === 0) {
    throw new Error('There are no addresses linked in this wallet.')
  }
  return addresses
}

export const getAllAssets = async (address: string): Promise<any> => {
  const { chainBankQueryClient } = getClients()
  const walletStore = useWalletStore()
  const res = await chainBankQueryClient.getAllBalances(address)
  walletStore.setStore({ assets: res.balances })
}

export const getAsset = async (address: string, denom: string): Promise<Coin> => {
  const { chainBankQueryClient } = getClients()
  const res = await chainBankQueryClient.getBalance(address, denom)
  return res.balance as Coin
}
