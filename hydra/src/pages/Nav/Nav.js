import React from 'react'
import "./Nav.scss";

const Nav = () => {
  return (
    <div style={
        {
            height:"60px", 
            backgroundColor:"rgba(33, 40, 59, 1)", 
            borderRadius:"9px", 
            width:"100%", 
            color:"white",
            display:"flex",
            marginLeft:"-11px",
            justifyContent:"center",
            alignItems:"center",
            textDecoration:"upperCase"
        }} >
        Ricardo Dias
    </div>
  )
}

export default Nav;