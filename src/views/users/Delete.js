import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
//import axios from 'axios';
//import { API_SERVER_USERS } from './../../../config/constant';

const Delete = () => {
  const user = useSelector((store) => store.account.user);
  return <Redirect to='/auth/logout'/>
  /*
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
  };
    axios
      .post(
          API_SERVER_USERS + '/users/delete',
          {
            user: user
          },
          config
      )
      .then(function (response) {
          console.log(response);
          return <Redirect to='/auth/logout'/>
      })
      .catch(function (error) {
        console.log(error);
      });
  } catch (err) {
    console.error(err);
  }*/
};


export default Delete;
