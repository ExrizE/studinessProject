import React, { Fragment, useState, useEffect } from 'react';
import { MENUITEMS } from './menu';
import { ArrowRight, ArrowLeft, Grid } from 'react-feather';
import { Link } from 'react-router-dom'
import configDB from '../../data/customizer/config';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  const [mainmenu, setMainMenu] = useState(MENUITEMS);
  const [margin, setMargin] = useState(0);
  const [width, setWidth] = useState(0);
  const { t } = useTranslation();
  const [sidebartoogle, setSidebartoogle] = useState(true)
  const handleScroll = () => {
    if (window.scrollY > 400) {
      if (configDB.data.settings.sidebar.type.split(' ').pop() === 'material-type' || configDB.data.settings.sidebar.type.split(' ').pop() === 'advance-layout')
        document.querySelector(".sidebar-main").className = "sidebar-main hovered"
    } else {
      if (document.getElementById("sidebar-main"))
        document.querySelector(".sidebar-main").className = "sidebar-main"
    }
  }
  useEffect(() => {
    document.querySelector(".left-arrow").classList.add("d-none")

    window.addEventListener('resize', handleResize)
    handleResize();
    const currentUrl = window.location.pathname;
    MENUITEMS.map(items => {
      if (items.path === currentUrl)
        setNavActive(items)
      return items
    })
    window.addEventListener('scroll', handleScroll)
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }

  }, [mainmenu]);

  const handleResize = () => {
    setWidth(window.innerWidth - 500);
  }

  const setNavActive = (item) => {
    MENUITEMS.map(menuItems => {
      if (menuItems !== item) {
        menuItems.active = false
        document.querySelector(".bg-overlay1").classList.remove("active")
      }
      return menuItems
    })
    item.active = !item.active
    setMainMenu({ mainmenu: MENUITEMS })
  }

  const toggletNavActive = (item) => {
    navigate(item.path)
    if (window.innerWidth <= 991) {
      document.querySelector(".page-header").className = "page-header close_icon";
      document.querySelector(".sidebar-wrapper").className = "sidebar-wrapper close_icon "
      document.querySelector(".mega-menu-container").classList.remove("d-block")
    }

    item.active = !item.active
    setMainMenu({ mainmenu: MENUITEMS })
  }

  const scrollToRight = () => {
    if (margin <= -2598 || margin <= -2034) {
      if (width === 492) {
        setMargin(-3570)
      } else {
        setMargin(-3464)
      }
      document.querySelector(".right-arrow").classList.add("d-none")
      document.querySelector(".left-arrow").classList.remove("d-none")
    } else {
      setMargin(margin => margin += (-width));
      document.querySelector(".left-arrow").classList.remove("d-none")
    }
  }

  const scrollToLeft = () => {
    if (margin >= -width) {
      setMargin(0)
      document.querySelector(".left-arrow").classList.add("d-none")
      document.querySelector(".right-arrow").classList.remove("d-none")
    } else {
      setMargin(margin => margin += width);
      document.querySelector(".right-arrow").classList.remove("d-none")
    }
  }

  const closeOverlay = () => {
    document.querySelector(".bg-overlay1").classList.remove("active")
    document.querySelector(".sidebar-link").classList.remove("active")
  }

  const openCloseSidebar = (toggle) => {
    if (toggle) {
      setSidebartoogle(!toggle);
      document.querySelector(".page-header").className = "page-header close_icon";
      document.querySelector(".sidebar-wrapper").className = "sidebar-wrapper close_icon "
    } else {
      setSidebartoogle(!toggle);
      document.querySelector(".page-header").className = "page-header";
      document.querySelector(".sidebar-wrapper").className = "sidebar-wrapper "
    }
  };

  const responsiveSidebar = () => {
    document.querySelector(".page-header").className = "page-header close_icon";
    document.querySelector(".sidebar-wrapper").className = "sidebar-wrapper close_icon"
  }

  return (
    <Fragment>
      <div className={`bg-overlay1`} onClick={() => { closeOverlay() }} ></div>
      <div className="sidebar-wrapper" id="sidebar-wrapper" >
        <div className="logo-wrapper">
          <Link to={`dashboard/`}>
            <img className="img-fluid" src={require("../../assets/images/logo/logo.png")} alt="" />
          </Link>
          <div className="back-btn" onClick={() => responsiveSidebar()}><i className="fa fa-angle-left"></i></div>
          <div className="toggle-sidebar" onClick={() => openCloseSidebar(sidebartoogle)}><Grid className="status_toggle middle sidebar-toggle" /></div>
        </div>
        <div className="logo-icon-wrapper">
          <Link to={`dashboard/`}><img className="img-fluid" src={require("../../assets/images/logo/logo-icon.png")} alt="" /></Link>
        </div>
        <nav className="sidebar-main" id="sidebar-main">
          <div className="left-arrow" onClick={scrollToLeft}><ArrowLeft /></div>
          <div id="sidebar-menu" style={{ margin: '0px' }}>
            <ul className="sidebar-links custom-scrollbar" >
              <li className="back-btn">
                <div className="mobile-back text-end"><span>{"Back"}</span><i className="fa fa-angle-right ps-2" aria-hidden="true"></i></div>
              </li>
              {
                MENUITEMS.map((Item, i) =>
                  <Fragment key={i}>
                    <li className="sidebar-list">
                      <a className={`sidebar-link sidebar-title link-nav`} onClick={() => toggletNavActive(Item)}>
                        <Item.icon />
                        <span className="lan-1">{t(Item.title)}</span>
                      </a>
                    </li>                    
                  </Fragment>
                )}
            </ul>
          </div>
          <div className="right-arrow" onClick={scrollToRight}><ArrowRight /></div>
        </nav>
      </div>
    </Fragment>
  );
}

export default Sidebar;