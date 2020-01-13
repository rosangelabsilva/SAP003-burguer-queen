import React from 'react';
import Logo from './componentes/logo';
//import { StyleSheet, css } from 'aphrodite'
import Naveg from './componentes/Naveg';

function App() {

  return ( 
    <>
    <div>
      <section>
        <Logo/>
      </section>
      <Naveg/>
    </div>
  </>
  )
}

// const styles = StyleSheet.create({
//   app: {
//       // position: 'absolute',
//       color: '#F89651',
//   }
// })
export default App