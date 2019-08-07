import React from 'react'
import classes from './Input.module.css';

const input = props => {
  let inputElement = null;
  let inputClasses = [classes.input];
  
  if (props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push(classes['input--invalid']);
  }

  switch (props.elementType) {
    case ('input'):
      inputElement = (
        <input
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.onChange}
        />
      );
      break;
    default:
      inputElement = (
        <input
          className={inputClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.onChange}
        />
      );
  }

  return (
    <div className={classes['input-container']}>
      <label htmlFor={props.elementConfig.id} className={classes.label}>{props.labelText}</label>
      {inputElement}
    </div>
  );
}

export default input;