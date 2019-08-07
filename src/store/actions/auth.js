import * as actionTypes from './actionTypes';

export const loginStart = () => {
  return {
    type: actionTypes.LOGIN_START
  };
};


export const loginSuccess = (token, userId) => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    token: token,
    userId: userId
  };
};

export const loginFail = error => {
  return {
    type: actionTypes.LOGIN_FAIL,
    error: error
  };
};

export const login = (email, password) => {
  return dispatch => {
    dispatch(loginStart());

    let url = 'this should be a real url to a back end';
    const loginData = {
      email: email,
      password: password
    };

    let numberForLoginSuccess = Math.floor(Math.random() * 10 + 1); // 1-10 this is how I calculate server success/errors
    // how I fake logging in and authorizing a user
    setTimeout(() => {
      if (numberForLoginSuccess >= 5) {
        dispatch(loginSuccess('thetoken', 'theuserId'));
      }
      else {
        dispatch(loginFail('Whoops Server Error'));
      }
    }, 500);
  };
}