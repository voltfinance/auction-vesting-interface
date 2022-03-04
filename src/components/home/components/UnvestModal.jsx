import React from 'react'
import { ButtonGradient } from './Button'
import styled from 'styled-components'
import VoltIcon from '@/assets/images/volt.svg'
import Underline from '@/assets/images/underline.svg'
import Row from './Row'
import BigNumber from 'bignumber.js'
import { useVestingIds } from '../../../hooks/useVesting'
import { useBlockNumber } from '../../../hooks'
import { useWeb3Context } from '../../../context/web3'
import { TOKENSWAP_VESTING_ADDRESSES } from '../../../constants'

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
const Volt = styled.div`
  font-family: Inter;
  font-style: normal;
  font-weight: 300;
  font-size: 18px;
  line-height: 22px;
  display: flex;
  padding: 6px;
  margin: auto;
`

export default function UnvestModal() {
//   const userUnclaimedAmount = useVestingTotalUnclaimedAmount()
  console.log(useVestingIds(TOKENSWAP_VESTING_ADDRESSES['0.03']))
  const vestingClaimableAmount = 0
  return (
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
              {/* <img src={Ido} alt="" style={{ width: '177px', paddingBottom: '14px', margin: 'auto' }} /> */}
              First Vesting
            </div>
            <img
              src={VoltIcon}
              alt=""
              style={{ width: '65px', paddingBottom: '15px', margin: 'auto' }}
            />
            Your Volt tokens
            <br /> unvested at TGE
            <img
              src={Underline}
              alt=""
              style={{ width: '100%', margin: 'auto' }}
            />
            <Volt>Volt: 0</Volt>
            <img
              src={Underline}
              alt=""
              style={{ width: '100%', margin: 'auto' }}
            />
            <ButtonGradient
              maxWidth={'100%'}
              marginTop={'33px'}
              onClick={() => setStage(4)}
            >
              Claim 0
            </ButtonGradient>
            <ButtonGradient
              maxWidth={'100%'}
              marginTop={'33px'}
              onClick={() => setStage(4)}
            >
              Claim 0
            </ButtonGradient>
          </Main>
        </Card>
        <Card style={{ width: '100 %!important', color: 'white' }}>
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
              {/* <img src={Ido} alt="" style={{ width: '177px', paddingBottom: '14px', margin: 'auto' }} /> */}
              Second Vesting
            </div>
            <img
              src={VoltIcon}
              alt=""
              style={{ width: '65px', paddingBottom: '15px', margin: 'auto' }}
            />
            Daily Volt Unvesting
            <img
              src={Underline}
              alt=""
              style={{ width: '100%', margin: 'auto' }}
            />
            <Volt>Volt: 0</Volt>
            <img
              src={Underline}
              alt=""
              style={{ width: '100%', margin: 'auto' }}
            />
            <ButtonGradient
              maxWidth={'100%'}
              marginTop={'33px'}
              onClick={() => setStage(4)}
            >
              Claim 0
            </ButtonGradient>
            <ButtonGradient
              maxWidth={'100%'}
              marginTop={'33px'}
              onClick={() => setStage(4)}
            >
              Claim 0
            </ButtonGradient>
          </Main>
        </Card>
      </Row>
    </Wrapper>
  )
}
