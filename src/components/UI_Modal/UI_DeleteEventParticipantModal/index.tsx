import { Input, Modal, Select, Message } from "@arco-design/web-react";
import {
	Dispatch,
	FunctionComponent,
	SetStateAction,
	useEffect,
	useState,
} from "react";
import { get } from "idb-keyval";
import { getTimeStamp } from "../../../tools/datetime";

const Option = Select.Option;
const options = ["Work", "Health Issue", "On a Vacation", "custom"];
const TextArea = Input.TextArea;

interface DeleteEventParticipantModalProps {
	visible: boolean;
	setVisible: Dispatch<SetStateAction<boolean>>;
	deleteParticipant: (
		id: number,
		deletedData: { timestamp: EpochTimeStamp; reason: string },
	) => void;
}

const UIDeleteEventParticipantModal: FunctionComponent<
	DeleteEventParticipantModalProps
> = ({ visible, setVisible, deleteParticipant }) => {
	const [current_participant, setCurrentParticipant] = useState<{
		CYC_ID: number;
		name: string;
	} | null>();
	const [delete_reason, setDeleteReason] = useState(null);
	const [key, setKey] = useState(0);

	useEffect(() => {
		get("current_participant").then((res) => {
			setCurrentParticipant(null);
			setDeleteReason(null);
			if (res) setCurrentParticipant(res);
		});
		setKey((state) => state + 1);
	}, [visible]);

	function deleteParticipantHandler() {
		console.log(delete_reason);
		if (!current_participant) return;
		if (!delete_reason) {
			Message.warning("Please select a reason");
			return;
		} else if (delete_reason === "custom") {
			Message.warning("Please enter a custom reason");
			return;
		}

		deleteParticipant(current_participant.CYC_ID, {
			timestamp: getTimeStamp(),
			reason: delete_reason,
		});
	}

	return (
		<Modal
			title="Delete Participant"
			visible={visible}
			onOk={deleteParticipantHandler}
			onCancel={() => setVisible(false)}
			autoFocus={false}
			focusLock={true}
			key={key}
		>
			<p>
				Do you want to delete this participant: [
				{current_participant && current_participant.name}] ?
			</p>
			<Select
				placeholder="Select a reason"
				onChange={(value) => setDeleteReason(value)}
			>
				{options.map((option, index) => (
					<Option key={index} value={option}>
						{option}
					</Option>
				))}
			</Select>
			{delete_reason === "custom" && (
				<TextArea
					placeholder="Please enter a custom reason"
					allowClear
					autoSize={{ minRows: 3, maxRows: 6 }}
					style={{ marginTop: 20, resize: "none" }}
				/>
			)}
		</Modal>
	);
};

export default UIDeleteEventParticipantModal;
