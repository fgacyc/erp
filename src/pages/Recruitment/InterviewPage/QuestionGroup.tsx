import { Input } from '@arco-design/web-react';
const TextArea = Input.TextArea;
import './recruitment-appo.css';
import {
	CSSProperties,
	Dispatch,
	FunctionComponent,
	SetStateAction,
	useEffect,
	useRef,
	useState,
} from 'react';
import { IconCheck, IconEdit } from '@arco-design/web-react/icon';

interface QuestionGroupProps {
	questions: InterviewQuestion[];
	id: number;
	setQuestions: Dispatch<SetStateAction<InterviewQuestion[]>>;
	ifInterviewed: boolean;
	// type;
	// QAs;
	// setQAs;
}

const QuestionGroup: FunctionComponent<QuestionGroupProps> = ({
	questions,
	id,
	setQuestions,
	ifInterviewed,
	// type,
	// QAs,
	// setQAs,
}) => {
	let question = questions[id] ?? {
		type: 'freeQ&As',
		question: '',
		candidate: '',
		interviewer: '',
	};
	const [interviewerAnswer, setInterviewerAnswer] = useState<
		VocalRating | string
	>();
	const [ifDisable, setIfDisable] = useState(ifInterviewed);
	const [textAreaStyle, setTextAreaStyle] = useState({
		width: '100%',
		resize: 'none',
	});

	const input = useRef(null);

	useEffect(() => {
		//console.log(ifInterviewed)
		setInterviewerAnswer(question?.interviewer);
	}, [question?.interviewer]);

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

	function onChangeHandler(val: string) {
		setInterviewerAnswer(val);
		question = { ...question, ['interviewer']: val };
		const newQuestions = [...questions];
		newQuestions[id] = question;
		setQuestions(newQuestions);
	}

	return (
		<div className="question-group">
			<div
				style={{
					marginTop: '30px',
					marginBottom: '10px',
				}}
			>{`${id + 1}. ${question?.question}`}</div>
			<TextArea
				placeholder="Please enter ..."
				autoSize={{ minRows: 3, maxRows: 8 }}
				value={question?.candidate}
				disabled={true}
				className="candidate-textarea-disable question-group-textArea"
			/>
			<div style={{ height: 10 }}></div>
			{question?.type === 'general' && (
				<div className="interviewer-answer-con">
					<TextArea
						placeholder="Please enter your remarks ..."
						autoSize={{ minRows: 3, maxRows: 8 }}
						onChange={onChangeHandler}
						value={interviewerAnswer as string}
						className="candidate-textarea-disable"
						style={textAreaStyle as CSSProperties}
						disabled={ifDisable}
						ref={input}
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
			)}
		</div>
	);
};
export default QuestionGroup;
