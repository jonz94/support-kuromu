import { createHash, randomBytes } from 'node:crypto'

export function generateMerchantTrade() {
  const now = new Date()

  const formattedDate = now.toLocaleString('zh-TW', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    fractionalSecondDigits: 2,
    hour12: false,
  })

  const merchantTradeDate = now.toLocaleString('zh-TW', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  })

  return {
    merchantTradeNo: `EC${formattedDate.replaceAll(/[\ \/\\:\.]/g, '')}`,
    merchantTradeDate,
  }
}

function convertToDotNetURLEncode(input: string): string {
  return input
    .replaceAll('%20', '+')
    .replaceAll('%21', '!')
    .replaceAll('%28', '(')
    .replaceAll('%29', ')')
    .replaceAll('%2a', '*')
    .replaceAll('%2d', '-')
    .replaceAll('%2e', '.')
    .replaceAll('%5f', '_')
}

export function generateCheckMacValue({
  input,
  hashKey,
  hashIV,
}: {
  input: Record<string, string | number>
  hashKey: string
  hashIV: string
}) {
  const sorted = Object.entries(input).toSorted()

  const merged = [
    // put hash key first
    `HashKey=${hashKey}`,

    ...sorted.map(([key, value]) => `${key}=${value}`),

    // put hash iv last
    `HashIV=${hashIV}`,
  ].join('&')

  const inputForHash = convertToDotNetURLEncode(encodeURIComponent(merged).toLowerCase())

  return createHash('sha256').update(inputForHash).digest('hex').toUpperCase()
}

export function generateRandomString() {
  return randomBytes(1).toString('base64url')
}
