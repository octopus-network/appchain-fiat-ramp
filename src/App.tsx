import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { Box, Button, Flex, Heading, Input } from '@chakra-ui/react'

const RELAYER_ADDRESS = 'chezhe.testnet'

function App() {
  const [amount, setAmount] = useState('')
  const [target, setTarget] = useState('')

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
        <Button colorScheme="blue">Buy</Button>
      </Flex>
    </Box>
  )
}

export default App
