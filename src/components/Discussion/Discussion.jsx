import {Avatar, Input,} from "@arco-design/web-react";
import StatusContainer from "../../StatusContainer.js";
import "./Discussion.css";
const InputSearch = Input.Search;
import UIComment from "./Comment.jsx";

export default  function Discussion(){
    const topicText = localStorage.getItem("discussion_title");
    const content = localStorage.getItem("discussion_content");


    return (
        <div className={"discussion-container"}>
            <div className={"discussion-header"}>
                <img src={"CYC_Logo_black_x120.png"} alt={"logo"}
                    style={{width: '80px', height: '30px', margin: '10px'}}
                />
                <InputSearch allowClear placeholder='Enter keyword to search' style={{ width: 350 }} />
                <Avatar style={{ backgroundColor: '#3370ff' }}>
                    {
                        StatusContainer.currentUser.user_name.charAt(0).toUpperCase()
                    }
                </Avatar>
            </div>
            <div className={"discussion-body"}>
                <h1 className={"discussion-title"}>{topicText}</h1>
                <p className={"discussion-content"}>{content}</p>
            </div>
            <div className={"discussion-comments"}>
                <UIComment/>
                <UIComment/>
                <UIComment/>
            </div>
            <div className={"discussion-topic-footer"}>
                <div className={"discussion-topic-footer-left"}></div>
                <div className={"discussion-topic-footer-right"}></div>
            </div>
        </div>
    )
}