import { useState } from 'react'
import Header from "./components/Header"
import Hero from "./components/Hero"
import Hero3js from './components/Hero3js'
import SmoothScroll from './components/SmoothScroll'
import About from './components/About'
import Footer from './components/Footer'
import Projects from './components/Projects'




import './App.css'

function App() {


  return (
    <>

      <SmoothScroll />
      <Header />
      <Hero />
      <About />
      <Projects/>
      <Footer />


    </>
  )
}

export default App
