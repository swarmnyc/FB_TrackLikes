import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import State from '../State/state-manager';

export function loginComponent(props) {
	const responseParser = (response) => {
		console.log(response)
		if (response.accessToken && !response.error) {
			props.accessTokenCallback(response.accessToken)
		} else {
			alert("There was an error logging in, if you have an ad block, try turning it off and trying again.")
		}
	}
	return (
      <div className="Login">
        <FacebookLogin
    appId="631664410500749"
    autoLoad={true}
    fields="name,email,picture"
    callback={responseParser} />
      </div>
    );
}