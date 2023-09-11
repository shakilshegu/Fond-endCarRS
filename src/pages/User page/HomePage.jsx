import React from 'react'
import Header from '../../components/User/Header/header'
import Home from '../../components/User/Home/Home'
import Footer from '../../components/User/Footer/Footer'
import Hero from '../../components/User/Hero/Hero'
import Cards  from '../../components/User/Cards/Cards'



function HomePage() {

  
  return (
    <div>
      <Header/>
      <Hero/>
      <Home/>
      <Cards/>
      <Footer/>
    </div>
  )
}

export default HomePage
