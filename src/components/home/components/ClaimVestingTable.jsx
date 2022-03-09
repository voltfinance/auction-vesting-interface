import React, { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { Text } from 'rebass'
import ClaimVestingTableRow from './ClaimVestingRow'
import { TOKEN_SWAP_CONTRACTS } from '../../../constants'
import { useAllVestingIds, useAllClaims, useAllVestedTokens } from '../../../hooks/useVesting'
import check from '@/assets/images/checkmark.png'
import info from '@/assets/images/info.png'
import { useWeb3Context } from '../../../context/web3'
import BigNumber from 'bignumber.js'


const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
`

const Card = styled.div`
  display: flex;
  margin: auto;
  margin: 0.5em;
  padding: 1rem;
  background: black;
  border-radius: 5px;
  color: white;
`

const Main = styled.div`
  position: relative;
  border-radius: 5px;
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
const Info = styled.p`
  font-family: Inter;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 22px;
  letter-spacing: 0px;
  text-align: left;
  color: white;
  margin-bottom: 30px;
`
const Header = styled.p`
font-family: Inter;
font-size: 14px;
font-style: normal;
font-weight: 600;
line-height: 17px;
letter-spacing: 0px;
text-align: left;
  text-align: left;
  color: white;
  margin-bottom: 5px;
`

const Input = styled.div`
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid #FFFFFF;
  box-sizing: border-box;
  border-radius: 8px;
  padding: 9px;
  color: white;
  font-family: Inter;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 15px;
  letter-spacing: 0px;
  text-align: left;
  margin-bottom: 15px;
  width: 100%;
`
const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 7%;
  width: 480px;
`
const Title = styled.p`
font-family: Inter;
font-size: 36px;
font-style: normal;
font-weight: 700;
line-height: 44px;
letter-spacing: 0px;
text-align: left;
width: 100%;
margin-bottom: 10px;
color: white;
`
export default function ClaimVestingTable() {
  const allClaims = useAllClaims()
  const unlockedTokens = useMemo(() => allClaims.reduce((mem, claim) => mem.plus(claim), BigNumber(0)), [allClaims])
  const allVestedTokens = useAllVestedTokens()
  const vestedTokens = useMemo(() => allVestedTokens.reduce((mem, cur) => mem.plus(cur), BigNumber(0)))
  const { account } = useWeb3Context()
  const allVestingIdsRaw = useAllVestingIds()
  const [prevAccount, setPrevAccount] = useState(account)
  const vestings = useMemo(
    () => allVestingIdsRaw.map((res) => Object.values(res)[0]),
    [allVestingIdsRaw],
  )

  useEffect(() => {
    if (account !== prevAccount) {
      setPrevAccount(account)
      window.location.reload()
    }
  }, [vestings, account, prevAccount])

  return (
    <Wrapper>
      <Content>
        <Title>Vesting Dasbooard</Title>
        <div style={{ width: '100%' }}>
          <Header>Address:</Header>
          <Input> {account}</Input>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            <div style={{ width: '49%' }}>
              <Header>Unlocked Tokens:</Header>
              <Input>{unlockedTokens.shiftedBy(-18).decimalPlaces(4).toString()}</Input>
            </div>

            <div style={{ width: '49%' }}>
              <Header>Vested Tokens:</Header>
              <Input>{vestedTokens.shiftedBy(-18).decimalPlaces(4).toString()}</Input>
            </div>
          </div>
        </div>
        <Card
          style={{
            background: '#242637',
          }}
        >

          <Main
            style={{
              width: '448px',
              margin: 'auto',
              display: 'flex',
              flexWrap: 'wrap',
            }}
          >
            {vestings ? (

              <>
                {vestings[0]?.length == 0 & vestings[1]?.length == 0 & vestings[2]?.length == 0 & vestings[3]?.length == 0 ? (
                  <>
                    <Text fontFamily={'Inter'} fontWeight={'600'} fontSize={'24px'} color={'white'} marginBottom={'20px'} textAlign={'center'} width={'100%'}>
                      You have no tokens to claim
                    </Text>
                    <a
                      rel='noreferrer noopener' target='_blank'
                      href='https://app.voltage.finance/'
                      style={{ margin: 'auto' }}
                    >
                      <button rel='noreferrer noopener' target='_blank' className='button-secondary' href='https://app.voltage.finance'>
                        Open App →
                      </button>
                    </a>
                  </>) : (
                  <>
                    <Text fontFamily={'Inter'} fontWeight={'600'} fontSize={'24px'} color={'white'} marginBottom={'5px'} marginRight={'170px'}>
                      Round
                    </Text>
                    <Text fontFamily={'Inter'} fontWeight={'600'} fontSize={'24px'} color={'white'} marginBottom={'5px'}>
                      Unlocked
                    </Text>
                    {Object.values(TOKEN_SWAP_CONTRACTS).map(({ address, name, isPrivate }, i) =>
                      vestings[i]?.length ? (
                        <ClaimVestingTableRow
                          key={address}
                          name={name}
                          isPrivate={isPrivate}
                          vestingAddress={address}
                        />
                      ) : null,
                    )
                    }
                  </>
                )}</>
            ) : (
              <Text color={'white'}>Loading...</Text>
            )}

          </Main>
        </Card>
        <div>
          <Info style={{ paddingTop: '20px' }}> <img src={info} style={{ paddingBottom: '4px' }}></img>    To claim your tokens you need to choose from which round that you purchased token do you want to claim.
          </Info>
          <Info> <img src={check} style={{ paddingBottom: '4px', paddingRight: '7px' }}></img>Please make sure you claim all your
            unlocked tokens.</Info>
          <Info> <img src={check} style={{ paddingBottom: '4px', paddingRight: '7px' }}></img>Please make sure you claim all your unlocked tokens. You should not have unlocked
            tokens after claiming</Info>
        </div>
      </Content>
    </Wrapper>
  )
}
