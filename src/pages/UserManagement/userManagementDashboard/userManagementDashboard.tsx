import UIBreadcrumb from '@/components/UIBreadcrumb';

const UserManagementDashboard = () => {
	const breadcrumbItems = [
		{
			name: 'Users',
			link: '/',
			clickable: false,
		},
		{
			name: 'Dashboard',
			link: '/users/dashboard',
			clickable: true,
		},
	];

	return (
		<>
			<UIBreadcrumb items={breadcrumbItems} />
			<div className="app-component full-screen-app-component">
				<div
					style={{
						margin: '20px 20px 0 20px',
						fontSize: 26,
						fontWeight: 'bold',
					}}
				>
					User Management
				</div>
			</div>
		</>
	);
};
export default UserManagementDashboard;
