import {Card, Modal} from "@arco-design/web-react";
import "./UI_InterviewAppoInsight.css";
export default function UI_InterviewAppoInsight({visible, setVisible,insightData}){
    // console.log(insightData)

    return (
        <Modal
            title='Appointment Time Insight'
            visible={visible}
            onOk={() => setVisible(false)}
            onCancel={() => setVisible(false)}
            autoFocus={false}
            focusLock={true}
            style={{width: 800}}
        >
            <div className="Interview-Appo-Insight-con">
                {insightData && insightData.map((item, index) => {
                    return (
                        <Card style={{ width: 300 }}
                              title={item.date}
                              key={index}
                        >
                            {
                                item.ministries.map((time, index) => {
                                    return <div key={index}>{time.ministry}:{time.value}</div>
                                })
                            }
                        </Card>
                    )
                })
                }
            </div>
        </Modal>
    )
}