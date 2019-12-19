import React from 'react';
import './App.css';

import Restaurant from "./pages/Restaurant";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Kitchen from './pages/Kitchen';

import { StyleSheet, css } from 'aphrodite'

function App() {

  return (
    <>
    <h1 className= {css(styles.h1)}>Burguer Queen</h1>
  <Router>
  <nav>
    <ul className= {css(styles.ul)}>
      <li>
        <Link to="/salao">Salão</Link>
      </li>
      <li>
        <Link to="/cozinha">Cozinha</Link> 
      </li>
    </ul>
  </nav>
    <Switch>
      <Route exact path="/salao" component={Restaurant}/>
    </Switch>
    <Switch>
      <Route exact path="/cozinha" component={Kitchen}/>
    </Switch>
  </Router>
  </>
  )
}

const styles = StyleSheet.create({
  h1: {
    textAlign: 'center',
    fontSize: 40,
    fontFamily: 'Girassol',
    color: '#EE5C42'
  },
  ul: {
    top: 15,
    position: 'absolute',
  }
})


export default App