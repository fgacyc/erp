import { Card, Input } from '@arco-design/web-react';
import VocalRatingTable from './VocalRatingTable.jsx';
import { useEffect, useState } from 'react';
import { IconCheck, IconEdit } from '@arco-design/web-react/icon';
import './recruitment-appo.css';

const TextArea = Input.TextArea;
export default function FreeQATextArea({
	candidate,
	questions,
	freeQAs,
	setFreeQAs,
	vocalRatingForm,
	setVocalRatingForm,
	ifInterviewed,
}) {
	const [ifDisable, setIfDisable] = useState(ifInterviewed);
	const [textAreaStyle, setTextAreaStyle] = useState({
		width: '100%',
		resize: 'none',
	});
	const [ifVocal, setIfVocal] = useState(false);
	const [spaceHeight, setSpaceHeight] = useState(0);
	// console.log(questions)

	function calHeight() {
		if (spaceHeight !== 0) return;

		let appTarget = document.querySelector('.full-screen-app-component');
		let target = document.querySelector('.full-screen-app-component-con');
		let appHeight = window.getComputedStyle(appTarget).height;
		let targetHeight = window.getComputedStyle(target).height;
		//console.log(appHeight, targetHeight)

		appHeight = parseInt(appHeight, 10);
		targetHeight = parseInt(targetHeight, 10);

		if (appHeight > targetHeight) {
			setSpaceHeight(appHeight - targetHeight - 286);
			// console.log("yessss")
		}
	}

	useEffect(() => {
		if (ifInterviewed) {
			setFreeQAs(getFreeQAAnswer());
		}
		if (candidate) {
			setIfVocal(candidate.ministry[2] === 'vocal');
		}
		calHeight();
	}, []);

	function getFreeQAAnswer() {
		for (let item of questions) {
			if (item.type === 'freeQ&As') {
				return item.interviewer;
			}
		}
	}

	const activeStyle = {
		width: '100%',
		resize: 'none',
		border: '1px solid #165dff',
		backgroundColor: '#fff',
		borderRadius: '2px',
		boxShadow: '0 0 0 0 #bedaff',
	};

	function handleClick() {
		if (ifDisable) {
			setIfDisable(false);
			setTextAreaStyle(activeStyle);
		} else {
			setIfDisable(true);
			setTextAreaStyle({ width: '100%', resize: 'none' });
		}
	}

	function handleTextAreaChange(val) {
		setFreeQAs(val);
	}

	return (
		<div style={{ display: 'flex', justifyItems: 'center' }}>
			<div style={{ width: '80%', margin: '50px auto' }}>
				<div className="interviewer-qas-answer-con">
					<TextArea
						// onChange={setFreeQAs}
						onChange={handleTextAreaChange}
						placeholder="Please enter ..."
						autoSize={{ minRows: 15 }}
						disabled={ifDisable}
						value={freeQAs}
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
}
