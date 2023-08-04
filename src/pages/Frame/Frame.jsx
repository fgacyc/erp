import { Menu} from '@arco-design/web-react';
import {IconThunderbolt, IconUserAdd, IconUserGroup} from '@arco-design/web-react/icon';
import "./Frame.css"
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;
import {getLoginStatus, ifStaffInfoLocalExist} from "../../tools/auth.js";
import HeadBarBtns from "../../components/UI_Menu/UI_HeaderBarMenu/HeadBarBtns.jsx";
import UI_FloatingHelpMenu from "../../components/UI_Menu/UI_FloatingHelpMenu/UI_FloatingHelpMenu.jsx";
import {menuPermission} from "./AuthorityDetection.js";
import {useSettingModalStore} from "../../components/UI_Modal/UI_SettingModal/settingModalStore.js";
import {FaChalkboardTeacher} from "react-icons/fa";
import {LuGraduationCap} from "react-icons/lu";


export default  function  Frame(){
    const  staff = useSettingModalStore(state => state.staff)
    const initStaff = useSettingModalStore(state => state.initStaff)
    const navigate = useNavigate();
    const [tabs, setTabs] = useState(null);

    const path = useLocation().pathname;
    // console.log(path)

    useEffect( () => {
        checkLogin();
        menuPermission().then((res) => {
            setTabs(res);
        });
    }, []);

    async function checkLogin(){
        let StaffInfoLocalExist = await ifStaffInfoLocalExist();
        let loginStatus = await getLoginStatus();
        // console.log(StaffInfoLocalExist, loginStatus)
        if (!StaffInfoLocalExist || !loginStatus) {
            navigate("/login")
        }
        else{ // login success
            initStaff().then(()=>{
                path === "/" && navigate("/recruitment_dashboard")
            })
            //navigate("/recruitment_dashboard")
            //navigate("/recruitment_interview")
            //navigate("/recruitment_pre_screening")
        }
    }

    function onClickMenuItem(key) {
        // console.log(key);
        navigate("/" + key);
    }


    return (
        <div className={"container"}>
            <div className='menu-demo'>
                <Menu mode='horizontal' defaultSelectedKeys={['1']} className={"top-menu"}  >
                    <MenuItem
                        key='0'
                        style={{ padding: 0, marginLeft:0,marginRight: 38, }}
                    >
                        <div className="head-menu-logo-con">
                            <img src={"/CYC_Logo_black_x120.png"} alt={"logo"} className="head-menu-logo"/>
                        </div>
                    </MenuItem>
                    <MenuItem key='1'>Home</MenuItem>
                    <MenuItem key='2'>Solution</MenuItem>
                    <MenuItem key='3'>Service</MenuItem>
                    <MenuItem key='4'>Cooperation</MenuItem>
                    {staff &&  <HeadBarBtns/>}
                </Menu>
            </div>
            <div className='menu-lower'>
                <div className='menu-side'>
                    <Menu onClickMenuItem={onClickMenuItem}
                        style={{ width: 220, height: '100%' }}
                        hasCollapseButton
                        // defaultOpenKeys={['3']}
                        autoOpen
                        defaultSelectedKeys={['0_1']}
                    >
                        <SubMenu
                            key='1'
                            title={<><IconUserAdd />Recruitment</>}
                        >
                            <MenuItem key='recruitment_dashboard'>Dashboard</MenuItem>
                            <MenuItem key='recruitment_add_candidate'>Add Candidate</MenuItem>
                            { tabs && tabs.recruitment_pre_screening &&
                                <MenuItem key='recruitment_pre_screening'>Pre-screening</MenuItem>
                            }
                            { tabs && tabs.recruitment_interview &&
                                <MenuItem key='recruitment_interview'>Interview</MenuItem>
                            }
                            { tabs && tabs.recruitment_evaluation &&
                                <MenuItem key='recruitment_evaluation'>Evaluation</MenuItem>
                            }
                        </SubMenu>
                        <SubMenu
                            key='2'
                            title={<><IconUserGroup />Users</>}
                        >
                            <MenuItem key='users/ministry'>Ministry</MenuItem>
                            <MenuItem key='users/pastoral'>Pastoral</MenuItem>
                        </SubMenu>
                        <SubMenu
                            key='3'
                            title={<><IconThunderbolt />Events</>}
                        >
                            <MenuItem key='events/camp'>Camp</MenuItem>
                            <MenuItem key='events/conference'>Conference</MenuItem>
                            <MenuItem key='events/evangelism'>Evangelism</MenuItem>
                        </SubMenu>
                        <SubMenu
                            key='4'
                            title={<><LuGraduationCap
                                style={{marginRight:16}}
                            />Education</>}
                        >
                            <MenuItem key='education/dashboard'>Dashboard</MenuItem>
                            <MenuItem key='education/student'>Student</MenuItem>
                        </SubMenu>
                    </Menu>
                </div>
                <div className='function-area'>
                    <Outlet />
                </div>
            </div>
            <UI_FloatingHelpMenu/>
        </div>
    );
}