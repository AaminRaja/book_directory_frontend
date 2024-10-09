import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import bottomNavBarStyle from './BottomNavBar.module.css'

const BottomNavBar = () => {
    let[sortCondition, setSortCondition] = useState()

    let location = useLocation()

    // useEffect(() => {
    //     let path = location.pathname
    //     // console.log(path);
    // }) //! Will use later
  return (
    <div className={bottomNavBarStyle.bottomNavBarContainer}>
      <div className={bottomNavBarStyle.sortTitleDiv}>
        <h4 className={bottomNavBarStyle.sortTitle}>SORT BY</h4>
      </div>
      <div className={bottomNavBarStyle.linksDiv}>
        <div className={bottomNavBarStyle.singleLinkDiv}>
            <Link to='/authors' className={bottomNavBarStyle.link}>AUTHOR</Link>
        </div>
        <div className={bottomNavBarStyle.singleLinkDiv}>
            <Link to='/categories' className={bottomNavBarStyle.link}>CATEGORY</Link>
        </div>
        <div className={bottomNavBarStyle.singleLinkDiv}>
            <Link to='/languages' className={bottomNavBarStyle.link}>LANGUAGE</Link>
        </div>
        <div className={bottomNavBarStyle.singleLinkDiv}>
            <Link to='/publishers' className={bottomNavBarStyle.link}>PUBLISHER</Link>
        </div>
      </div>
    </div>
  )
}

export default BottomNavBar
