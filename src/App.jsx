import { useState } from 'react'
import Header from "./components/Header"
import Hero from "./components/Hero"
import Hero3js from './components/Hero3js'
import SmoothScroll from './components/SmoothScroll'
import Content from './components/Content'
import Footer from './components/Footer'




import './App.css'

function App() {


  return (
    <>

      <SmoothScroll />
      <Header />
      <Hero />
      <Content />
      <div style={{ height: "100vh", backgroundColor: "white" }}>
        <div className="background-border white">
          <div className="box"></div>
          <div className="box"></div>
          <div className="box"></div>
          <div className="box"></div>
          <div className="box"></div>
          <div className="box"></div>
          <div className="box"></div>
          <div className="box"></div>
          <div className="box"></div>
        </div>
      </div>
      <Footer />


    </>
  )
}

export default App
