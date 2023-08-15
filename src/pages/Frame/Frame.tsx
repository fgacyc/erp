import {
	IconThunderbolt,
	IconUserAdd,
	IconMenuFold,
	IconMenuUnfold,
	IconUserGroup,
} from '@arco-design/web-react/icon';
import './Frame.css';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Menu } from '@arco-design/web-react';
const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;
import { getLoginStatus, ifStaffInfoLocalExist } from '@/tools/auth';
import HeadBarBtns from '@/components/UI_Menu/UI_HeaderBarMenu/';
import UIFloatingHelpMenu from '@/components/UI_Menu/UI_FloatingHelpMenu';
import { menuPermission } from './AuthorityDetection';
import { useSettingModalStore } from '@/components/UI_Modal/UI_SettingModal/settingModalStore';
import { LuGraduationCap } from 'react-icons/lu';
import { FaPeopleGroup } from 'react-icons/fa6';
import { BiHomeSmile } from 'react-icons/bi';

const Frame = () => {
	const path = useLocation().pathname;
	// console.log(path)

	const staff = useSettingModalStore((state) => state.staff);
	const initStaff = useSettingModalStore((state) => state.initStaff);

	const navigate = useNavigate();

	useEffect(() => {
		async function checkLogin() {
			const StaffInfoLocalExist = await ifStaffInfoLocalExist();
			const loginStatus = await getLoginStatus();
			// console.log(StaffInfoLocalExist, loginStatus)
			if (!StaffInfoLocalExist || !loginStatus) {
				navigate('/login');
			} else {
				// login success
				initStaff().then(() => {
					path === '/' && navigate('/recruitment_dashboard');
				});
				//navigate("/recruitment_dashboard")
				//navigate("/recruitment_interview")
				//navigate("/recruitment_pre_screening")
			}
		}
		checkLogin();
		menuPermission().then((res) => {
			if (!res) return;
			setTabs(res);
		});
	}, [initStaff, navigate, path]);
	const [tabs, setTabs] = useState({
		recruitment_dashboard: false,
		recruitment_add_candidate: false,
		recruitment_pre_screening: false,
		recruitment_interview: false,
		recruitment_evaluation: false,
	});
	const [collapse, setCollapse] = useState(false);
	// console.log(path)

	function onClickMenuItem(key: string) {
		// console.log(key);
		navigate('/' + key);
	}
	useEffect(() => {
		window.addEventListener('resize', () => {
			const vWidth = window.innerWidth;

			if (vWidth < 640) {
				setCollapse(true);
			} else setCollapse(false);

			return () => {
				window.removeEventListener('resize', () => {
					const vWidth = window.innerWidth;

					if (vWidth < 640) {
						setCollapse(true);
					} else setCollapse(false);
				});
			};
		});
	}, []);

	return (
		<div>
			<div className="menu-demo">
				<Menu
					mode="horizontal"
					defaultSelectedKeys={['1']}
					className={'top-menu'}
				>
					<MenuItem
						key="0"
						className="no-hover"
						style={{ padding: 0, marginLeft: 0, marginRight: 38 }}
					>
						<img
							src={
								import.meta.env['VITE_NODE_ENV'] === 'development'
									? '/cyc-plain-dev.png'
									: '/CYC_Logo_black_x120.png'
							}
							alt={'logo'}
							className="head-menu-logo"
						/>
					</MenuItem>
					<MenuItem key="1">Home</MenuItem>
					<MenuItem key="2">Solution</MenuItem>
					<MenuItem key="3">Service</MenuItem>
					<MenuItem key="4">Cooperation</MenuItem>
					{staff && <HeadBarBtns />}
				</Menu>
			</div>
			<div className="menu-lower">
				<div className="menu-side">
					<Menu
						onClickMenuItem={onClickMenuItem}
						style={{ width: 200, height: '100%' }}
						// hasCollapseButton
						mode="vertical"
						// defaultOpenKeys={['3']}
						// autoOpen
						collapse={collapse}
						defaultSelectedKeys={['0_1']}
					>
						<SubMenu
							key="1"
							title={
								<>
									<IconUserAdd />
									Recruitment
								</>
							}
						>
							<MenuItem key="recruitment_dashboard">Dashboard</MenuItem>
							<MenuItem key="recruitment_add_candidate">Add Candidate</MenuItem>
							{tabs && tabs.recruitment_pre_screening && (
								<MenuItem key="recruitment_pre_screening">
									Pre-screening
								</MenuItem>
							)}
							{tabs && tabs.recruitment_interview && (
								<MenuItem key="recruitment_interview">Interview</MenuItem>
							)}
							{tabs && tabs.recruitment_evaluation && (
								<MenuItem key="recruitment_evaluation">Evaluation</MenuItem>
							)}
						</SubMenu>
						<SubMenu
							key="2"
							title={
								<>
									<IconUserGroup />
									Users
								</>
							}
						>
							<MenuItem key="users/dashboard">Dashboard</MenuItem>
							<MenuItem key="users/ministry">Ministry</MenuItem>
							<MenuItem key="users/pastoral">Pastoral</MenuItem>
						</SubMenu>
						<SubMenu
							key="3"
							title={
								<>
									<IconThunderbolt />
									Events
								</>
							}
						>
							<MenuItem key="events/camp">Camp</MenuItem>
							<MenuItem key="events/conference">Conference</MenuItem>
							<MenuItem key="events/evangelism">Evangelism</MenuItem>
						</SubMenu>
						<SubMenu
							key="4"
							title={
								<>
									<LuGraduationCap style={{ marginRight: 16 }} />
									Education
								</>
							}
						>
							<MenuItem key="education/dashboard">Dashboard</MenuItem>
							<MenuItem key="education/students">Students</MenuItem>
						</SubMenu>
						<SubMenu
							key="5"
							title={
								<>
									<FaPeopleGroup className="arco-icon" />
									Ushering
								</>
							}
						>
							<MenuItem key="ushering/dashboard">Dashboard</MenuItem>
							<MenuItem key="ushering/seats">Seats</MenuItem>
						</SubMenu>
						<SubMenu
							key="6"
							title={
								<>
									<BiHomeSmile style={{ marginRight: 16 }} />
									My group
								</>
							}
						>
							<MenuItem key="group/dashboard">Dashboard</MenuItem>
							<MenuItem key="group/members">Members</MenuItem>
							<MenuItem key="group/attendance">Attendance</MenuItem>
							<MenuItem key="group/pastoring">Pastoring</MenuItem>
						</SubMenu>
						<button
							onClick={() => setCollapse((state) => !state)}
							className="arco-menu-collapse-button"
						>
							{collapse ? <IconMenuUnfold /> : <IconMenuFold />}
						</button>
					</Menu>
				</div>
				<div className="function-area">
					<Outlet />
				</div>
			</div>
			<UIFloatingHelpMenu />
		</div>
	);
};

export default Frame;
