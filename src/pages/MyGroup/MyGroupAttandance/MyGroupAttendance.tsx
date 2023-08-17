import UIBreadcrumb from '@/components/UIBreadcrumb';

const MyGroupAttendance = () => {
	const breadcrumbItems = [
		{
			name: 'My Group',
			link: '/',
			clickable: false,
		},
		{
			name: 'Attendance',
			link: '/group/attendance',
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
					MyGroupAttendance
				</div>
			</div>
		</>
	);
};

export default MyGroupAttendance;
