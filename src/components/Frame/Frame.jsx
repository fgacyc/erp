import {Avatar, Menu} from '@arco-design/web-react';
import {IconApps, IconBug, IconBulb, IconUser, IconUserAdd} from '@arco-design/web-react/icon';
import "./Frame.css"
import StatusContainer from "../../StatusContainer.js";
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
const MenuItemGroup = Menu.ItemGroup;
const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;

import Dashboard from "../Dashboard/Dashboard.jsx";
import Members from "../Members/Members.jsx";
import Attendance from "../Attendance/Attendance.jsx";
import Recruitment_Submission from "../../pages/Recruitment/SubmissionPage/Recruitment_Submission.jsx";
import {login} from "../../tools/auth.js";

export default  function  Frame(){
    const [functionArea, setFunctionArea ] = useState( <Dashboard/> );
    const [user, setUser] = useState(null);
    const navigate = useNavigate();




    function onClickMenuItem(key) {
        // console.log(key);
        navigate("/" + key);
    }

    const path = useLocation().pathname;
    useEffect(() => {
        let account = JSON.parse(localStorage.getItem("cyc-acc"));
        if(account === null) {
            navigate("/login");
            return;
        }else{
            login(account[0],account[1]).then((res)=>{
                if(res.status){
                    //console.log(res.result);
                    setUser(res.result);
                }else{
                    navigate("/login");
                }
            })
        }
        console.log(path);
        if(path === "/dashboard") setFunctionArea(<Dashboard/>);
        else if(path === "/members") setFunctionArea(<Members/>);
        else if(path === "/attendance") setFunctionArea(<Attendance/>);
        else if (path === "/recruitment_add_recruiter") setFunctionArea(<Recruitment_Submission/>);
    }, [path]);



    return (
        <div className={"container"}>
            <div className='menu-demo'>
                <Menu mode='horizontal' defaultSelectedKeys={['1']} className={"top-menu"}>
                    <MenuItem
                        key='0'
                        style={{ padding: 0, marginRight: 38, }}
                        disabled
                    >
                        <div
                            style={{
                                width: 80,
                                height: 30,
                            }}
                        >
                            <img src={"CYC_Logo_black_x120.png"} alt={"logo"}
                                 style={{
                                     width: 80,
                                     height: 30,
                                 }}
                            />
                        </div>
                    </MenuItem>
                    <MenuItem key='1'>Home</MenuItem>
                    <MenuItem key='2'>Solution</MenuItem>
                    <MenuItem key='3'>Cloud Service</MenuItem>
                    <MenuItem key='4'>Cooperation</MenuItem>
                    <MenuItem key='5' className={"avatar"}>
                        <Avatar style={{ backgroundColor: '#3370ff' }}>
                            {
                                user === null ? "" : user.full_name.charAt(0).toUpperCase()
                            }
                        </Avatar>
                    </MenuItem>
                </Menu>
            </div>
            <div className='menu-lower'>
                <div className='menu-side'>
                    <Menu onClickMenuItem={onClickMenuItem}
                        style={{ width: 200, height: '100%' }}
                        hasCollapseButton
                        defaultOpenKeys={['0']}
                        defaultSelectedKeys={['0_1']}
                    >
                        <SubMenu
                            key='0'
                            title={
                                <>
                                    <IconApps /> Member
                                </>
                            }
                        >
                            <MenuItem key='dashboard' >Dashboard</MenuItem>
                            <MenuItem key='members'>Members</MenuItem>
                            <MenuItem key='attendance'>Attendance</MenuItem>
                        </SubMenu>
                        <SubMenu
                            key='1'
                            title={
                                <>
                                    <IconBug /> Navigation 2
                                </>
                            }
                        >
                            <MenuItem key='1_0'>Menu 1</MenuItem>
                            <MenuItem key='1_1'>Menu 2</MenuItem>
                            <MenuItem key='1_2'>Menu 3</MenuItem>
                        </SubMenu>
                        <SubMenu
                            key='2'
                            title={
                                <>
                                    <IconBulb /> Navigation 3
                                </>
                            }
                        >
                            <MenuItemGroup key='2_0' title='Menu Group 1'>
                                <MenuItem key='2_0_0'>Menu 1</MenuItem>
                                <MenuItem key='2_0_1'>Menu 2</MenuItem>
                            </MenuItemGroup>
                            <MenuItemGroup key='2_1' title='Menu Group 1'>
                                <MenuItem key='2_1_0'>Menu 3</MenuItem>
                                <MenuItem key='2_1_1'>Menu 4</MenuItem>
                            </MenuItemGroup>
                        </SubMenu>
                        <SubMenu
                            key='3'
                            title={
                                <>
                                    <IconUserAdd /> Recruitment
                                </>
                            }
                        >
                            <MenuItem key='recruitment_dashboard'>Dashboard</MenuItem>
                            <MenuItem key='recruitment_add_recruiter'>Add Recruiter</MenuItem>
                            <MenuItem key='recruitment_pre_screening'>Pre-screening</MenuItem>
                            <MenuItem key='recruitment_interview'>Interview</MenuItem>
                            <MenuItem key='recruitment_evaluation'>Evaluation</MenuItem>
                            <MenuItem key='recruitment_offer'>Offer</MenuItem>
                        </SubMenu>
                    </Menu>
                </div>
                <div className='function-area'>
                    {functionArea}
                </div>
            </div>
        </div>
    );
}