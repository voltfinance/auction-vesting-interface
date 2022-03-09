import React, { useMemo } from 'react'
import { ButtonGradient } from './Button'
import styled from 'styled-components'
import VoltIcon from '@/assets/images/volt.svg'
import Underline from '@/assets/images/underline.svg'
import Row from './Row'
import BigNumber from 'bignumber.js'
import { useParams } from 'react-router-dom'
import { useClaims } from '../../../hooks/useVesting'
import FirstVesting from '@/assets/images/FirstVesting.svg'
import SecondVesting from '@/assets/images/SecondVesting.svg'
import UnlockedTokens from '@/assets/images/UnlockedTokens.svg'
import {
  FINAL_ECOSYSTEM_ROUND,
  TOKENSWAP_VESTING_ADDRESSES,
} from '../../../constants'
import { useVestingContract } from '../../../hooks/useContract'
import { useWeb3Context } from '../../../context/web3'
import ConnectOrSwitch from './ConnectOrSwitch'
import info from '@/assets/images/info.png'

const Wrapper = styled.div`
  width: 100%;
  margin-top: 13%;
  position: absolute;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
`

const Main = styled.div`
  position: relative;
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
const Info = styled.div`
  width: 440px;
  font-family: Inter;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 22px;
  letter-spacing: 0px;
  text-align: left;
  color: white;
  margin-right: 20px;
  > img {
    padding-bottom: 4px;
    padding-right: 7px;
  }
`
const Link = styled.a`
  width: 100%;
  display: flex;
  justify-content: space-around;
  font-family: 'Inter';
  font-size: 18px;
  color: white;
  margin-bottom: 5px;
  :hover {
    text-decoration: underline;
  }
`

export default function UnvestModal() {
  const { account, chainId } = useWeb3Context()
  const { vestingAddress } = useParams()
  const isVestingAddress = useMemo(() => {
    return Object.values(TOKENSWAP_VESTING_ADDRESSES).includes(vestingAddress)
  }, [vestingAddress])

  const vestingContract = useVestingContract(vestingAddress)

  const claims = useClaims(vestingAddress)

  const allClaims = useMemo(() => {
    if (!claims) return {}
    return Object.keys(claims).reduce((mem, key) => {
      return Object.defineProperty(mem, key, {
        value: BigNumber(claims[key][1]).shiftedBy(-18),
        enumerable: true,
      })
    }, {})
  }, [claims])

  const allClaimsSum = useMemo(
    () =>
      Object.values(allClaims).reduce(
        (sum, claim) => sum.plus(claim),
        BigNumber(0),
      ),
    [allClaims],
  )

  const firstClaims = useMemo(() => {
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
        ? Object.defineProperty(mem, key, {
            value: BigNumber(claims[key][1]).shiftedBy(-18),
            enumerable: true,
          })
        : mem
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
  console.log(vestingAddress)
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
                  width: '218px',
                  alignItems: 'center',
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
  if (!account || chainId !== 122) return <ConnectOrSwitch />

  if (vestingAddress !== FINAL_ECOSYSTEM_ROUND) {
    return (
      <Wrapper>
        <Link href="/">↤ Back</Link>
        <Info>
          <img src={info}></img>If you see two or more claimming buttons on the
          same vesting option is because you bought more than once. Please claim
          one at a time.
        </Info>
        <div style={{ display: 'flex' }}>
          <Card
            style={{
              width: '256px!important',
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
                width: '218px',
                alignItems: 'center',
              }}
            >
              <div style={{ display: 'flex', width: '100%', margin: 'auto' }}>
                <img
                  src={FirstVesting}
                  alt=""
                  style={{
                    width: '177px',
                    padding: '14px',
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
              <br /> unlocked at TGE
              <img
                src={Underline}
                alt=""
                style={{ width: '100%', paddingTop: '16px', margin: 'auto' }}
              />
              <Volt>Volt: {firstClaimSum.decimalPlaces(4).toString()}</Volt>
              <img
                src={Underline}
                alt=""
                style={{ width: '100%', paddingBottom: '14px', margin: 'auto' }}
              />
              {Object.keys(firstClaims).map((key) => {
                return (
                  <>
                    <ButtonGradient
                      maxWidth={'100%'}
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
          <Card style={{ width: '256px!important', color: 'white' }}>
            <Main
              style={{
                width: '100%',
                margin: 'auto',
                display: 'flex',
                flexWrap: 'wrap',
                flexDirection: 'column',
                width: '218px',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  width: '100%',
                  paddingTop: '16px',
                  margin: 'auto',
                }}
              >
                <img
                  src={SecondVesting}
                  alt=""
                  style={{
                    paddingBottom: '14px',
                    margin: 'auto',
                  }}
                />
              </div>
              <img
                src={VoltIcon}
                alt=""
                style={{ width: '65px', paddingBottom: '14px', margin: 'auto' }}
              />
              <p style={{ marginBottom: '21px' }}>Daily Volt Vesting</p>
              <img
                src={Underline}
                alt=""
                style={{ width: '100%', paddingTop: '12px', margin: 'auto' }}
              />
              <Volt>Volt: {secondClaimSum.decimalPlaces(4).toString()}</Volt>
              <img
                src={Underline}
                alt=""
                style={{ width: '100%', paddingBottom: '14px', margin: 'auto' }}
              />
              {Object.keys(secondClaims).map((key) => {
                return (
                  <>
                    <ButtonGradient
                      maxWidth={'100%'}
                      onClick={() => {
                        vestingContract.methods
                          .claimVestedTokens(key)
                          .send({ from: account })
                      }}
                    >
                      Claim {secondClaims[key].decimalPlaces(4).toString()}
                    </ButtonGradient>
                  </>
                )
              })}
            </Main>
          </Card>
        </div>
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
  } else {
    return (
      <Wrapper>
        <Link href="/" style={{ paddingLeft: '280px' }}>
          ↤ Back
        </Link>
        <Info>
          <img src={info}></img>If you see two or more claimming buttons on the
          same vesting option is because you bought more than once. Please claim
          one at a time.
        </Info>
        <div style={{ display: 'flex' }}>
          <Card style={{ width: '256px!important', color: 'white' }}>
            <Main
              style={{
                width: '100%',
                margin: 'auto',
                display: 'flex',
                flexWrap: 'wrap',
                flexDirection: 'column',
                width: '218px',
                alignItems: 'center',
              }}
            >
              <div style={{ display: 'flex', width: '100%', margin: 'auto' }}>
                <img
                  src={UnlockedTokens}
                  alt=""
                  style={{
                    padding: '14px',
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
              <br /> unlocked at TGE
              <img
                src={Underline}
                alt=""
                style={{ width: '100%', paddingTop: '16px', margin: 'auto' }}
              />
              <Volt>Volt: {allClaimsSum.decimalPlaces(4).toString()}</Volt>
              <img
                src={Underline}
                alt=""
                style={{ width: '100%', paddingBottom: '14px', margin: 'auto' }}
              />
              {Object.keys(allClaims).map((key) => {
                return (
                  <>
                    <ButtonGradient
                      maxWidth={'100%'}
                      onClick={() => {
                        vestingContract.methods
                          .claimVestedTokens(key)
                          .send({ from: account })
                      }}
                    >
                      Claim {allClaimsSum.decimalPlaces(4).toString()}
                    </ButtonGradient>
                  </>
                )
              })}
            </Main>
          </Card>
        </div>
      </Wrapper>
    )
  }
}
