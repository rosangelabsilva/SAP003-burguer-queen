import React from 'react';
import Button from './button';
import { StyleSheet, css } from 'aphrodite';

function Menu (props){
    return (
        <Button className = {css(styles.btn)}
        id={props.id}
        Name={props.item.Name}
        Price={props.item.Price.toLocaleString("pt-BR", {style: "currency", currency: "BRL"})}
        handleClick={() => props.addOrder(props.item)}
        />
    )
}

const styles = StyleSheet.create({
    btn: {
      height: 80,
      width: 100,
      borderBottom: 'double',
      background: '#FFD700',
      margin: 10,
    },
})
export default Menu