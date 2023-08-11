import {
	Button,
	Card,
	DatePicker,
	Modal,
	Typography,
} from '@arco-design/web-react';
import { QRCodeSVG } from 'qrcode.react';

import {
	Dispatch,
	FunctionComponent,
	SetStateAction,
	useEffect,
	useState,
} from 'react';
import {
	getDateString,
	getNowYYYYMMDDHHMMSS,
} from '../../../tools/datetime.js';
import './UI_QRCodeModal.css';
import { capitalFirstLetter } from '../../../tools/string.js';

interface UIQrCodeModalProps {
	ministry: string;
	RID: string;
	visible: boolean;
	setVisible: Dispatch<SetStateAction<boolean>>;
}

export const UI_QRCodeModal: FunctionComponent<UIQrCodeModalProps> = ({
	ministry,
	RID,
	visible,
	setVisible,
}) => {
	const [appointmentDates, setAppointmentDates] = useState<EpochTimeStamp[]>(
		[],
	);
	const [currentDate, setCurrentDate] = useState<string>('');
	const [URL, setURL] = useState('https://fgacyc.com/serve');

	useEffect(() => {
		setAppointmentDates(getAppointmentDate(ministry));
		setCurrentDate(
			getDateString(getAppointmentDate(ministry)?.[0] ?? 0 * 1000),
		);
		setURL(generateURL(String(getAppointmentDate(ministry)[0]), RID));
	}, [RID, ministry, visible]);

	function getAppointmentDate(ministry?: string) {
		if (ministry === 'dance') {
			return [1690459200, 1690596000];
		} else if (
			ministry === 'content creation' ||
			ministry === 'editorial' ||
			ministry === 'graphic design' ||
			ministry === 'multimedia design' ||
			ministry === 'photography' ||
			ministry === 'sound'
		) {
			return [1690018200, 1690097400];
		} else {
			return [1690018200, 1690097400];
		}
	}

	function generateURL(date: string, RID: string) {
		// console.log(url);
		return `https://fgacyc.com/serve/appointment/${date}/${RID}`;
	}

	function handleClick(date: EpochTimeStamp) {
		setCurrentDate(getDateString(date * 1000));
		setURL(generateURL(String(date), RID));
	}

	const style = {
		width: 200,
		marginBottom: 24,
		marginRight: 24,
		bottom: 0,
		right: 0,
		margin: 0,
	};

	// function onSelect(dateString, date) {
	//     console.log('onSelect', dateString, date);
	// }

	function onChange(dateString: string) {
		if (!dateString) return;

		// console.log('onChange: ', dateString, date);
		const timeStamp = new Date(dateString).getTime() / 1000;
		setCurrentDate(dateString);
		setURL(generateURL(String(timeStamp), RID));
		// console.log(timeStamp);
	}

	return (
		<Modal
			title="Choose appointment date time"
			visible={visible}
			onOk={() => setVisible(false)}
			onCancel={() => setVisible(false)}
			autoFocus={false}
			focusLock={true}
		>
			<div className="qrcode-modal-con">
				<div className="qrcode-modal-code-con">
					<QRCodeSVG value={URL} />
					<div>{capitalFirstLetter(ministry)}</div>
					<div style={{ fontSize: 16 }}>{currentDate}</div>
				</div>
				<div className="qrcode-modal-btns-con">
					{appointmentDates &&
						appointmentDates.map((date, index) => {
							return (
								<Button
									type="dashed"
									key={index}
									onClick={() => handleClick(date)}
									style={{ width: 200 }}
								>
									{getDateString(date * 1000)}
								</Button>
							);
						})}
					<DatePicker
						showTime
						defaultValue={getNowYYYYMMDDHHMMSS()}
						// onSelect={onSelect}
						onChange={onChange}
						style={style}
					/>
				</div>
			</div>
			<Card style={{ marginTop: 15 }}>
				<Typography.Paragraph copyable>{URL}</Typography.Paragraph>
			</Card>
		</Modal>
	);
};
