import Rx from 'rxjs';
import './stateManager.css';

export default class State {
	_facebookTokenSubject = new Rx.BehaviorSubject(null)
	_videoIdSubject = new Rx.Subject()
	_messageMatch = new Rx.BehaviorSubject("#fire")
	_messageCount = new Rx.BehaviorSubject(10)
	_fireLength = new Rx.BehaviorSubject(3)

	commentsConfig = Rx.Observable.create((observer) => {
		Rx.Observable.combineLatest(
		this._facebookTokenSubject,
		this._videoIdSubject,
		this._messageMatch,
		this._messageCount,
		this._fireLength,
		(token, videoId, messageMatch, messageCount, fireLength) => {
			return {
				token: token,
				videoId: videoId,
				messageMatch,
				messageCount,
				fireLength
			}
		})
		.debounceTime(1000)
		.subscribe({
			next: (config) => observer.next(config)
		})
	})
	isLoggedIn = this._facebookTokenSubject
		.map((value) => { return value ? true : false }) 

	setVideoId = (id) => {
		this._videoIdSubject.next(id)
	}
	get messageMatch() { return this._messageMatch.getValue() }
	setMessageMatch = (match) => {
		this._messageMatch.next(match)
	}
	get messageCount() { return this._messageCount.getValue() }
	setMessageCount = (count) => {
		this._messageCount.next(count)
	}
	get fireLength() { return this._fireLength.getValue() }
	setFireLength = (length) => {
		this._fireLength.next(length)
	}
	setToken = (token) => {
		this._facebookTokenSubject.next(token)
	}
}