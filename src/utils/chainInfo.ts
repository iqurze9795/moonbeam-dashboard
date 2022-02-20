import { config } from '@/config'
import {
  ethBlockScanApi,
  moonriverBlockScanApi,
  moonbeamBlockScanApi,
  polygonBlockScanApi,
  bscBlockScanApi,
} from '@/services/httpClient'
const supportChainID = [
  '1',
  '56',
  '137',
  '1284',
  '1287',
  '1285',
  1,
  56,
  137,
  1284,
  1285,
  1287,
]
const moonRiver = ['1285', 1285]
const moonBeam = ['1284', '1287', 1284, 1287]
const mapChainLogo = {
  1: require(`@/assets/images/chains/eth.png`),
  56: require(`@/assets/images/chains/bsc.png`),
  137: require(`@/assets/images/chains/matic.png`),
  1284: require(`@/assets/images/chains/moonbeam.png`),
  1285: require(`@/assets/images/chains/moonriver.png`),
  1287: require(`@/assets/images/chains/moonbeam.png`),
}
const mapChainName = {
  1: 'Ethereum Mainet',
  56: 'Binance Smart Chain',
  137: 'Matic(Polygon)',
  1284: 'Moonbeam',
  1285: 'Moonriver',
  1287: 'Moonbase Alpha',
}

const mapChainNativeCoin = {
  1: 'ETH',
  56: 'BNB',
  137: 'MATIC',
  1284: 'GLMR',
  1285: 'MOVR',
  1287: 'DEV',
}

const mapDeBankChainId = {
  1: 'eth',
  56: 'bsc',
  137: 'matic',
  1284: 'mobm',
  1285: 'movr',
}

const mapChainHost = {
  1: config.etherScanHost,
  56: config.bscScanHost,
  137: config.polygonScanHost,
  1284: config.moonbeamScanHost,
  1285: config.moonriverScanHost,
  1287: config.moonbaseBlockScoutHost,
}

const mapChainClient = {
  1: ethBlockScanApi,
  56: bscBlockScanApi,
  137: polygonBlockScanApi,
  1284: moonbeamBlockScanApi,
  1285: moonriverBlockScanApi,
}

export {
  mapDeBankChainId,
  supportChainID,
  mapChainLogo,
  mapChainName,
  mapChainNativeCoin,
  mapChainHost,
  mapChainClient,
  moonBeam,
  moonRiver,
}
