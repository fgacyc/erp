import { DatePicker, Message, Modal } from "@arco-design/web-react";
import {
	Dispatch,
	FunctionComponent,
	SetStateAction,
	useEffect,
	useState,
} from "react";
import { date2TimeStamp, getNowYYYYMMDDHHMMSS } from "../../../tools/datetime";
import { get } from "idb-keyval";
import { putReq } from "../../../tools/requests";

interface UIInterviewDatePickerModalProps {
	visible: boolean;
	setVisible: Dispatch<SetStateAction<boolean>>;
	userData: Recruiter[];
	setUserData: Dispatch<SetStateAction<Recruiter[]>>;
}
const UIInterviewDatePickerModal: FunctionComponent<
	UIInterviewDatePickerModalProps
> = ({ visible, setVisible, userData, setUserData }) => {
	const [date, setDate] = useState(getNowYYYYMMDDHHMMSS);
	const [RID, setRID] = useState(null);

	useEffect(() => {
		setDate(getNowYYYYMMDDHHMMSS);
		get("current_candidate").then((res) => {
			if (res) {
				setRID(res._id);
				//console.log(res._id)
			}
		});
	}, [visible]);

	function changeHandle(v: string) {
		// console.log(v);
		setDate(v);
	}

	function handleOk() {
		const timestamp = date2TimeStamp(date);
		const data = {
			appointment_time: timestamp,
		};
		putReq(`/appointment/reschedule/${RID}`, data).then((res) => {
			if (res.status) {
				setVisible(false);
			} else {
				Message.warning("Reschedule Failed");
			}
		});

		const updatedUserData = userData.map((item) => {
			if (item._id === RID) {
				return {
					...item,
					appointment: {
						...item.appointment,
						ministry: {
							...item.appointment.ministry,
							appointment_time: timestamp,
						},
					},
				};
			}
			return item;
		});
		setUserData(updatedUserData);
	}

	return (
		<Modal
			visible={visible}
			onOk={() => setVisible(false)}
			onCancel={() => setVisible(false)}
			autoFocus={false}
			focusLock={true}
			footer={null}
			title="Reshedule Interview Date"
			style={{ width: 370, padding: 0 }}
		>
			<div style={{ height: 20 }}></div>
			<DatePicker
				triggerElement={null}
				showTime={true}
				defaultValue={date}
				style={{ width: 300, position: "relative", left: 15 }}
				onSelect={changeHandle}
				onOk={handleOk}
			/>
			<div style={{ fontSize: 18, textAlign: "center", marginTop: 10 }}>
				{date}
			</div>
		</Modal>
	);
};
export default UIInterviewDatePickerModal;
