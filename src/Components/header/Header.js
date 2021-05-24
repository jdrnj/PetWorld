import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import './Header.css'
import {UserContext} from '../../context/UserContext'
import UProfileHeader from '../../UserProfile/UProfileHeader'
const Header = ({isLogged}) => {
  const [user, setUser] = useContext(UserContext)
  const Logout = () => {
    console.log("Logout")
    setUser({username:"", email:""})
  }
    return (
      user.username !== '' ?
        <UProfileHeader name={user.username} Logout={Logout}/>
      :
        <header className="nav-home"> 
              <h1 className="logo-name">Pet World</h1>
                <div className="nav-buttons">
                  <Link to="/login">
                  <button className="login-btn">Login</button>
                  </Link>
                  <Link to="/register">
                  <button className="register-btn">Register</button>
                  </Link>
                </div>
          </header>
    )
}

export default Header
