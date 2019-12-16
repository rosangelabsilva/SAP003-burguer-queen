import React from 'react';
function Button(props) {
    return(
      <button
      id={props.id}
      class={props.class}
      onclick={props.onClick}
      >
      {props.title}
      </button>
    )
}
export default Button;