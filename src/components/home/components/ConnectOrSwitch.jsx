import React from 'react'
import wallet from '@/assets/images/wallet.svg'
import useSwitchNetwork from '@/hooks/useSwitchNetwork'
import { useWeb3Context } from '../../../context/web3'
import styled from 'styled-components'
import Row from './Row'


const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
`

const Main = styled.div`
  position: relative;
  padding: 14px;
  border-radius: 5px;
  min-height: 300px;
  &:before {
    content: '';
    position: absolute;
    top: -17px;
    right: -17px;
    bottom: -17px;
    left: -17px;
    z-index: -1;
    border-radius: 5px;
    background: linear-gradient(
      -91.13deg,
      #f3fc1f -3.23%,
      #f3fc1f 26.69%,
      #3ad8a4 156.49%
    );
  }
`
const Card = styled.div`
  display: flex;
  margin: auto;
  margin: 0.5em;
  padding: 1rem;
  background: black;
  border-radius: 5px;
`

export default function ConnectOrSwitch() {
  const { account, chainId, toggleWeb3Modal } = useWeb3Context()
  const switchNetwork = useSwitchNetwork()
  return (
    <>
      <Wrapper>
        <Row style={{ position: 'absolute', top: '100px', left: '35%' }}>
          <Card
            style={{
              width: '100 %!important',
              color: 'white',
              alignContent: 'center',
            }}
          >
            <Main
              style={{
                width: '100%',
                margin: 'auto',
                display: 'flex',
                flexWrap: 'wrap',
                flexDirection: 'column',
              }}
            >
              <div style={{ display: 'flex', width: '100%', margin: 'auto' }}>
                {!account ? (
                  <button className="button-baseline" onClick={toggleWeb3Modal}>
                    <img src={wallet} /> Connect wallet
                  </button>
                ) : chainId !== 122 ? (
                  <button className="button-baseline" onClick={switchNetwork}>
                    Switch to Fuse
                  </button>
                ) : (
                  <></>
                )}
              </div>
            </Main>
          </Card>
        </Row>
      </Wrapper>
    </>
  )
}
