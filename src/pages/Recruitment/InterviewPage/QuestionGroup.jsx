import { Input,  } from '@arco-design/web-react';
const TextArea = Input.TextArea;
export  default function QuestionGroup(props){
    const {question,id,type,QAs, setQAs} = props;

    function  onChangeHandler(value){
        let key = type + id+"-" +question;
        setQAs({...QAs, [key]:value})
        //console.log(QAs)
    }

    const conStyle = {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",

    }

    const textAreaStyle = {
        width: "80%",
        resize: "none"
    }


    return(
        <div style={conStyle}>
            <div style={{
                marginTop: "30px",
                marginBottom: "10px",
            }}>{id}.{question}</div>
            <TextArea
                placeholder='Please enter ...'
                style={textAreaStyle}
                autoSize={{ minRows: 3, maxRows: 8 }}
                onChange={onChangeHandler}/>
        </div>
    )
}