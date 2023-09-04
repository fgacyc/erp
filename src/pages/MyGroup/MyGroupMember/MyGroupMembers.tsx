import UIBreadcrumb from "@/components/UIBreadcrumb";

const MyGroupMembers = () => {
	const breadcrumbItems = [
		{
			name: "My Group",
			link: "/",
			clickable: false,
		},
		{
			name: "Member",
			link: "/group/member",
			clickable: true,
		},
	];

	return (
		<>
			<UIBreadcrumb items={breadcrumbItems} />
			<div className="app-component full-screen-app-component">
				<div
					style={{
						margin: "20px 20px 0 20px",
						fontSize: 26,
						fontWeight: "bold",
					}}
				>
					MyGroupMembers
				</div>
			</div>
		</>
	);
};

export default MyGroupMembers;
