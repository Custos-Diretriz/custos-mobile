// src/crypto-polyfill.js

// Apply only with Expo SDK 48
import { getRandomValues as expoCryptoGetRandomValues } from 'expo-crypto'

class Crypto {
  getRandomValues = expoCryptoGetRandomValues
}

// eslint-disable-next-line no-undef
const webCrypto = typeof crypto !== 'undefined' ? crypto : new Crypto()

;(() => {
  if (typeof crypto === 'undefined') {
    Object.defineProperty(window, 'crypto', {
      configurable: true,
      enumerable: true,
      get: () => webCrypto
    })
  }
})()
