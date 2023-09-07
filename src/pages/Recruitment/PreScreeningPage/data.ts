export function getEvaluationStatus(record: Recruiter) {
	const applicationStatus = record.application.status;
	if (
		applicationStatus === "pending" ||
		applicationStatus === "pre-accepted" ||
		applicationStatus === "pre-rejected"
	) {
		return "N/A";
	} else if (
		applicationStatus === "accepted" ||
		applicationStatus === "rejected"
	) {
		return applicationStatus;
	} else {
		return "N/A";
	}
}
