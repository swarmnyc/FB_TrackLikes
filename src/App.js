import React, { Component } from 'react';
import './App.css';
import State from './State/stateManager';
import { loginComponent } from './FacebookLogin/FacebookLogin';
import FireIndicator from './FireIndicator/FireIndicator';
import ValueChanger from './ValueChanger/valueChanger';

class App extends Component {
	stateObj = new State()

	componentWillMount() {
		this.bindToState()
	}

	accessTokenSet(token) {
		this.stateObj.setToken(token)
	}

	bindToState() {
		this.stateObj.isLoggedIn
			.subscribe({
				next: (isLoggedIn) => { this.setState({ isLoggedIn: isLoggedIn }) }
			})
	}

  render() {
	  var self = this
	  if (this.state.isLoggedIn === false) {
		  return (
			loginComponent({accessTokenCallback: this.accessTokenSet.bind(self)})
		  )
	  }
    return (
      <div className="App">
		<FireIndicator
		 stateObj={this.stateObj}
		 ></FireIndicator>
		 <ValueChanger
		 stateObj={this.stateObj}>
		 </ValueChanger>
      </div>
    );
  }
}

export default App;
