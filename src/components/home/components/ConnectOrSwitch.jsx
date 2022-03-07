import React, { useEffect } from 'react'
import styled from 'styled-components'
import wallet from '@/assets/images/wallet.png'
import { useWeb3Context } from '@/context/web3'
import useSwitchNetwork from '@/hooks/useSwitchNetwork'

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  position: relative;
  height: 100vh;
`

const Card = styled.div`
  position: absolute;
  top: 30%;
  width: 428px;
  display: flex;
  margin: auto;
  margin: 0.5em;
  padding: 1rem;
  background: #0B0C13;
  border-radius: 10px;
  color: white;
`

const Main = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  margin: auto;
  border-radius: 10px;
  height: 200px;
  width: 100%;
  &:before {
    content: '';
    position: absolute;
    top: -17px;
    right: -17px;
    bottom: -17px;
    left: -17px;
    z-index: -1;
    border-radius: 10px;
    background: linear-gradient(130.47deg, #3AD889 -6.17%, #F3FC1F 108.46%);
  }
`

const Text = styled.p`
font-family: Inter;
font-style: normal;
font-weight: bold;
font-size: 24px;
margin-bottom: 28px;
text-align: center;
`

export default function ClaimVestingTable() {
  const { account, chainId, toggleWeb3Modal } = useWeb3Context()
  const switchNetwork = useSwitchNetwork()

  useEffect(()=>{

  }, [account, chainId])
  return (
    <Wrapper>
      <Card >
        <Main>
          <img src={wallet} width={'75px'} />       
             <Text>Please connect your wallet</Text>
             {!account ? (
                  <button className="button--secondary" onClick={toggleWeb3Modal}>
                    Connect wallet
                  </button>
                ) : chainId !== 122 ? (
                  <button className=" button--secondary" onClick={switchNetwork}>
                    Switch to Fuse
                  </button>
                ) : (
                  <></>
                )}
        </Main>
      </Card>
    </Wrapper>
  )
}