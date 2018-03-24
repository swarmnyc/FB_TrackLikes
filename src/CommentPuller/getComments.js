import Rx from 'rxjs';

var getComments = (token, videoId) => {
	return Rx.Observable.create((observer) => {
		var source = new EventSource("https://streaming-graph.facebook.com/" + videoId + "/live_comments?access_token=" + token + "&comment_rate=one_hundred_per_second&fields=message");
		source.onmessage = function(event) {
			const json = JSON.parse(event.data);
			if (json.message) {
				observer.next(json.message)
			}	
		}
		source.onerror = function(error) {
			observer.error(error)
		}
		return function unsubscribe() {
			source.close()
		}
	})
}

/**
 * 
 * @param {*} config { token: facbeookToken, 
 * 					   videoId: live video id,
 * 					   messageMatch: string to look for in comments,
 * 					   messageCount: number of comments to generate a fire event,
 *                     fireLength: time in seconds for a fire event }
 */
var fireEvent = (config) => {
	const lowercaseMatch = config.messageMatch.toLowerCase()
	return getComments(config.token, config.videoId)
		.scan((acc, message) => { return acc + ((message.toLowerCase().indexOf(lowercaseMatch) >= 0) ? 1 : 0) }, 0)
		.filter((count) => { return count % config.messageCount == 0 && count != 0 })
		.map((fire) => { return config.fireLength })
}

/**
 * 
 * @param {*} config { token: facbeookToken, 
 * 					   videoId: live video id,
 * 					   messageMatch: string to look for in comments,
 * 					   messageCount: number of comments to generate a fire event,
 *                     fireLength: time in seconds for a fire event }
 */
export function shouldFire(config) {
	var fireEvents = []
	var isFiring = false
	var timer = null
	var fire = (observer) => {
		if (isFiring) { return }
		isFiring = true
		if (fireEvents.length > 0) {
			const event = fireEvents.shift()
			observer.next(true)
			timer = setTimeout(() => { 
				isFiring = false
				fire(observer) 
			}, event * 1000)
			return
		}
		observer.next(false)
		isFiring = false
	}
	return Rx.Observable.create((observer) => {
		observer.next(false)
		fireEvent(config).subscribe({
			next: (fireEvent) => {
				fireEvents.push(fireEvent)
				fire(observer)
			},
			error: (error) => { observer.error(error) }
		})
		return () => {
			fireEvents = []
			clearTimeout(timer)
		}
	})
	.distinctUntilChanged()
}