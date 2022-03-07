import React from 'react'
import styled from 'styled-components'
import volt from '@/assets/images/voltLarge.svg'
import useAddToken from '@/hooks/useAddToken'

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
  width: 455px;
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
  justify-content: space-around;
  align-items: center;
  margin: auto;
  border-radius: 10px;
  height: 272px;
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
font-weight: 800;
font-size: 20px;
line-height: 24px;
text-align: center;
`

export default function ClaimVestingTable() {
  const addToken = useAddToken()

  return (
    <Wrapper>
      <Card >
        <Main>
             <div>
             <Text>Thank you for joining Voltage Finance</Text>
             <Text>Add VOLT token to your wallet</Text>
             </div>
             <img src={volt} width={'100px'} />       

          <button
          className='button--secondary'
          onClick={addToken}
          style={{height: '50px'}}
        >
          Add the VOLT token to wallet
        </button>
        </Main>
      </Card>
    </Wrapper>
  )
}
