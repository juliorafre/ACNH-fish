'use client'

import React from 'react'
import dynamic from 'next/dynamic'
//Global State
import { Provider } from 'jotai'

// Dynamically import components to avoid SSR issues
const Header = dynamic(() => import('../src/components/Header/Header'), { ssr: false })
const Actions = dynamic(() => import('../src/components/Actions'), { ssr: false })
const Fishes = dynamic(() => import('../src/components/Fishes'), { ssr: false })
// TODO: WaveBackground - Paper.js implementation needs further work
// const WaveBackground = dynamic(() => import('../src/components/WaveBackground/WaveBackground'), { ssr: false })

export default function Home() {
  return (
    <Provider>
      {/* <WaveBackground /> */}
      <Header/>
      <Actions/>
      <Fishes />
    </Provider>
  )
}
