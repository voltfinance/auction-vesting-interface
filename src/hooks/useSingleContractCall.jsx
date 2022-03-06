import { useEffect, useMemo, useState } from 'react'
import { useWeb3Context } from '../context/web3'

export default function useSingleContractCall (contract, method, args = []) {
  const { chainId } = useWeb3Context()

  const [result, setResult] = useState(null)
  const [ready, setReady] = useState(false)

  const memoArgs = useMemo(() => args, [args])

  const call = async () => {
    if (!contract || !method || ready) return

    const callResult = await contract.methods[method](...memoArgs).call()
    setResult(callResult)
    setReady(true)
  }

  useEffect(() => {
    call()
  }, [contract, method, memoArgs, chainId])

  return result
}
