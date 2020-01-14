import React from 'react';
import { StyleSheet, css } from 'aphrodite';

const Logo = () => {
    return (
    <img alt="logo" className= {css(styles.img)} src='burguer.png'/>
    )
}

const styles = StyleSheet.create({
    img: {
        position: 'absolute',
        display: 'flex',
        width: '15%',
        top: 1
    }
})


export default Logo;