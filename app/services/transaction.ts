import * as signingtypes from '@/libs/sdk-ts/chain/cosmos/tx/signing/v1beta1/signing'
import * as txservice from '@/libs/sdk-ts/chain/cosmos/tx/v1beta1/service'
import * as txtypes from '@/libs/sdk-ts/chain/cosmos/tx/v1beta1/tx'
import { handleResponse } from '@/app/services/client'
import { getClients } from '@/app/services/client'
import { getEIP712SignBytes } from '@/libs/sdk-ts/eip712/eip712'
import {
  ChainId,
  createMessageJSON,
  createWeb3Extension,
  getPublicKeyAny,
  createTransaction,
  DEFAULT_STD_FEE,
  createTxRawFromSigResponse,
  Wallet
} from '@/libs/sdk-ts/packages'
import { getTimeoutHeight } from '@/utils'
import { walletStrategy } from './wallet'

export const getAccountInfo = async (luxAddress: string) => {
  const { chainAuthQueryClient } = getClients()
  const senderInfo = await chainAuthQueryClient.getAccount(luxAddress)
  const senderAccNum = senderInfo.info!.account_number!
  const senderAccSeq = senderInfo.info!.sequence!
  return { senderAccNum, senderAccSeq }
}

export const broadcastReqAmino = async ({
  message,
  senderAddr,
  messageWrapper,
  chainId = ChainId.Testnet
}: {
  message: any
  senderAddr: string
  messageWrapper?: any
  chainId?: ChainId
}): Promise<{
  tx_bytes: Uint8Array
  mode: txservice.BroadcastMode
}> => {
  const timeoutHeight = await getTimeoutHeight()
  const { senderAccNum, senderAccSeq } = await getAccountInfo(senderAddr)
  let { signDoc, authInfo, txBody } = createTransaction({
    message,
    chainId,
    sequence: senderAccSeq,
    accountNumber: senderAccNum,
    timeoutHeight: Number(timeoutHeight.toFixed()),
    fee: DEFAULT_STD_FEE,
    memo: '',
    messageWrapper,
    signMode: signingtypes.SignMode.SIGN_MODE_LEGACY_AMINO_JSON,
    pubKey: undefined
  })

  const msgJSON = createMessageJSON(message, messageWrapper)
  let eip712SignDoc = getEIP712SignBytes(signDoc, Array.isArray(msgJSON) ? msgJSON : [msgJSON], '')
  let senderSig = await walletStrategy.signEip712TypedData(
    JSON.stringify(eip712SignDoc),
    senderAddr
  )
  const xPubkey = await walletStrategy.getPubkeyFromSignature(eip712SignDoc, senderSig)

  // set tx pubkey again
  const senderPubkeyAny = getPublicKeyAny(xPubkey)
  authInfo.signer_infos[0].public_key = senderPubkeyAny
  const extOptsAny = createWeb3Extension({
    ethereumChainId: 1,
    feePayer: '',
    feePayerSig: Uint8Array.from([])
  })
  txBody.extension_options = [extOptsAny]
  const bodyBytes = txtypes.TxBody.encode(txBody).finish()
  const txRaw: txtypes.TxRaw = {
    body_bytes: bodyBytes,
    auth_info_bytes: txtypes.AuthInfo.encode(authInfo).finish(),
    signatures: [senderSig]
  }
  const { chainTxClient } = getClients()
  try {
    const res = await chainTxClient.broadcastTx(
      txtypes.TxRaw.encode(txRaw).finish(),
      txservice.BroadcastMode.BROADCAST_MODE_SYNC
    )
    return handleResponse(res)
  } catch (err) {
    throw err
  }
}

export const broadcastReqCosmos = async ({
  message,
  senderAddr,
  messageWrapper,
  chainId = ChainId.Testnet
}: {
  message: any
  senderAddr: string
  messageWrapper?: any
  chainId?: ChainId
}) => {
  const timeoutHeight = await getTimeoutHeight()
  const { senderAccNum, senderAccSeq } = await getAccountInfo(senderAddr)
  const pubKey = await walletStrategy.getPubKey()
  const { signDoc } = createTransaction({
    pubKey,
    chainId,
    fee: DEFAULT_STD_FEE,
    message,
    sequence: senderAccSeq,
    timeoutHeight: timeoutHeight.toNumber(),
    accountNumber: senderAccNum,
    messageWrapper
  })

  /* Sign the Transaction */
  const directSignResponse = await walletStrategy.signTransactionCosmos(
    {
      bodyBytes: signDoc.body_bytes,
      authInfoBytes: signDoc.auth_info_bytes,
      chainId: signDoc.chain_id,
      accountNumber: signDoc.account_number
    },
    senderAddr
  )
  const txRaw = createTxRawFromSigResponse(directSignResponse)

  const { chainTxClient } = getClients()
  const res = await chainTxClient.broadcastTx(
    txtypes.TxRaw.encode(txRaw).finish(),
    txservice.BroadcastMode.BROADCAST_MODE_SYNC
  )
  return handleResponse(res)
}
export const broadcastTx = async ({
  message,
  senderAddr,
  messageWrapper
}: {
  message: any
  senderAddr: string
  messageWrapper?: any
}): Promise<any> => {
  if (walletStrategy.wallet === Wallet.Metamask) {
    return await broadcastReqAmino({
      message,
      senderAddr,
      messageWrapper
    })
  }
  return await broadcastReqCosmos({
    message,
    senderAddr,
    messageWrapper
  })
}
