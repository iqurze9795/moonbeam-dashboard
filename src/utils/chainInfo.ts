import { config } from '@/config'
import {
  ethBlockScanApi,
  moonriverBlockScanApi,
  moonbaseBlockScanApi,
  polygonBlockScanApi,
  bscBlockScanApi,
} from '@/services/httpClient'
const supportChainID = ['1', '56', '137', '1284', '1287', '1285', 1, 56, 137, 1284, 1285, 1287]
const mapChainLogo = {
  1: require(`@/assets/images/chains/eth.png`),
  56: require(`@/assets/images/chains/bsc.png`),
  137: require(`@/assets/images/chains/matic.png`),
  1285: require(`@/assets/images/chains/moonriver.png`),
  1287: require(`@/assets/images/chains/moonbeam.png`)
}
const mapChainName = {
  1: 'Ethereum Mainet',
  56: 'Binance Smart Chain',
  137: 'Matic(Polygon)',
  1285: 'Moonriver',
  1287: 'Moonbase Alpha'
}

const mapChainNativeCoin = {
  1: 'ETH',
  56: 'BNB',
  137: 'MATIC',
  1285: 'MOVR',
  1287: 'DEV'
}

const mapChainHost = {
  1: config.etherScanHost,
  56: config.bscScanHost,
  137: config.polygonScanHost,
  1285: config.moonriverBlockScoutHost,
  1287: config.moonbaseBlockScoutHost
}

const mapChainClient = {
  1: ethBlockScanApi,
  56: bscBlockScanApi,
  137: polygonBlockScanApi,
  1285: moonriverBlockScanApi,
  1287: moonbaseBlockScanApi
}

export {
  supportChainID,
  mapChainLogo,
  mapChainName,
  mapChainNativeCoin,
  mapChainHost,
  mapChainClient
}