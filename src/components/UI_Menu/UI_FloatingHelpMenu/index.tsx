import { useState } from "react";
import { Menu, Trigger } from "@arco-design/web-react";
import {
	IconClose,
	IconBug,
	IconBulb,
	IconQuestion,
	IconFile,
	IconCompass,
} from "@arco-design/web-react/icon";
import "./UI_FloatingHelpMenu.css";
import GithubReportModal from "@/components/UI_Modal/UI_GithubReportModal";

const UIFloatingHelpMenu = () => {
	const [bugModalVisible, setBugModalVisible] = useState(false);
	const [ideaModalVisible, setIdeaModalVisible] = useState(false);

	function onClickMenuItem(key: string) {
		if (key === "1") {
			console.log("bug");
			setBugModalVisible(true);
		} else if (key === "2") {
			console.log("idea");
			setIdeaModalVisible(true);
			// sendAIssue().then((res) => {
			//     console.log(res);
			//
			// });
		} else if (key === "3") {
			window.open(
				"https://drive.google.com/drive/folders/14sulRff83Fq2i_GnP1kGPZ3DLDyZSyb2?usp=sharing",
				"_blank",
			);
		} else if (key === "4") {
			window.open(
				"https://github.com/users/yuenci/projects/8/views/1",
				"_blank",
			);
		}
	}

	const renderMenu = () => {
		return (
			<Menu
				mode="popButton"
				tooltipProps={{ position: "left" }}
				hasCollapseButton
				onClickMenuItem={onClickMenuItem}
			>
				<Menu.Item key="1">
					<IconBug />
					Bugs
				</Menu.Item>
				<Menu.Item key="2">
					<IconBulb />
					Ideas
				</Menu.Item>
				<Menu.Item key="3">
					<IconFile />
					Tutorial
				</Menu.Item>
				<Menu.Item key={"4"}>
					<IconCompass />
					Progress
				</Menu.Item>
			</Menu>
		);
	};
	const [popupVisible, setPopupVisible] = useState(false);
	return (
		<>
			<Trigger
				className="floating-menu-trigger"
				popup={renderMenu}
				trigger={["click", "hover"]}
				clickToClose
				position="top"
				onVisibleChange={(v) => setPopupVisible(v)}
			>
				<div
					className={`button-trigger ${
						popupVisible ? "button-trigger-active" : ""
					}`}
				>
					{popupVisible ? (
						<IconClose style={{ fontSize: 18 }} />
					) : (
						<IconQuestion style={{ fontSize: 18 }} />
					)}
				</div>
			</Trigger>
			<GithubReportModal
				type="bug"
				visible={bugModalVisible}
				setVisible={setBugModalVisible}
			/>
			<GithubReportModal
				type="enhancement"
				visible={ideaModalVisible}
				setVisible={setIdeaModalVisible}
			/>
		</>
	);
};
export default UIFloatingHelpMenu;
