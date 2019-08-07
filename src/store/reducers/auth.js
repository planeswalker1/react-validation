import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initState = {
  token: null,
  userId: null,
  error: null,
  loading: false
};

const loginStart = (state, action) => updateObject(state, {
  error: null,
  loading: true
});

const loginSuccess = (state, action) => updateObject(state, {
  token: action.token,
  userId: action.userId,
  error: null,
  loading: false
});

const loginFail = (state, action) => updateObject(state, {
  error: action.error,
  loading: false
});

const reducer = (state=initState, action) => {
  switch(action.type) {
    case actionTypes.LOGIN_START: return loginStart(state, action);
    case actionTypes.LOGIN_SUCCESS: return loginSuccess(state, action);
    case actionTypes.LOGIN_FAIL: return loginFail(state, action);
    default: return state;
  }
}

export default reducer;