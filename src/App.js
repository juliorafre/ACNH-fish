import React from 'react'
//Components
import Header from './components/Header/Header'
import Actions from './components/Actions'
import Fishes from './components/Fishes'
//import Footer from './components/Footer/Footer'
//Global State
import { Provider } from 'jotai';

function App() {
  return (
    <Provider>
      <Header/>
      <Actions/>
      <Fishes />
      {/*<Footer />*/}
    </Provider>
  )
}

export default App
