import React from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { LOGOUT } from './../../../store/actions';

const Logout = () => {
  const dispatcher = useDispatch();
  dispatcher({ type: LOGOUT });
  return <Redirect to='/auth/signin'/>
};

export default Logout;
