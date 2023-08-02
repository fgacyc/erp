import { Button, Menu } from '@arco-design/web-react';
import {
	IconMenuFold,
	IconMenuUnfold,
	IconUserAdd,
} from '@arco-design/web-react/icon';
import './Frame.css';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;
import { getLoginStatus, ifStaffInfoLocalExist } from '../../tools/auth.js';
import HeadBarBtns from '../../components/UI_Menu/UI_HeaderBarMenu/HeadBarBtns.jsx';
import UI_FloatingHelpMenu from '../../components/UI_Menu/UI_FloatingHelpMenu/UI_FloatingHelpMenu.jsx';
import { menuPermission } from './AuthorityDetection.js';
import { useSettingModalStore } from '../../components/UI_Modal/UI_SettingModal/settingModalStore.js';
import { FaPeopleGroup } from 'react-icons/fa6';

export default function Frame() {
	const staff = useSettingModalStore((state) => state.staff);
	const initStaff = useSettingModalStore((state) => state.initStaff);
	const navigate = useNavigate();
	const [tabs, setTabs] = useState(null);
	const [collapse, setCollapse] = useState(false);
	const path = useLocation().pathname;
	// console.log(path)

	useEffect(() => {
		checkLogin();
		menuPermission().then((res) => {
			setTabs(res);
		});
	}, []);

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

	async function checkLogin() {
		let StaffInfoLocalExist = await ifStaffInfoLocalExist();
		let loginStatus = await getLoginStatus();
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

	function onClickMenuItem(key) {
		// console.log(key);
		navigate('/' + key);
	}

	return (
		<div className={'container'}>
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
							src={'/CYC_Logo_black_x120.png'}
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
							key="3"
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
							key="4"
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
			<UI_FloatingHelpMenu />
		</div>
	);
}
