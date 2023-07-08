import {Avatar, Button, Input, InputTag, Message, Modal} from "@arco-design/web-react";
import "./Members.css";
import {IconEdit, IconUser} from "@arco-design/web-react/icon";
import {useState} from "react";
const TextArea = Input.TextArea;
import User from "../../ORM/User.js";

export  default  function AddMembersModal(props) {
    const {visible, setVisible} =  props
    const [avatar_url, setAvatarUrl] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [birthday, setBirthday] = useState('')
    const [gender, setGender] = useState('')
    const [skill, setSkill] = useState('')
    const [remarks, setRemarks] = useState('')

    const handleAddMember = () => {
        let newMember = new User(
            name,null,null,phone, avatar_url)
    }

     return  (
         <div>
             <Modal
                 title='Add new member'
                 visible={visible}
                 onOk={() => setVisible(false)}
                 okText={'Submit'}
                 cancelText={'Cancel'}
                 onCancel={() => setVisible(false)}
                 autoFocus={false}
                 focusLock={true}
             >
                 <div>
                     <div className={"input-group"}>
                         <div className={"input-text"}>Photo: </div>
                         <Avatar
                             triggerIcon={<IconEdit />}
                             onClick={() => Message.info('Upload...')}
                             style={{ backgroundColor: '#14C9C9' }}
                         >
                             <IconUser />
                         </Avatar>
                     </div>
                     <div className={"input-group"}>
                         <div className={"input-text"}>Name: </div>
                         <Input  allowClear placeholder='Please Enter member name' className={"input-com"} />
                     </div>
                     <div className={"input-group"}>
                         <div className={"input-text"}>Email: </div>
                         <Input  allowClear placeholder='Please Enter member email' className={"input-com"} />
                     </div>
                     <div className={"input-group"}>
                         <div className={"input-text"}>Phone: </div>
                         <Input  allowClear placeholder='Please Enter member phone' className={"input-com"} />
                     </div>
                     <div className={"input-group"}>
                         <div className={"input-text"}>Address: </div>
                         <Input  allowClear placeholder='Please Enter member address' className={"input-com"} />
                     </div>
                     <div className={"input-group"}>
                         <div className={"input-text"}>Birthday: </div>
                         <Input  allowClear placeholder='Please Enter member birthday' className={"input-com"} />
                     </div>
                     <div className={"input-group"}>
                         <div className={"input-text"}>Gender: </div>
                         <Input  allowClear placeholder='Please Enter member gender' className={"input-com"} />
                     </div>
                     <div className={"input-group"}>
                         <div className={"input-text"}>Skill: </div>
                         <InputTag
                             allowClear
                             placeholder='Input and press Enter'
                             className={"input-com"}
                         />
                     </div>
                     <div className={"input-group"}>
                         <div className={"input-text"}>Remarks: </div>
                         <TextArea
                             placeholder='Please enter ...'
                             autoSize={{ minRows: 4, maxRows: 10 }}
                             className={"input-com"}
                         />
                     </div>
                 </div>
             </Modal>
         </div>

    )
}