import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import Restaurant from "../pages/Restaurant";
import {
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom";
import Kitchen from '../pages/Kitchen';

function Naveg(){
    return (
        <Router>
          <nav>
            <ul className= {css(styles.ul)}>
              <li>
                <Link to="/saloon">Salão</Link>
              </li>
              <li>
                <Link to="/kitchen">Cozinha</Link> 
              </li>
            </ul>
          </nav>
          
          <Route exact path="/saloon" component={Restaurant}/>
          <Route exact path="/kitchen" component={Kitchen}/>
        </Router>
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
      top: 1,
    },
})

export default Naveg