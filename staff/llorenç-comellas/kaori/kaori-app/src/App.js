import React, { Component } from 'react';
import logic from './logic'
import Login from './components/Login'
import Register from './components/Register'
import Nav from './components/Nav'
import MainCategory from './components/MainCategory'
import MainImage from './components/MainImage'
import Menu from './components/Menu'
import Cart from './components/Cart'
import Footer from './components/Footer'
import { Route, withRouter, Redirect } from 'react-router-dom'
import './App.css';

class App extends Component {

  state = { error: null }

  handleHome = () => this.props.history.push('/')

  handleMenu = () => this.props.history.push('/menu')

  handleCart = () => this.props.history.push('/cart')

  handleStarters = () => this.props.history.push('/menu/ENTRANTES')

  handlePacks = () => this.props.history.push('/menu/PACKS')

  handleMakis = () => this.props.history.push('/menu/MAKIS')

  handleRolls = () => this.props.history.push('/menu/FISH_ROLLS')

  handleRegisterNavigation = () => this.props.history.push('/register')

  handleLoginNavigation = () => this.props.history.push('/login')

  handleRegister = (name, surname, phone, email, password) => {
    try {
      logic.registerUser(name, surname, phone, email, password)
        .then(() => this.props.history.push('/login')
        )
        .catch(error =>
          this.setState({ error: error.message })
        )
    } catch ({ message }) {
      this.setState({ error: message })
    }
  }

  handleLogin = (email, password) => {
    try {
      logic.loginUser(email, password)
      this.props.history.push('/menu')

    } catch ({ message }) {
      this.setState({ error: message })
    }
  }

  render() {
    const {
      state: { error },
      handleHome,
      handleMenu,
      handleCart,
      handleStarters,
      handlePacks,
      handleRolls,
      handleMakis,
      handleRegister,
      handleLogin,
      handleRegisterNavigation,
      handleLoginNavigation
    } = this

    return <>
      <Route path="/" render={() => <Nav onHome={handleHome} onMenu={handleMenu} onCart={handleCart} />} />
      <Route exact path="/" render={() => <MainImage />} />
      <Route exact path="/" render={() => <MainCategory onStarter={handleStarters} onPacks={handlePacks} onRolls={handleRolls} onMakis={handleMakis} />} />
      <Route exact path="/login" render={() => <Login onLogin={handleLogin} error={error} onRegister={handleRegisterNavigation} />} />
      <Route exact path="/register" render={() => <Register onRegister={handleRegister} onLogin={handleLoginNavigation} error={error} />} />
      <Route path="/menu" render={() => <Menu />} />
      <Route path="/cart" render={() => <Cart />} />
      <Route path="/" render={() => <Footer />} />
      {/* <Route path='*' exact={true} render={() => <Nav/>} /> */}
      {/* <Redirect from='*' to='/' /> */}
    </>
  }
}
export default withRouter(App)
