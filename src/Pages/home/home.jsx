import React from 'react' 
import TodaysDeal from './todaysDeal'
import Banner from './banner'
import Apartment from './apartmenthouse'
import TodayOffer from './todayoffer'
import TicketCarousel from './TicketCarousel'
import Villa from './villa'
import Coupons from './coupon'
import Slider from './slider'
import Banner1 from './banner1'
import Recentlyadded from './recentproperty'
import CateGory from './category'

function Home() {
  return (
     <> 
    <Banner/>
    <div className='section' >
    <TicketCarousel/>
    </div>
    <TodaysDeal/>
    <Slider/>
    <Villa/>
    <TicketCarousel/>
    <Coupons/>
    <CateGory/>
    <Slider/>
    <TodayOffer/>
    <TicketCarousel/>
    <Apartment/>
    <Banner1/>
    <Recentlyadded/>     
    </>
  )
}

export default Home