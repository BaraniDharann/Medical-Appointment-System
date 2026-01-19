import React from 'react'
import Header from '../componments/Header'
import SpecialityMenu from '../componments/SpecialityMenu'
import TopDoctors from '../componments/TopDoctors'
import Banner from '../componments/Banner'

const Home = () => {
  return (
    <div>
      <Header/>
      <SpecialityMenu/>
      <TopDoctors/>
      <Banner/>
    </div>
  )
}

export default Home;