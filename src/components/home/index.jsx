import React, { useRef, useEffect } from 'react'
import lottie from 'lottie-web'
import { useSelector } from 'react-redux'
// import { createWeb3ReactRoot } from '@web3-react/core'
import ClaimVoltModal from './components/ClaimVoltModal'
import UnvestModal from './components/UnvestModal'
import Header from './header'
import { Route, Routes as Switch, BrowserRouter as Router } from 'react-router-dom'

import starsAnimationData from '@/assets/lotties/stars.json'
import lightingAnimationData from '@/assets/lotties/lighting.json'
import smokeAnimationData from '@/assets/lotties/smoke.json'
// import { NetworkContextName } from '../../constants'

// const Web3ProviderNetwork = createWeb3ReactRoot(NetworkContextName)

const HomePage = () => {
  const starsRef = useRef(null)
  const lightingRef = useRef(null)
  const smokeRef = useRef(null)

  const { animate } = useSelector((state) => state.animation)

  useEffect(() => {
    if (smokeRef.current) {
      lottie.loadAnimation({
        animationData: smokeAnimationData,
        container: smokeRef.current,
        renderer: 'svg',
        autoplay: true,
        loop: true,
      })
    }
  }, [])

  useEffect(() => {
    if (lightingRef.current) {
      lottie.loadAnimation({
        animationData: lightingAnimationData,
        container: lightingRef.current,
        renderer: 'svg',
        autoplay: animate,
        loop: false,
      })
    }
  }, [animate])

  useEffect(() => {
    if (starsRef.current) {
      lottie.loadAnimation({
        animationData: starsAnimationData,
        container: starsRef.current,
        renderer: 'svg',
        loop: true,
      })
    }
  }, [])

  return (
    <>
          <Router>
            <Header />
            <Switch>
              <Route
                path="/unvest/:vestingAddress"
                element={<UnvestModal/>}
              />
              <Route exact path='/' element={<ClaimVoltModal/>} />
            </Switch>
            {/* <Footer /> */}
          </Router>
    </>
  )
}

export default HomePage
