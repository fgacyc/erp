import UI_Breadcrumb from "../../components/UI_Breadcrumb/UI_Breadcrumb.jsx";

export const UsheringDashboard = () => {
	const breadcrumbItems = [
		{
			name: "Ushering",
			link: "/",
			clickable: false
		},
		{
			name: "Dashboard",
			link: "/ushering/dashboard",
			clickable: true
		}
	]


	return (
		<>
			<UI_Breadcrumb items={breadcrumbItems}/>
			<div className="app-component full-screen-app-component">
				<div style={{margin:"20px 20px 0 20px", fontSize:26,fontWeight:"bold"}}>UsheringDashboard</div>
			</div>
		</>
	)
};
