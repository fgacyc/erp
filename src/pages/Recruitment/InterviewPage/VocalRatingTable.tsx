import { Input, Rate } from '@arco-design/web-react';
import {
	Dispatch,
	FunctionComponent,
	SetStateAction,
	useEffect,
	useState,
} from 'react';
import { get } from 'idb-keyval';

interface VocalRatingTableProps {
	vocalRatingForm?: VocalRating;
	setVocalRatingForm: Dispatch<SetStateAction<VocalRating | undefined>>;
	ifInterviewed?: boolean;
}

const VocalRatingTable: FunctionComponent<VocalRatingTableProps> = ({
	vocalRatingForm,
	setVocalRatingForm,
	ifInterviewed,
}) => {
	const [ifDisableInput, setIfDisableInput] = useState(false);
	const [inputPlaceholder, setInputPlaceholder] = useState(
		'Please Enter Remarks',
	);

	useEffect(() => {
		if (ifInterviewed) {
			get('current_candidate').then((res) => {
				const questions = res.interview.ministry.questions;
				for (const item of questions) {
					if (item.type === 'vocalRating') {
						setVocalRatingForm(item.interviewer);
					}
				}
				//console.log(vocalRatingForm)
			});
		}

		const path = window.location.pathname;
		if (path.includes('recruitment_evaluation/form/')) {
			setIfDisableInput(true);
			setInputPlaceholder('N/A');
		}
	}, [ifInterviewed, setVocalRatingForm]);

	const items = [
		'Pitch 音准',
		'Pronunciation 咬字&发音',
		'Tone 腔调',
		'Beat 节拍',
		'Projection 音量',
		'Breathing 气息',
		'Grooving 乐感',
		'Range 音域',
		'Attitude 态度',
		'Appearance 外形/外在表现',
	];

	function handleStarChange(val: number, index: number) {
		const newVocalRatingForm = { ...vocalRatingForm };
		if (!newVocalRatingForm.stars) return;
		newVocalRatingForm.stars[index] = val;
		setVocalRatingForm(newVocalRatingForm);
	}

	function handleRemarkChange(val: string, index: number) {
		const newVocalRatingForm = { ...vocalRatingForm };
		if (!newVocalRatingForm.remarks) return;
		newVocalRatingForm.remarks[index] = val;
		setVocalRatingForm(newVocalRatingForm);
	}

	return (
		<>
			<div style={{ width: '100%' }}>
				{items.map((item, index) => {
					return (
						<div key={index} style={{ display: 'flex', marginBottom: 10 }}>
							<div style={{ width: '20%' }}>{item}</div>
							<div style={{ width: '20%', minWidth: 160, margin: '0 10px' }}>
								<Rate
									onChange={(val) => handleStarChange(val, index)}
									value={vocalRatingForm?.stars?.[index]}
									disabled={ifDisableInput}
								/>
							</div>
							<div style={{ width: '60%' }}>
								<Input
									placeholder={inputPlaceholder}
									onChange={(val) => handleRemarkChange(val, index)}
									value={vocalRatingForm?.remarks?.[index]}
									disabled={ifDisableInput}
								/>
							</div>
						</div>
					);
				})}
			</div>
		</>
	);
};

export default VocalRatingTable;
