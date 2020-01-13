import React from 'react';
import Button from './button';
import { StyleSheet, css } from 'aphrodite';

function Card(props){

    return (
        <div className= {css(styles.card)}>
            <span className= {css(styles.name)}>Cliente:{props.name}</span><br/>
            <span className= {css(styles.table)}>Mesa:{props.table}</span><br/>
            <div className= {css(styles.order)}>Pedido:<br/>{props.order}</div><br/>
            {props.status==='Pronto' ? <span>Tempo de Preparo:{props.time}</span>:<br/>}
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
        backgroundAttachment: 'fixed',
        borderRadius: 16,
        color: 'black',
        fontWeight: 'bold',
        fontSize: 20,
    },
    card:{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        margin: 20,
        height: 400,
        width: 200,
        float: 'left',
        backgroundColor: '#FFDAB9',
        borderRadius: 15,
        fontSize: 18,
    },
    order:{
        height: 240,
        overflow: 'auto'
    }
})

export default Card