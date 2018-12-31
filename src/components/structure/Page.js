import React from 'react'
import Banner from './Banner'
import PagePicker from './PagePicker'
import Footer from './Footer'
import SideNav from './SideNav';

//This page contains all the components in the page
const Page = () =>
  <div>
      <Banner />
      <SideNav />
      <PagePicker />
      <Footer />
  </div>

export default Page;
