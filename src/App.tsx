import { useState } from 'react'
import './App.css'
import { Box, Button, Flex, Heading, Input } from '@chakra-ui/react'
import * as crypto from 'crypto-js'

const RELAYER_ADDRESS = 'guest-book.testnet'
const API_KEY = '6170fa03-5dcd-42ea-bef6-b3eab64cf6b5'
const API_SECRET =
  'Y2VjZDYxYjE4OGM0Y2M0MjE4MmUyMDU1YTc0ZDNhNTNjMDNiNjUxODUzZDBkZTRhNGQ'

const request = {
  toCurrency: 'NEAR',
  toWallet: RELAYER_ADDRESS,
  contractCall: {
    method: 'addMessage',
    args: {
      text: 'Message from NearPay<>AppChain',
    },
  },
}

export function convertToString(rec: Record<any, any>): string[] {
  return Object.keys(rec)
    .sort((a, b) => {
      return a < b ? -1 : a > b ? 1 : 0
    })
    .map((key) => {
      if (typeof rec[key] == 'object' && rec[key] != null) {
        return key + ':' + convertToString(rec[key]).join('')
      } else {
        return key + ':' + rec[key]
      }
    })
}

export const generateSign = (rec: Record<any, any>, secret: string) => {
  const forSign = convertToString(rec)

  return crypto.enc.Hex.stringify(crypto.HmacSHA256(secret, forSign.join('')))
}

function App() {
  const [amount, setAmount] = useState('')
  const [target, setTarget] = useState('')

  const goNearPay = () => {
    const url = new URL('https://stage-widget.nearpay.co')
    url.searchParams.append('toCurrency', request.toCurrency)
    url.searchParams.append('toWallet', request.toWallet)
    url.searchParams.append('toAmount', amount)
    url.searchParams.append(
      'contractCall',
      JSON.stringify(request.contractCall)
    )
    url.searchParams.append('apiKey', API_KEY)
    url.searchParams.append(
      'signature',
      generateSign({ ...request, toAmount: amount }, API_SECRET)
    )
    window.open(url.toString(), '_blank')
  }

  return (
    <Box>
      <Flex direction="column" gap={4} w={500}>
        <Heading>Fiat ramp on AppChain</Heading>
        <Input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount of NEAR"
          type={'number'}
        />
        <Input
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          placeholder="Address of AppChain"
        />
        <Button colorScheme="blue" onClick={goNearPay}>
          Buy
        </Button>
      </Flex>
    </Box>
  )
}

export default App
