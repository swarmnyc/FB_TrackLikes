import React from 'react';
import FacebookLogin from 'react-facebook-login';

export function loginComponent(props) {
	const responseParser = (response) => {
		if (response.accessToken && !response.error) {
			props.accessTokenCallback(response.accessToken)
		} else {
			alert("There was an error logging in, if you have an ad blocker, try turning it off and trying again.")
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