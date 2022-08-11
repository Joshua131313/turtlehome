import React from 'react'
import { Link } from 'react-router-dom'
import './Logo.css'

export const Logo = (props) => {
  const {img='https://i.imgur.com/YbHOF4M.png', disabled} = props
  const Tag = disabled ? 'div' : Link
  return (
    <Tag to='/' className="logo flexrow">
        <span>Logo</span>
    </Tag>
  )
}