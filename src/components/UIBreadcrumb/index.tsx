import { Breadcrumb } from "@arco-design/web-react";
import { IconHome } from "@arco-design/web-react/icon";
import "./UI_Breadcrumb.css";
import { FunctionComponent, useEffect, useState } from "react";
import { CountdownTimer } from "@/pages/Recruitment/InterviewPage/Interview_form";
import { ifShowTimer } from "./data";
import { useLocation } from "react-router-dom";

interface BreadcrumbProps {
	items: BreadcrumbLinks[];
}
const UIBreadcrumb: FunctionComponent<BreadcrumbProps> = () => {
	const location = useLocation();
	console.log(location);
	const [ifShowTimerInBar, setIfShowTimerInBar] = useState(false);

	useEffect(() => {
		function setTimer() {
			ifShowTimer().then((res) => {
				//console.log(res)
				setIfShowTimerInBar(res);
			});
		}
		setTimer();
	}, []);

	// function goToDocs() {
	// 	window.open(
	// 		"https://drive.google.com/drive/folders/14sulRff83Fq2i_GnP1kGPZ3DLDyZSyb2?usp=sharing",
	// 		"_blank",
	// 	);
	// }

	return (
		<div className="breadcrumb-con">
			<div className="breadcrumb-con-left">
				<Breadcrumb style={{ marginTop: 10 }}>
					<Breadcrumb.Item href="/">
						<IconHome style={{ fontSize: "16px" }} />
					</Breadcrumb.Item>
					{location.pathname.split("/").map(
						(item, index) =>
							item && (
								<Breadcrumb.Item key={index} href={`/${item}`}>
									{item}
								</Breadcrumb.Item>
							),
					)}
				</Breadcrumb>
				{/* <div className="breadcrumb-icon-file-con">
					<Popover
						trigger="hover"
						position="right"
						content={
							<span>
								<div>Go to docs</div>
							</span>
						}
					>
						<IconFile className="breadcrumb-icon-file" onClick={goToDocs} />
					</Popover>
				</div> */}
			</div>
			<div className="breadcrumb-con-right">
				{ifShowTimerInBar && <CountdownTimer />}
			</div>
		</div>
	);
};
export default UIBreadcrumb;
