import { getDateString } from '../../../tools/datetime.js';

export function checkApplicantStatus(recruiter) {
	// after evaluation: accepted, rejected, kiv
	if (recruiter.application.status === 'accepted') {
		return 3.1; // get accepted in evaluation
	} else if (recruiter.application.status === 'kiv') {
		return 3.2; // get kiv in evaluation
	} else if (recruiter.application.status === 'rejected') {
		return -3; // get rejected in evaluation
	} else if (
		recruiter.interview.status === true &&
		recruiter.application.status === 'pre-accepted'
	) {
		return 2.5; // waiting for evaluation
	}

	// interview: appointment, waiting for interview, interview done
	else if (
		recruiter.application.status === 'pre-accepted' &&
		recruiter.interview.status === true
	) {
		return 2; //interivew done
	} else if (
		recruiter.application.status === 'pre-accepted' &&
		recruiter.hasOwnProperty('appointment')
	) {
		return 1.5; // appointment and waiting for interview
	} else if (
		recruiter.application.status === 'pre-accepted' &&
		!recruiter.hasOwnProperty('appointment') &&
		recruiter.interview.status !== null
	) {
		return -1.5; // has not appointment
	}

	// pre-screening: pending, passed, failed
	else if (recruiter.application.status === 'pending') {
		return 0.5; // pending
	} else if (recruiter.application.status === 'pre-accepted') {
		return 1; // passed
	} else if (recruiter.application.status === 'pre-rejected') {
		return -1; // failed
	} else {
		return 0; // no status
	}
}
export function getRecruiterInfo(statusID, recruiter) {
	let res = ['', '', ''];
	if (statusID < 0) statusID = -statusID;

	// evaluation
	if (statusID >= 2.5) {
		res[0] = preScreeningInfo(statusID, recruiter);
		res[1] = interviewInfo(statusID, recruiter);
		res[2] = evaluationInfo(statusID, recruiter);
	} else if (statusID < 2.5 && statusID >= 1.5) {
		res[0] = preScreeningInfo(statusID, recruiter);
		res[1] = interviewInfo(statusID, recruiter);
	} else if (statusID < 1.5) {
		res[0] = preScreeningInfo(statusID, recruiter);
	}
	return res;
}

function preScreeningInfo(statusID, recruiter) {
	let regTime = getDateString(recruiter.created * 1000);

	if (statusID === 0) {
		return `Register at ${regTime}, No status`;
	}
	if (recruiter.application.status === 'pending') {
		return `Register at ${regTime}, [Waiting for pre-screening]`;
	} else if (recruiter.application.status === 'pre-accepted') {
		let pre_screeningTime = getDateString(
			recruiter.pre_screening.pre_screening_time * 1000,
		);
		if (recruiter.email.appointment.send.status) {
			let appointmentEmailTime = getDateString(
				recruiter.email.appointment.send.timestamp * 1000,
			);
			return `Register at ${regTime}, [Passed pre-screening] at ${pre_screeningTime}, ✅Appointment email has been sent at ${appointmentEmailTime}`;
		} else {
			return `Register at ${regTime}, [Passed pre-screening] at ${pre_screeningTime}, ❌Appointment email has not been sent`;
		}
	} else if (recruiter.application.status === 'pre-rejected') {
		let pre_screeningTime = getDateString(
			recruiter.pre_screening.pre_screening_time * 1000,
		);
		if (recruiter.email.offer.send.status) {
			let offerEmailTime = getDateString(
				recruiter.email.offer.send.timestamp * 1000,
			);
			return `Register at ${regTime}, [Failed pre-screening] at ${pre_screeningTime}, ✅Rejected email has been sent at ${offerEmailTime}`;
		} else {
			return `Register at ${regTime}, [Failed pre-screening] at ${pre_screeningTime}, ❌Rejected email has not been sent`;
		}
	}
}

function interviewInfo(statusID, recruiter) {
	if (statusID === 1.5) {
		if (recruiter.hasOwnProperty('appointment')) {
			let interviewCreated = getDateString(
				recruiter.appointment.ministry.created * 1000,
			);
			let appointmentTime = getDateString(
				recruiter.appointment.ministry.appointment_time * 1000,
			);
			let song = null;
			if (recruiter.info.ministry[2] === 'dance') {
				song = recruiter.interview.ministry.questions[5].candidate;
			}
			return `[Waiting for interview], Made appointment at ${interviewCreated}, Schedule Interview at ${appointmentTime} ${
				song !== null && ' ,choose song: [' + song + '].'
			}`;
		} else {
			if (recruiter.email.appointment.send.status) {
				let appointmentEmailTime = getDateString(
					recruiter.email.appointment.send.timestamp * 1000,
				);
				return `[Waiting for appointment for interview], ✅Appointment email has been sent at ${appointmentEmailTime}`;
			} else {
				return `[Waiting for appointment for interview], ❌Appointment email has not been sent `;
			}
		}
	} else if (statusID >= 2) {
		let interviewStartTime = getDateString(
			recruiter.interview.ministry.start_time * 1000,
		);
		let interviewEndTime = getDateString(
			recruiter.interview.ministry.end_time * 1000,
		);
		return `[Interviewed], start at ${interviewStartTime}, end at ${interviewEndTime}`;
	}
}

function evaluationInfo(statusID, recruiter) {
	if (statusID === 2.5) {
		return '[Waiting for evaluation]';
	} else {
		let evaluationTime = getDateString(recruiter.application.updated * 1000);
		let evaluationStatus = recruiter.application.status;

		let offerMessage = '';
		if (recruiter.email.offer.send.status === false) {
			offerMessage = '❌Offer email has not been sent';
		} else {
			let offerEmailTime = getDateString(
				recruiter.email.offer.send.timestamp * 1000,
			);
			offerMessage = `✅Offer email has been sent at ${offerEmailTime}`;
		}

		if (statusID === 3) {
			return `[Evaluated] at ${evaluationTime}, ${evaluationStatus}, ${offerMessage}`;
		} else if (statusID === 3.2) {
			return `[Evaluated] at ${evaluationTime}, ${evaluationStatus}, ${offerMessage}`;
		} else if (statusID === 3.1) {
			return `[Evaluated] at ${evaluationTime}, ${evaluationStatus}, ${offerMessage}`;
		}
	}
}
