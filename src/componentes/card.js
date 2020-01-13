import React from 'react';
import Button from './button';
import { StyleSheet, css } from 'aphrodite';

function Card(props){

    return (
        <div className= {css(styles.card)}>
            <span className= {css(styles.name)}>Cliente:{props.name}</span><br/>
            <span className= {css(styles.table)}>Mesa:{props.table}</span><br/>
            <span>Pedido:<br/>{props.order}</span><br/>
            {props.timestamp != null ? <span>Segundos: {props.timestamp.seconds}</span> : <br/> }
            {props.status!=='Pronto' ? <Button handleClick={props.handleClick} title={props.title}
            className= {css(styles.btn)}></Button> : <br/>}
        </div>        
    )
   
}



const styles = StyleSheet.create({
    name:{
        fontWeight: 'bold',
    },
    btn:{
        height: 80,
        width: 108,
        borderBottom: 'solid',
        background: '#E9967A',
        margin: 10,
        backgroundAttachment: 'fixed',
        borderRadius: 16,
        alignContent: 'center',
        color: 'black',
        fontWeight: 'bold',
        fontSize: 20,
    },
    card:{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        margin: 20,
        height: 400,
        width: 200,
        float: 'left',
        backgroundColor: '#FFDAB9',
        // border: 'solid',
        borderRadius: 15,
        fontSize: 18,
    }
})

export default Card