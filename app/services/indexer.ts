import * as mediaQuery from '@/libs/sdk-ts/chain/flux/indexer/media/query'
import * as media from '@/libs/sdk-ts/chain/flux/indexer/media/query'
import { grpc } from '@improbable-eng/grpc-web'
import { getClients } from './client'
import { walletStrategy } from './wallet'
import axios from 'axios'
import * as ethutil from '@ethereumjs/util'
import { Wallet } from '@/libs/sdk-ts/packages'
export const getAccount = async (luxAddress: string) => {
  const { indexerAccountQueryClient } = getClients()
  const senderInfo = await indexerAccountQueryClient.getAccount(luxAddress)
  return senderInfo
}

export const faucet = async (address: string): Promise<any> => {
  const { indexerWeb3gwQueryClient } = getClients()
  const res = await indexerWeb3gwQueryClient.faucetSend(address)
  return res
}
export const getPresignedURL = async (luxAddress: string, path: string, objs: Array<any>) => {
  const { indexerMediaQueryClient } = getClients()
  const req: media.PresignedURLRequest = {
    path,
    objs: objs.map((obj) => ({
      key: obj.key,
      op: obj.op
    }))
  }
  const account = await getAccount(luxAddress)
  const nonce = Buffer.from(account.nonce)
  const reqBz = mediaQuery.PresignedURLRequest.encode(req).finish()
  const msg = Buffer.concat([reqBz, nonce]).toString()
  const signature = await walletStrategy.signPersonal(luxAddress, msg)
  let _signature = ''
  const sigParts = ethutil.fromRpcSig(signature)
  const v = Number(sigParts.v) % 27
  const reqSig = ethutil.toRpcSig(BigInt(v), sigParts.r, sigParts.s)
  _signature = reqSig.substring(2)
  const metadata = new grpc.Metadata({
    sender: luxAddress,
    signature: _signature
  })
  const res = await indexerMediaQueryClient?.getPresignedURL(req, metadata)
  return res
}

export const uploadMedia = async (presignedURL: string, file: File): Promise<any> => {
  const res = await axios.put(presignedURL, file, {
    headers: {
      'Content-Type': file.type
    }
  })
  return res
}
export const uploadInfo = async (presignedURL: string, data: string): Promise<any> => {
  const res = await axios.put(presignedURL, data, {
    headers: {
      'Content-Type': 'text/plain'
    }
  })
  return res
}
