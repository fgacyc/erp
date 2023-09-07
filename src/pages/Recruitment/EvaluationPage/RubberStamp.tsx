import "./EvaluationPage.css";
import { FunctionComponent, useEffect, useState } from "react";
import { getRubberStampTime } from "../../../tools/datetime.js";
import { get } from "idb-keyval";

interface EvaluationResultRubberStampProps {
	type: ApplicationStatus;
	trigger: string;
}
const EvaluationResultRubberStamp: FunctionComponent<
	EvaluationResultRubberStampProps
> = ({ type, trigger }) => {
	const [rubberStampType, setRubberStampType] = useState<string>("");
	const [currentColor, setCurrentColor] = useState<string>("");
	const [currentTime, setCurrentTime] = useState<string[]>([]);

	useEffect(() => {
		if (trigger === "evaluationButtons") setCurrentTime(getRubberStampTime());
		else ifUpdateStampTime();
	}, [trigger]);

	useEffect(() => {
		if (type === "accepted") {
			setRubberStampType("PASS");
			setCurrentColor("rgba(0, 180, 42,0.5)");
		} else if (type === "rejected") {
			setRubberStampType("FAIL");
			setCurrentColor("rgba(245, 63, 63,0.5)");
		} else if (type === "kiv") {
			setRubberStampType("KIV");
			setCurrentColor("rgba(244, 120, 0,0.5)");
		}
	}, [type]);

	function ifUpdateStampTime() {
		get("current_candidate").then((res) => {
			if (
				res.application.status === "accepted" ||
				res.application.status === "rejected" ||
				res.application.status === "kiv"
			) {
				// console.log(res.application.updated)
				setCurrentTime(getRubberStampTime(res.application.updated));
			}
		});
	}

	return (
		<div
			className="rubber-stamp-con"
			style={{ border: "5px solid " + currentColor, color: currentColor }}
		>
			<div
				className="rubber-stamp-container"
				style={{ border: "2px solid " + currentColor }}
			>
				{currentTime && (
					<div className="rubber-stamp-body">
						<div>{rubberStampType}</div>
						<div className="rubber-stamp-body-text">{currentTime[0]}</div>
						<div className="rubber-stamp-body-text">{currentTime[1]}</div>
					</div>
				)}
			</div>
		</div>
	);
};
export default EvaluationResultRubberStamp;
