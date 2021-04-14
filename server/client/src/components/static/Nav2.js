import React, {useContext, useRef, useState, useEffect} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {UserContext} from '../../App'
import create from "../images/create.png"
import followTab from "../images/followTab.png"
import chat from "../images/chat.png"
import homeIcon from "../images/home-icon.png"

function Nav2() {
  const history = useHistory()
  const {state, dispatch} = useContext(UserContext)

  const renderList = ()=>{
    if(state) {
      return [
          <li key="1"><Link to="/"><img src={homeIcon} alt="Home" className="Nav-Tab" width="50px" height="50px"/></Link></li>,
          <li key="2"><Link to="/allposts"><img src={followTab} alt="Home" className="Nav-Tab" width="70px" height="70px"/></Link></li>,
          <li key="3"><Link to="/createpost"><img src={create} alt="Create-Post" className="Nav-Tab" width="50px" height="50px"/></Link></li>,
          // <li key="4"><Link to="/chat"><img src={chat} alt="Chat" className="Nav-Tab" width="50px" height="50px"/></Link></li>,
        ]
    } else {
      return [
        <div key="1"></div>
      ]
    }
  }

  return (
    <nav className="nav-down">
      <div className="nav-wrapper grey darken-1">
        <ul id="nav-mobile" className="right">
          {renderList()}
        </ul>
      </div>
      <br />
    </nav>
  )
}

export default Nav2
