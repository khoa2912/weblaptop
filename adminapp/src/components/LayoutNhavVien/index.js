import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Header } from '../Header'
import { NavLink } from 'react-router-dom'
import './style.css'
import { Footer } from '../Footer'
import { HeaderNV } from '../HeaderNhanVien'

/**
* @author
* @function LayoutNV
**/

export const LayoutNV = (props) => {
  return (
    <>
      <HeaderNV />
      {
        props.children
      }
   
    </>
  )

}

export default LayoutNV