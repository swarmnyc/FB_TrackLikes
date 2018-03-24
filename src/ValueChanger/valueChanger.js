import Rx from 'rxjs';
import React, { Component } from 'react';

export default class ValueChanger extends Component {

	handleVideoIdChange(event) {
		const text = event.target.value
		this.props.stateObj.setVideoId(text)
	}
	handleMessageTrigger(event) {
		const text = event.target.value
		this.props.stateObj.setMessageMatch(text)
	}

	handleFireLength(event) {
		const text = event.target.value
		this.props.stateObj.setFireLength(text)
	}

	handleMessageCount(event) {
		const text = event.target.value
		this.props.stateObj.setMessageCount(text)
	}

	render() {
		return (
      	<div className="ValueChanger">
			  <label>
				  Video Id (in facebook url, https://www.facebook.com/cnn/videos/$VIDEOID/):
			<input type="text" onChange={this.handleVideoIdChange.bind(this)} />
			</label>
			<br/>
			<label>
				  Message Text Match To Trigger Fire:
			<input type="text" placeholder={this.props.stateObj.messageMatch} onChange={this.handleMessageTrigger.bind(this)} />
			</label>
			<br/>
			<label>
				  Message Count To Trigger Fire:
			<input type="number" placeholder={this.props.stateObj.messageCount} onChange={this.handleMessageCount.bind(this)} />
			</label>
			<br/>
			<label>
				  Length of Fire:
			<input type="number" placeholder={this.props.stateObj.fireLength} onChange={this.handleFireLength.bind(this)} />
			</label>
		</div>
    	);
	}

}