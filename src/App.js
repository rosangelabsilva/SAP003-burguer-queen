import React from 'react';
import './App.css';

import Restaurant from "./pages/Restaurant";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

// import { StyleSheet, css } from 'aphrodite'

function App() {

  return (
    <>
  <Router>
  <nav>
    <ul>
      <li>
        <Link to="/salao">Salão</Link>
      </li>
    </ul>
  </nav>
    <Switch>
      <Route exact path="/salao" component={Restaurant}/>
    </Switch>
  </Router>
  </>
  )
}

// const styles = StyleSheet.create({
//   client: {
//       backgroundColor: 'red'
//   }
// })


export default App