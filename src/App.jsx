import { useState } from 'react'
import Header from "./components/Header"
import Hero from "./components/Hero"
import Hero3js from './components/Hero3js'
import SmoothScroll from './components/SmoothScroll'
import Content from './components/Content'
import test from './components/testing'




import './App.css'

function App() {


  return (
    <>
      <SmoothScroll />
      <Header />
      <Hero />
      <Content />

    </>
  )
}

export default App
