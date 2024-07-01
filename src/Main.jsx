import React from 'react'
import ReactDOM from 'react-dom/client'

import MainHeader from '@components/headers/<<componentMap.header>>/MainHeader'
import Menu from '@components/menus/<<componentMap.menu>>/Menu'

import './Main.scss'
import '@globalStyles/Scrollbars.scss'
import '@styles/Fonts.scss'
import '@styles/Svg-fonts.scss'
import '@app/styles/Variables.scss'
import '@styles/Custom.scss'

import UserProfilePhotoUpload from '@components/userProfilePhotoUpload/UserProfilePhotoUpload';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div style={{ height: '100%' }}>
      <MainHeader />
      <Menu />
      {/* <UserProfilePhotoUpload /> */}
    </div >
  </React.StrictMode>

)
