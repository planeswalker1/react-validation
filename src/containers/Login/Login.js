import React, { Component } from 'react'
import {connect} from 'react-redux';

import classes from './Login.module.css';
import Input from '../../components/UI/Input/Input';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';
import {updateObject, checkValidity} from '../../shared/utility';

class Login extends Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          id: 'email',
          type: 'email',
          placeholder: 'Your Email'
        },
        value: '',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false,
        label: 'Email'
      },
      password: {
        elementType: 'input',
        elementConfig: {
          id: 'password',
          type: 'password',
          placeholder: 'Your Password'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        label: 'Password'
      }
    }
  }

  inputChangedHandler = (event, controlName) => {
    this.props.setErrorMessage('');
    const updatedControls = updateObject(this.state.controls, {
      [controlName]: updateObject(this.state.controls[controlName], {
        value: event.target.value,
        valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
        touched: true
      })
    });

    this.setState({controls: updatedControls});
  }
  
  submitHandler = event => {
    event.preventDefault();
    if (!this.state.controls.email.valid && !this.state.controls.password.valid) {
      this.props.setErrorMessage('Invalid email and password');
      return;
    }
    if (!this.state.controls.email.valid) {
      this.props.setErrorMessage('Invalid email');
      return;
    }
    if (!this.state.controls.password.valid) {
      this.props.setErrorMessage('Invalid password');
      return;
    }

    this.props.onLogin(this.state.controls.email.value, this.state.controls.password.value);
  }

  render() {
    let formElementsInfo = [];
    let errorMessage = null;

    for (let key in this.state.controls) {
      formElementsInfo.push({
        id: key,
        config: this.state.controls[key]
      });
    }

    let formElements = formElementsInfo.map(formElement => (
      <Input 
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        onChange={event => this.inputChangedHandler(event, formElement.id)}
        invalid={!formElement.config.valid}
        touched={formElement.config.touched}
        shouldValidate={!!formElement.config.validation}
        invalidText={'invalid' + formElement.id}
        labelText={formElement.config.label}
      />
    ));
    if (this.props.loading) {
      formElements = (
        <Spinner />
      );
    }
    if (this.props.error) {
      errorMessage = (
        <p className={classes['form__error']}>{this.props.error}</p>
      );
    }

    return (
      <div className={classes.form}>
        <form onSubmit={this.submitHandler}>
          <h1 className={classes['form__heading']}>Login</h1>
          {errorMessage}
          {formElements}
          <button className={classes['button--login']} type="submit">SUBMIT</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    loading: state.loading,
    error: state.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogin: (email, password) => dispatch(actions.login(email, password)),
    setErrorMessage: error => dispatch(actions.loginFail(error))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);