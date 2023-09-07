import { Card, Input, TextAreaProps } from "@arco-design/web-react";
import VocalRatingTable from "./VocalRatingTable";
import {
	Dispatch,
	FunctionComponent,
	SetStateAction,
	useEffect,
	useState,
} from "react";
import { IconCheck, IconEdit } from "@arco-design/web-react/icon";
import "./recruitment-appo.css";

const TextArea = Input.TextArea;

interface FreeQATextAreaProps {
	candidate?: Recruiter["info"];
	questions: InterviewQuestion[];
	freeQAs?: string | VocalRating;
	setFreeQAs: Dispatch<SetStateAction<string | VocalRating | undefined>>;
	vocalRatingForm?: VocalRating;
	setVocalRatingForm: Dispatch<SetStateAction<VocalRating | undefined>>;
	ifInterviewed: boolean;
}

const FreeQATextArea: FunctionComponent<FreeQATextAreaProps> = ({
	candidate,
	questions,
	freeQAs,
	setFreeQAs,
	vocalRatingForm,
	setVocalRatingForm,
	ifInterviewed,
}) => {
	const [ifDisable, setIfDisable] = useState(ifInterviewed);
	const [textAreaStyle, setTextAreaStyle] = useState<TextAreaProps["style"]>({
		width: "100%",
		resize: "none",
	});
	const [ifVocal, setIfVocal] = useState(false);
	const [spaceHeight, setSpaceHeight] = useState(0);
	// console.log(questions)

	useEffect(() => {
		function getFreeQAAnswer() {
			for (const item of questions) {
				if (item.type === "freeQ&As") {
					return item.interviewer;
				}
			}
		}
		function calHeight() {
			if (spaceHeight !== 0) return;

			const appTarget = document.querySelector(".full-screen-app-component");
			const target = document.querySelector(".full-screen-app-component-con");
			const appHeight = window.getComputedStyle(appTarget as Element).height;
			const targetHeight = window.getComputedStyle(target as Element).height;
			//console.log(appHeight, targetHeight)

			const newAppHeight = parseInt(appHeight, 10);
			const newTargetHeight = parseInt(targetHeight, 10);

			if (newAppHeight > newTargetHeight) {
				setSpaceHeight(newAppHeight - newTargetHeight - 286);
				// console.log("yessss")
			}
		}

		if (ifInterviewed) {
			setFreeQAs(getFreeQAAnswer());
		}
		if (candidate) {
			setIfVocal(candidate.ministry[2] === "vocal");
		}
		calHeight();
	}, [candidate, ifInterviewed, questions, setFreeQAs, spaceHeight]);

	const activeStyle: TextAreaProps["style"] = {
		width: "100%",
		resize: "none",
		border: "1px solid #165dff",
		backgroundColor: "#fff",
		borderRadius: "2px",
		boxShadow: "0 0 0 0 #bedaff",
	};

	function handleClick() {
		if (ifDisable) {
			setIfDisable(false);
			setTextAreaStyle(activeStyle);
		} else {
			setIfDisable(true);
			setTextAreaStyle({ width: "100%", resize: "none" });
		}
	}

	function handleTextAreaChange(val: string) {
		setFreeQAs(val);
	}

	return (
		<div style={{ display: "flex", justifyItems: "center" }}>
			<div style={{ width: "80%", margin: "50px auto" }}>
				<div className="interviewer-qas-answer-con">
					<TextArea
						// onChange={setFreeQAs}
						onChange={handleTextAreaChange}
						placeholder="Please enter ..."
						autoSize={{ minRows: 15 }}
						disabled={ifDisable}
						value={freeQAs as string}
						style={textAreaStyle}
						className="candidate-textarea-disable"
					/>
					{ifInterviewed && (
						<span>
							{ifDisable ? (
								<IconEdit
									className="interviewer-answer-edit-icon"
									onClick={handleClick}
								/>
							) : (
								<IconCheck
									className="interviewer-answer-edit-icon"
									onClick={handleClick}
								/>
							)}
						</span>
					)}
				</div>
				{ifVocal && (
					<div>
						<Card style={{ marginTop: 1 }}>
							<VocalRatingTable
								vocalRatingForm={vocalRatingForm}
								setVocalRatingForm={setVocalRatingForm}
								ifInterviewed={ifInterviewed}
							/>
						</Card>
						<div style={{ height: 50 }}></div>
					</div>
				)}
				<div style={{ height: spaceHeight }}></div>
			</div>
		</div>
	);
};
export default FreeQATextArea;
