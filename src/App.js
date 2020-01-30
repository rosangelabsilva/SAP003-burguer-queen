import React from 'react';
import Logo from './componentes/logo';
import Restaurant from "./pages/Restaurant";
import {
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom";
import Kitchen from './pages/Kitchen';
import { StyleSheet, css } from 'aphrodite';
import { black } from 'color-name';

function App() {

  return ( 
    <>
      <section>
        <Logo/>
      </section>
      <Router>
          <nav>
            <ul className= {css(styles.ul)}>
              <li>
                <Link className= {css(styles.link)} to="/">Salão</Link>
              </li>
              <li>
                <Link className= {css(styles.link)} to="/kitchen">Cozinha</Link> 
              </li>
            </ul>
          </nav>
          
          <Route exact path="/" component={Restaurant}/>
          <Route exact path="/kitchen" component={Kitchen}/>
        </Router>
  </>
  )
}

const styles = StyleSheet.create({
  ul: {
    position: 'absolute',
    left: '20%',
    fontSize: 35,
    textAlign: 'center',
    color: '#DCDCDC',
    display: 'flex',
    margin: 60,
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    height: '10%',
    width: '50%',
    top: 1
  },
  link: {
    textDecoration: 'none',
    border: 'solid',
    borderRadius: 10,
    fontSize: 40,
    borderColor: 'black',
    color: 'black',
    padding: 15 
  }
})

export default App