import React from 'react'
import AppNavbar from './components/AppNavbar'
import ItemModal from './components/ItemModal'
import ShoppingList from './components/ShoppingList'

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

function App() {
  return (
    <div className="App">
      <AppNavbar />
      <ItemModal />
      <ShoppingList />
    </div>
  );
}

export default App
