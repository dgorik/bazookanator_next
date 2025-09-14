import { TextEncoder, TextDecoder } from 'util'
import '@testing-library/jest-dom'

if (typeof global.TextEncoder === 'undefined') {
  (global as any).TextEncoder = TextEncoder
}
if (typeof global.TextDecoder === 'undefined') {
  (global as any).TextDecoder = TextDecoder
}