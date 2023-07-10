import {Avatar, Comment, List} from "@arco-design/web-react";
// import {getAccAndPsw} from "../../../tools/auth.js";
import {useEffect, useState} from "react";
import {getReq} from "../../../tools/requests.js";

function PreScreeningComment({item}){
    let [username, setUsername] = useState("");

    function setCommentUserName(data){
        if(data.username === null){
            setUsername(data.full_name)
        }else{
            setUsername(data.username)
        }
    }

    useEffect(()=>{
        let router = `/auth/names?CYC_ID=${item.CYC_ID}`;
        // let [acc, psw] = getAccAndPsw();
        // if(acc === item.CYC_ID) {
        //     getCurrentUser().then((res) => {
        //         setCommentUserName(getUserNameFromUserData1(res))
        //         return;
        //     })
        // }
        getReq(router).then((res)=>{
             //console.log(res)
            if(res.status){
                setCommentUserName(res.data)
            }
        })

    },[])


    return(
        <Comment
            align='right'
            // author={item.CYC_ID === getAccAndPsw()[0] ? "You" : username}
            author={username}
            avatar={
                <Avatar style={{ backgroundColor: '#14a9f8' }}>{username.charAt(0).toUpperCase()}</Avatar>
            }
            // content={JSON.stringify(item)}
            content={item.comment}
            datetime={new Date(item.timestamp * 1000).toLocaleString()}
        />
    )
}

export default  function PreScreeningCommentsList({userDatas}){
    return (
        <List
            bordered={false}
            header={<span>{userDatas.pre_screening.comments.length} comments</span>}
        >
            {userDatas.pre_screening.comments
                .slice()
                .reverse()
                .map((item, index) => {
                    return (
                        <List.Item key={index}>
                            <PreScreeningComment item={item}/>
                        </List.Item>
                    );
                })}
        </List>
    )
}