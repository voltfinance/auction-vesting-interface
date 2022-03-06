import React, { useEffect, useMemo, useState } from 'react'
import { ButtonGradient } from './Button'
import styled from 'styled-components'
import VoltIcon from '@/assets/images/volt.svg'
import Underline from '@/assets/images/underline.svg'
import Row from './Row'
import BigNumber from 'bignumber.js'
import { useParams, useNavigate } from 'react-router-dom'
import {
  useAllClaims,
  useClaims,
  useTotalClaim,
  useC,
} from '../../../hooks/useVesting'
import FirstVesting from '@/assets/images/FirstVesting.svg'
import SecondVesting from '@/assets/images/SecondVesting.svg'
import { TOKENSWAP_VESTING_ADDRESSES } from '../../../constants'
import { useVestingContract } from '../../../hooks/useContract'
import useSingleContractCall from '../../../hooks/useSingleContractCall'
import { useWeb3Context } from '../../../context/web3'
// import {useB} from '@/hooks'

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
  const { account } = useWeb3Context()
  const { vestingAddress } = useParams()
  const isVestingAddress = useMemo(() => {
    return Object.values(TOKENSWAP_VESTING_ADDRESSES).includes(vestingAddress)
  }, [vestingAddress])

  const vestingContract = useVestingContract(vestingAddress)

  const claims = useClaims(vestingAddress)
  const firstClaims = useMemo(() => {
    if (!claims) return {}
    return Object.keys(claims).reduce((mem, key) => {
      return key % 2
        ? Object.defineProperty(mem, key, {
            value: BigNumber(claims[key][1]).shiftedBy(-18),
            enumerable: true,
          })
        : mem
    }, {})
  }, [claims])
  const firstClaimSum = useMemo(
    () =>
      Object.values(firstClaims).reduce(
        (sum, claim) => sum.plus(claim),
        BigNumber(0),
      ),
    [firstClaims],
  )
  const secondClaims = useMemo(() => {
    if (!claims) return {}
    return Object.keys(claims).reduce((mem, key) => {
      return key % 2
        ? mem
        : Object.defineProperty(mem, key, {
            value: BigNumber(claims[key][1]).shiftedBy(-18),
            enumerable: true,
          })
    }, {})
  }, [claims])
  const secondClaimSum = useMemo(
    () =>
      Object.values(secondClaims).reduce(
        (sum, claim) => sum.plus(claim),
        BigNumber(0),
      ),
    [secondClaims],
  )

  if (!isVestingAddress) {
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
                  Vesting Address Not Supported
                </div>
              </Main>
            </Card>
          </Row>
        </Wrapper>
      </>
    )
  }
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
              <img
                src={FirstVesting}
                alt=""
                style={{
                  width: '177px',
                  paddingBottom: '14px',
                  margin: 'auto',
                }}
              />
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
            <Volt>Volt: {firstClaimSum.decimalPlaces(4).toString()}</Volt>
            <img
              src={Underline}
              alt=""
              style={{ width: '100%', margin: 'auto' }}
            />
            {Object.keys(firstClaims).map((key) => {
              return (
                <>
                  <ButtonGradient
                    maxWidth={'100%'}
                    marginTop={'33px'}
                    onClick={() => {
                      vestingContract.methods
                        .claimVestedTokens(key)
                        .send({ from: account })
                    }}
                  >
                    Claim {firstClaims[key].decimalPlaces(4).toString()}
                  </ButtonGradient>
                </>
              )
            })}
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
              <img
                src={SecondVesting}
                alt=""
                style={{
                  width: '177px',
                  paddingBottom: '14px',
                  margin: 'auto',
                }}
              />
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
            <Volt>Volt: {secondClaimSum.decimalPlaces(4).toString()}</Volt>
            <img
              src={Underline}
              alt=""
              style={{ width: '100%', margin: 'auto' }}
            />
            {Object.keys(secondClaims).map((key) => {
              return (
                <>
                  <ButtonGradient
                    maxWidth={'100%'}
                    marginTop={'33px'}
                    onClick={() => setStage(4)}
                  >
                    Claim {secondClaims[key].decimalPlaces(4).toString()}
                  </ButtonGradient>
                </>
              )
            })}
          </Main>
        </Card>
      </Row>
      {/* <ButtonGradient
        // maxWidth={'100%'}
        maxWidth={'70px'}
        marginBottom={'50px'}
        onClick={() => navigate('/')}
      >
        Return
      </ButtonGradient> */}
    </Wrapper>
  )
}
