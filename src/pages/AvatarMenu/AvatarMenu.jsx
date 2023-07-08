import {Avatar, Dropdown, Menu} from "@arco-design/web-react";
import "./avatarMenu.css"
import {useNavigate} from "react-router-dom";


export  function AvatarMenu({user}){
    const navigate = useNavigate();

    function logout(){
        localStorage.removeItem("cyc-acc");
        navigate("/login");
    }

    function  handleMenuClick(key){
        if (key === "1"){
            logout();
        }
    }

    const dropList = (
        <Menu onClickMenuItem={handleMenuClick} >
            <Menu.Item key='1'>Log out</Menu.Item>
        </Menu>
    );


    return (
            <Dropdown droplist={dropList} position='bl' trigger='click'>
                <Avatar style={{ backgroundColor: '#3370ff' }} className={"avatar"}>
                    {
                        user === null ? "" : user.full_name.charAt(0).toUpperCase()
                    }
                </Avatar>
            </Dropdown>
    );
}