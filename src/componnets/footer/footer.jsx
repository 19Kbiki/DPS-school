import React from 'react'
import "./footer.scss"
export default function Footer() {
  return (
    <div>
    <footer>
        <div className="container">

            <img src="/assets/logo.png" alt="" />
            <h2 style={{textTransform:"uppercase"}}>Memory Lane 2k25</h2>
            <p>Where the great memories of school come to life</p>
        </div>
        <div className="footer_btm">
            Designd by <a href="https://one08.tech/">one08.tech</a>
        </div>
    </footer>
    </div>
  )
}
