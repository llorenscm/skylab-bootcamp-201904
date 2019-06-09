import React from 'react'
import './index.scss'

function Nav({ onHome, onMenu, onCart }) {
    document.addEventListener('DOMContentLoaded', () => {

        const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0)
      
        if ($navbarBurgers.length > 0) {
      
          $navbarBurgers.forEach( el => {
            el.addEventListener('click', () => {
      
              const target = el.dataset.target
              const $target = document.getElementById(target)
      
              el.classList.toggle('is-active')
              $target.classList.toggle('is-active')
      
            })
          })
        }
      
      })

    return <>
        <nav className="navbar is-transparent" onClick={e => e.preventDefault()}>
            <div id="navbarExampleTransparentExample" className="navbar-menu">
                <div className="navbar-start">
                    <a className="navbar-item" href="" onClick={() => onHome()}>Home</a>
                    <a className="navbar-item" href="" onClick={() => onMenu()}>Carta</a>
                </div>
            </div>

            <div className="navbar-brand">
                <a className="navbar-item" href=""><img onClick={() => onHome()} src='https://res.cloudinary.com/dme91l7mj/image/upload/v1559984035/kaori/logo_kaori.png' alt="Logo Kaori" /></a>
                <div className="navbar-burger burger" data-target="navbarExampleTransparentExample">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <span className="icon">
                    <i className="fas fa-shopping-cart" onClick={() => onCart()}></i>
                </span>
            </div>
        </nav>
    </>
}

export default Nav