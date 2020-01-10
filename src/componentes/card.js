import React from 'react';
import Button from './button';
import { StyleSheet, css } from 'aphrodite';

function Card(props){
    return (
        <div className= {css(styles.card)}>
            <span>Cliente:{props.name}</span><br/>
            <span>Mesa:{props.table}</span><br/>
            <span>Pedido:<br/>{props.order}</span><br/>
            <Button handleClick={props.handleClick} title={props.title}
            className= {css(styles.btn)}></Button>
        </div>        
    )
   
}
const styles = StyleSheet.create({
    btn:{
        
    },
    card:{

    }
})

export default Card