import React, {useContext, useRef, useState, useEffect} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {UserContext} from '../../App'
import profile from "../images/profile-pic.png"
import create from "../images/create.png"
import logout from "../images/logout.png"
import followTab from "../images/followTab.png"
import logo from "../images/logo.png"
import icon from "../images/profile-pic.png"
import M from 'materialize-css'

function Nav() {
  const history = useHistory()
  const {state, dispatch} = useContext(UserContext)
  const searchModal = useRef(null)
  const [search, setSearch] = useState("")
  const [userDetails, setUserDetails] = useState([])
  
  useEffect(()=>{
    M.Modal.init(searchModal.current)
  }, [])
  
  const renderList = ()=>{
    if(state) {
      return [
        <li key="1"><i  data-target="modal1" className="large material-icons modal-trigger Nav-Tab" style={{color:"black"}} onClick={(e)=>{setUserDetails([])}}>search</i></li>,
        <li key="2"><Link to="/followingspost"><img src={followTab} alt="Following-Post" className="Nav-Tab" width="50px" height="50px"/></Link></li>,
        <li key="3"><Link to="/createpost"><img src={create} alt="Create-Post" className="Nav-Tab" width="50px" height="50px"/></Link></li>,
        <li key="4"><Link to="/profile"><img src={profile} alt="Profile" className="Nav-Tab" width="50px" height="50px"/></Link></li>,
        <li key="5">
          <img src={logout} alt="Logout" className="Nav-Tab" width="50px" height="48px" onClick={()=>{
            localStorage.clear()
            dispatch({type:"CLEAR"})
            history.push('/login')
          }}/>
        </li>,
      ]
    } else {
      return [
        <li key="1"><Link to="/login">Login</Link></li>,
        <li key="2"><Link to="/signup">Sign up</Link></li>
      ]
    }
  }

  const getUsers = (value) => {
    setSearch(value)
    fetch('/findUser',{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        value: value
      })
    })
    .then(res=>res.json())
    .then(result=>{
      setUserDetails(result)
    })
  }
  
  return (
    <nav>
      <div className="nav-wrapper grey darken-1">
        <Link to={state ? "/" : "/login"} className="brand-logo left"><img src={logo} alt="Home" className="Nav-Tab" width="50px" height="50px"/></Link>
        <ul id="nav-mobile" className="right">
          {renderList()}
        </ul>
      </div>
      <br />
      <div id="modal1" className="modal" ref={searchModal} style={{color:"black"}}>
        <div className="modal-content" style={{maxHeight:"500px", overflowY:"scroll"}}>
          <input
            placeholder="search users"
            value={search}
            onChange={(e) => {getUsers(e.target.value);}}
          />
          <ul className="search">
            {userDetails.map(user=>{
              return (
                <Link
                  key={user._id}
                  to={user._id !== state._id ? "/profile/"+user._id : '/profile'}
                  onClick={()=>{
                    M.Modal.getInstance(searchModal.current).close()
                    setSearch("")
                    setUserDetails([])
                  }}> 
                  <li className="search-item" onClick={(e)=>{history.push(user._id !== state._id ? "/profile/"+user._id : '/profile')}}>
                    <img src={user.picture ? user.picture : icon} onClick={(e) => {history.refresh()}}/>
                    {user.name}
                  </li>
                </Link>)
            })}
          </ul>
        </div>
          <div className="modal-footer">
            <button className="modal-close waves-effect waves-green btn-flat" onClick={(e) => {setSearch("")}}>close</button>
          </div>
        </div>
    </nav>
  )
}

export default Nav
