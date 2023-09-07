import {
	IconThunderbolt,
	IconUserAdd,
	IconMenuFold,
	IconMenuUnfold,
	IconUserGroup,
} from "@arco-design/web-react/icon";
import "./Frame.css";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu } from "@arco-design/web-react";
import HeadBarBtns from "@/components/UI_Menu/UI_HeaderBarMenu";
import UIFloatingHelpMenu from "@/components/UI_Menu/UI_FloatingHelpMenu";
// import { useSettingModalStore } from '@/components/UI_Modal/UI_SettingModal/settingModalStore';
import { LuGraduationCap } from "react-icons/lu";
import { FaPeopleGroup } from "react-icons/fa6";
import { BiHomeSmile } from "react-icons/bi";
import { useAuth0 } from "@auth0/auth0-react";
import { useAccount } from "@/store/useAccount";
import { ProfileForm } from "@/components/Form/Profile";

const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;

const Frame = () => {
	// const staff = useSettingModalStore((state) => state.staff);
	const navigate = useNavigate();

	const { user: auth0User } = useAuth0();
	const { user } = useAccount();

	const [tabs] = useState({
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
		navigate("/" + key);
	}
	useEffect(() => {
		window.addEventListener("resize", () => {
			const vWidth = window.innerWidth;

			if (vWidth < 640) {
				setCollapse(true);
			} else setCollapse(false);

			return () => {
				window.removeEventListener("resize", () => {
					const vWidth = window.innerWidth;

					if (vWidth < 640) {
						setCollapse(true);
					} else setCollapse(false);
				});
			};
		});
	}, []);

	const [newUser, setNewUser] = useState(false);

	useEffect(() => {
		if (user.icNumber) return;
		setNewUser(true);
	}, [user.icNumber]);

	return (
		<>
			<ProfileForm visible={newUser} setVisible={setNewUser} user={user} />

			<div className="menu-demo">
				<Menu
					mode="horizontal"
					defaultSelectedKeys={["1"]}
					className={"top-menu"}
				>
					<MenuItem
						key="0"
						className="no-hover"
						style={{ padding: 0, marginLeft: 0, marginRight: 38 }}
					>
						<img
							src={
								import.meta.env["VITE_NODE_ENV"] === "development"
									? "/cyc-plain-dev.png"
									: "/CYC_Logo_black_x120.png"
							}
							alt={"logo"}
							className="head-menu-logo"
						/>
					</MenuItem>
					<MenuItem key="1">Home</MenuItem>
					<MenuItem key="2">Solution</MenuItem>
					<MenuItem key="3">Service</MenuItem>
					<MenuItem key="4">Cooperation</MenuItem>
					{auth0User && <HeadBarBtns />}
				</Menu>
			</div>
			<div className="menu-lower">
				<div className="menu-side">
					<Menu
						onClickMenuItem={onClickMenuItem}
						style={{ width: 200, height: "100%" }}
						// hasCollapseButton
						mode="vertical"
						// defaultOpenKeys={['3']}
						// autoOpen
						collapse={collapse}
						defaultSelectedKeys={["0_1"]}
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
							<MenuItem key="users/satellites">Satellites</MenuItem>

							<MenuItem key="users/ministry">Ministry</MenuItem>

							<SubMenu key="2.1" title="Pastoral">
								<MenuItem key="users/pastoral">Members</MenuItem>
								<MenuItem key="users/pastoral/cg">Cell Groups</MenuItem>
								<MenuItem key="users/pastoral/roles">Roles</MenuItem>
							</SubMenu>
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
									<LuGraduationCap className="arco-icon" />
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
									<BiHomeSmile className="arco-icon" />
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
		</>
	);
};

export default Frame;
