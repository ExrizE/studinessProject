import React, { Fragment, useState, useEffect, useContext  } from 'react';
import man from '../../assets/images/dashboard/profile.jpg'
import { LogIn, Maximize, Search } from 'react-feather';
import { useNavigate } from 'react-router-dom'
import AuthContext from "../../context/AuthProvider";

const Rightbar = () => {

  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = async () => {
      setAuth(null);
      navigate('/login');
  }

  const [profile, setProfile] = useState('');
  const [name] = useState(auth.user)
  const [role, setRole] = useState('')
  const [searchresponsive, setSearchresponsive] = useState(false)
  const [moonlight, setMoonlight] = useState(false)

  useEffect(() => {
    setProfile(man);
    function getRole() {
      const ROLES = {
        'User': 2001,
        'Editor': 1984,
        'Admin': 5150
      }
      const rolesObj = Object.values(auth.roles);
      const maxRole = Math.max(...rolesObj);
      return Object.keys(ROLES).find(key => ROLES[key] === maxRole);
    }
    setRole(getRole)
    if (localStorage.getItem("layout_version") === "dark-only") {
      setMoonlight(true)
    }
  }, []);

  //full screen function
  function goFull() {
    if ((document.fullScreenElement && document.fullScreenElement !== null) ||
      (!document.mozFullScreen && !document.webkitIsFullScreen)) {
      if (document.documentElement.requestFullScreen) {
        document.documentElement.requestFullScreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullScreen) {
        document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
      }
    } else {
      if (document.cancelFullScreen) {
        document.cancelFullScreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
    }
  }

  const SeacrhResposive = (searchresponsive) => {
    if (searchresponsive) {
      setSearchresponsive(!searchresponsive)
      document.querySelector(".search-full").classList.add("open");
      document.querySelector(".more_lang").classList.remove("active");
    } else {
      setSearchresponsive(!searchresponsive)
      document.querySelector(".search-full").classList.remove("open");
    }
  }

  const MoonlightToggle = (light) => {
    if (light) {
      setMoonlight(!light)
      document.body.classList.add("light");
      document.body.classList.remove("dark-only");
      localStorage.setItem('layout_version', 'light');
    } else {
      setMoonlight(!light)
      document.body.classList.remove("light");
      document.body.classList.add("dark-only");
      localStorage.setItem('layout_version', 'dark-only');
    }
  }

  return (
    <Fragment>
      <div className="nav-right col-8 pull-right right-header p-0">
        <ul className="nav-menus">
          <li><span className="header-search"><Search onClick={() => SeacrhResposive(searchresponsive)} /></span></li>
          <li>
            <div className="mode" onClick={() => MoonlightToggle(moonlight)} >
              {moonlight ? <i className="fa fa-lightbulb-o"></i> : <i className="fa fa-moon-o"></i>}
            </div>
            {/* <div className="mode" onClick={() => MoonlightToggle(moonlight)}><i className={`fa ${moonlight ? 'fa-lightbulb-o' : 'fa-moon-o'}`}></i></div> */}
          </li>
          <li className="maximize"><a className="text-dark" href="#javascript" onClick={goFull}><Maximize /></a></li>
          <li className="profile-nav onhover-dropdown p-0">
            <div className="media profile-media">
              <img className="b-r-10" src={profile} alt="" />
              <div className="media-body"><span>{name}</span>
                <p className="mb-0 font-roboto">{role}<i className="middle fa fa-angle-down"></i></p>
              </div>
            </div>
            <ul className="profile-dropdown onhover-show-div">
              <li onClick={logout}><LogIn /><span>LogOut</span></li>
            </ul>
          </li>
        </ul>
      </div>
    </Fragment>

  );
}
export default Rightbar;