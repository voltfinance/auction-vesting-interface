import { useWeb3React as useWeb3ReactCore } from '@web3-react/core'
import { useMemo, useState, useEffect } from 'react'
import { NetworkContextName } from '../constants'
import { useWeb3Context } from '../context/web3'

export function useActiveWeb3React() {
  const context = useWeb3ReactCore()
  const contextNetwork = useWeb3ReactCore(NetworkContextName)
  return context.active ? context : contextNetwork
}

export function useInjectedProvider() {
  const { ethereum: library } = window
  return useMemo(() => library, [library])
}

export function useBlockNumber() {
  const { web3 } = useWeb3Context()
  const [blockNumber, setBlockNumber] = useState(undefined)
  useAsyncWeb3Call(web3?.eth?.getBlockNumber(), setBlockNumber, web3)

  return blockNumber
}

export function useAsyncWeb3Call(promise, setResult, dep) {
  useEffect(() => {
    let active = true
    load()
    return () => {
      active = false
    }

    async function load() {
      setResult(undefined) // this is optional
      const res = await promise
      if (!active) {
        return
      }
      setResult(res)
    }
  }, [promise, dep])
}
