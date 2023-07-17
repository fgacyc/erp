import {Avatar, Comment, List,Dropdown, Menu} from "@arco-design/web-react";
import {useEffect, useState} from "react";
import {deleteReq, getReq} from "../../../tools/requests.js";
import { IconMore} from "@arco-design/web-react/icon";
import "./pre-screening.css";
import PubSub from 'pubsub-js';

function MenuEvent(key,id,RID){
    // console.log(key,id,RID)

    if(key === '1'){
        console.log("edit")
    }
    else if (key === '2'){
        console.log("delete")
        deleteReq(`/comments/${RID}?commentID=${id}`).then((res)=>{
            // console.log(res)
            if(res.status){
                PubSub.publish('deleteComment', { message: id });
            }
        })
    }else{
        console.log("cancel")
    }
}



export function PreScreeningComment({item,id,RID}){
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
            author={username}
            avatar={
                <Avatar style={{ backgroundColor: '#14a9f8' }}>{username.charAt(0).toUpperCase()}</Avatar>
            }
            content={item.comment}
            datetime={new Date(item.timestamp * 1000).toLocaleString()}
            actions={
                <Dropdown droplist={
                    <Menu onClickMenuItem={(key)=>MenuEvent(key,id,RID)}>
                        <Menu.Item key='1'>Edit</Menu.Item>
                        <Menu.Item key='2'>Delete</Menu.Item>
                    </Menu>
                } position='bl' trigger='click' >
                    <span className='custom-comment-action'>
                     <IconMore />
                    </span>
                </Dropdown>
            }
        />
    )
}

export default  function PreScreeningCommentsList({userDatas,setUserDatas}){
    let comments= userDatas.pre_screening.comments
    let RID = userDatas._id

    useEffect(() => {
        const subscription = PubSub.subscribe('deleteComment', (msg, data) => {
            let id =data.message;
            comments.splice(id,1);
            //console.log(newComments)
            setUserDatas({...userDatas,pre_screening:{...userDatas.pre_screening,comments:comments}})
        });

        return () => PubSub.unsubscribe(subscription);
    }, []);

    return (
        <div>
            <List
                bordered={false}
                header={<span>{comments.length} comments</span>}
            >
                {comments.map((item, index) => {
                        return (
                            <List.Item key={index} >
                                <PreScreeningComment item={item} id={index} RID={RID}/>
                            </List.Item>
                        );
                    })}
            </List>
            <div id="comment-list-bottom"></div>
        </div>
    )
}