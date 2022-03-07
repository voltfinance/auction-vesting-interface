import React, { useMemo } from 'react'
import styled from 'styled-components'
import { Text } from 'rebass'
import ClaimVestingTableRow from './ClaimVestingRow'
import { TOKENSWAP_VESTING_ADDRESSES } from '../../../constants'
import { useAllClaims, useAllVestingIds } from '../../../hooks/useVesting'

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
`

const Card = styled.div`
  display: flex;
  margin: auto;
  margin: 0.5em;
  padding: 1rem;
  background: black;
  border-radius: 5px;
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

export default function ClaimVestingTable() {
  // const allClaims = useAllClaims() // TODO: calculate the total sum of all claims and show it
  const allVestingIdsRaw = useAllVestingIds()
  const vestings = useMemo(
    () => allVestingIdsRaw.map((res) => Object.values(res)[0]),
    [allVestingIdsRaw],
  )

  return (
    <Wrapper>
      <Card
        style={{
          background: '#242637',
          width: '470px',
          position: 'absolute',
          top: '100px',
        }}
      >
        <Main
          style={{
            width: '100%',
            margin: 'auto',
            display: 'flex',
            flexWrap: 'wrap',
          }}
        >
          <Text fontSize={'24px'} color={'white'} marginBottom={'15px'}>
            Round
          </Text>
          {vestings?.length ? (
            Object.keys(TOKENSWAP_VESTING_ADDRESSES).map((key, i) =>
              vestings[i]?.length ? (
                <ClaimVestingTableRow
                  key={key}
                  name={key}
                  vestingAddress={TOKENSWAP_VESTING_ADDRESSES[key]}
                />
              ) : (
                <></>
              ),
            )
          ) : (
            <>Loading</>
          )}
        </Main>
      </Card>
    </Wrapper>
  )
}
