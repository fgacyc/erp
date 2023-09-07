import { Card, Modal } from "@arco-design/web-react";
import "./UI_InterviewAppoInsight.css";
import { Dispatch, FunctionComponent, SetStateAction } from "react";

interface UIInterviewAppoInsightProps {
	visible: boolean;
	setVisible: Dispatch<SetStateAction<boolean>>;
	insightData?: {
		date: string;
		ministries: {
			ministry: string;
			value: number;
		}[];
	}[];
}

const UIInterviewAppoInsight: FunctionComponent<
	UIInterviewAppoInsightProps
> = ({ visible, setVisible, insightData }) => {
	return (
		<Modal
			title="Appointment Time Insight"
			visible={visible}
			onOk={() => setVisible(false)}
			onCancel={() => setVisible(false)}
			autoFocus={false}
			focusLock={true}
			style={{ width: 800 }}
		>
			<div className="Interview-Appo-Insight-con">
				{insightData &&
					insightData.length > 0 &&
					insightData.map((item, index) => {
						return (
							<Card
								style={{ width: 300, height: "100%" }}
								title={item.date}
								key={index}
							>
								{item.ministries.map((time, index) => {
									return (
										<div key={index}>
											{time.ministry}:{time.value}
										</div>
									);
								})}
							</Card>
						);
					})}
			</div>
		</Modal>
	);
};
export default UIInterviewAppoInsight;
