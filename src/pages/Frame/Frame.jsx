import { Menu} from '@arco-design/web-react';
import {IconUserAdd} from '@arco-design/web-react/icon';
import "./Frame.css"
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {getUserNameFromUserData, login} from "../../tools/auth.js";
import {AvatarMenu} from "../AvatarMenu/AvatarMenu.jsx";

// const MenuItemGroup = Menu.ItemGroup;
const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;

export default  function  Frame(){
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState(null);
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
        }else{
            login(account[0],account[1]).then((res)=>{
                if(res.status){
                    setUser(res.data);
                    setUsername(getUserNameFromUserData(res))
                    console.log(getUserNameFromUserData(res))
                }else{
                    navigate("/login");
                }
            })
        }
    }, [path]);



    return (
        <div className={"container"}>
            <div className='menu-demo'>
                <Menu mode='horizontal' defaultSelectedKeys={['1']} className={"top-menu"}  >
                    <MenuItem
                        key='0'
                        style={{ padding: 0, marginRight: 38, }}
                    >
                        <div
                            style={{
                                width: 80,
                                height: 30,
                            }}
                        >
                            <img src={"/CYC_Logo_black_x120.png"} alt={"logo"}
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
                    <AvatarMenu username={username}/>
                </Menu>
            </div>
            <div className='menu-lower'>
                <div className='menu-side'>
                    <Menu onClickMenuItem={onClickMenuItem}
                        style={{ width: 200, height: '100%' }}
                        hasCollapseButton
                        // defaultOpenKeys={['3']}
                        autoOpen
                        defaultSelectedKeys={['0_1']}
                    >
                    {/*    <SubMenu*/}
                    {/*        key='0'*/}
                    {/*        title={*/}
                    {/*            <>*/}
                    {/*                <IconApps /> Member*/}
                    {/*            </>*/}
                    {/*        }*/}
                    {/*    >*/}
                    {/*        <MenuItem key='dashboard' >Dashboard</MenuItem>*/}
                    {/*        <MenuItem key='members'>Members</MenuItem>*/}
                    {/*        <MenuItem key='attendance'>Attendance</MenuItem>*/}
                    {/*    </SubMenu>*/}
                    {/*    <SubMenu*/}
                    {/*        key='1'*/}
                    {/*        title={*/}
                    {/*            <>*/}
                    {/*                <IconBug /> Navigation 2*/}
                    {/*            </>*/}
                    {/*        }*/}
                    {/*    >*/}
                    {/*        <MenuItem key='1_0'>Menu 1</MenuItem>*/}
                    {/*        <MenuItem key='1_1'>Menu 2</MenuItem>*/}
                    {/*        <MenuItem key='1_2'>Menu 3</MenuItem>*/}
                    {/*    </SubMenu>*/}
                    {/*    <SubMenu*/}
                    {/*        key='2'*/}
                    {/*        title={*/}
                    {/*            <>*/}
                    {/*                <IconBulb /> Navigation 3*/}
                    {/*            </>*/}
                    {/*        }*/}
                    {/*    >*/}
                    {/*        <MenuItemGroup key='2_0' title='Menu Group 1'>*/}
                    {/*            <MenuItem key='2_0_0'>Menu 1</MenuItem>*/}
                    {/*            <MenuItem key='2_0_1'>Menu 2</MenuItem>*/}
                    {/*        </MenuItemGroup>*/}
                    {/*        <MenuItemGroup key='2_1' title='Menu Group 1'>*/}
                    {/*            <MenuItem key='2_1_0'>Menu 3</MenuItem>*/}
                    {/*            <MenuItem key='2_1_1'>Menu 4</MenuItem>*/}
                    {/*        </MenuItemGroup>*/}
                    {/*    </SubMenu>*/}
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
                            <MenuItem key='recruitment_pre_appointment' disabled>Appointment</MenuItem>
                            <MenuItem key='recruitment_interview' disabled>Interview</MenuItem>
                            <MenuItem key='recruitment_evaluation' disabled>Evaluation</MenuItem>
                            <MenuItem key='recruitment_offer' disabled>Offer</MenuItem>
                        </SubMenu>
                    </Menu>
                </div>
                <div className='function-area'>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}