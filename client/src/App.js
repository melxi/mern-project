import React, { useEffect } from 'react'
import store from './store'
import { loadUser } from './actions/authActions'

import AppNavbar from './components/AppNavbar'
import ItemModal from './components/ItemModal'
import ShoppingList from './components/ShoppingList'

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

function App(props) {
  useEffect(() => {
    store.dispatch(loadUser())
  }, [])

  return (
    <div className="App">
      <AppNavbar />
      <ItemModal />
      <ShoppingList />
    </div>
  )
}

export default App
