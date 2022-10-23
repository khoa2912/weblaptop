import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Header } from '../Header'
import { NavLink } from 'react-router-dom'
import './style.css'
import { Footer } from '../Footer'

/**
* @author
* @function Layout
**/

export const Layout = (props) => {
  return (
    <>
      <Header />
      {
       
      props.children
      }
   
    </>
  )

}

export default Layout