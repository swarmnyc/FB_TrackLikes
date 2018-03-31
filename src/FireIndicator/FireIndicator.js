import React, { Component } from 'react';
import { shouldFire } from '../CommentPuller/getComments';
import './FireIndicator.css';

export default class FireIndicator extends Component {
	constructor(props) {
		super(props)
		this.state = {
			fireText: ""
		}
	}
	componentWillMount() {
		this.props.stateObj.commentsConfig
		.flatMap((config) => { return shouldFire(config) })
		.subscribe({
			next: (fire) => {
				this.setState({
					fireText: fire ? "fire" : ""
				})
			}
		})
	}

	render() {
		return (
      	<div className="FireIndicator">
			{ this.state.fireText }
		</div>
    	);
	}

}