import { Avatar, Dropdown, Menu } from "@arco-design/web-react";
import "./avatarMenu.css";
//import UI_Avatar from "../../UI_Avatar.jsx";
import PubSub from "pubsub-js";
import { useAuth0 } from "@auth0/auth0-react";
import { useAccount } from "@/store/useAccount";

const AvatarMenu = () => {
	const { logout } = useAuth0();
	const { user, clearStore } = useAccount();

	// console.log(user);

	function handleMenuClick(key: string) {
		if (key === "1") {
			//goToProfile();
			PubSub.publish("switchTab", { tabNum: 0 });
		} else if (key === "2") {
			//navigate("/settings")
			PubSub.publish("switchTab", { tabNum: 2 });
		} else if (key === "3") {
			logout();
			clearStore();
		}
	}

	const dropList = (
		<Menu onClickMenuItem={handleMenuClick}>
			<Menu.Item key="1">Account</Menu.Item>
			<Menu.Item key="2">Settings</Menu.Item>
			<Menu.Item key="3" onClick={() => logout()}>
				Log out
			</Menu.Item>
		</Menu>
	);

	return (
		<Dropdown droplist={dropList} position="bl" trigger="click">
			{user?.avatarUrl && (
				<Avatar style={{ backgroundColor: "#ffffff" }} className="avatar">
					<img
						src={user?.avatarUrl}
						alt="avatar"
						style={{ width: 40, height: 40 }}
					/>
				</Avatar>
			)}
		</Dropdown>
	);
};

export default AvatarMenu;
