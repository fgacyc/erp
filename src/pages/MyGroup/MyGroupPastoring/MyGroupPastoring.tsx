import UIBreadcrumb from '@/components/UIBreadcrumb';

const MyGroupPastoring = () => {
	const breadcrumbItems = [
		{
			name: 'My Group',
			link: '/',
			clickable: false,
		},
		{
			name: 'Pastoring',
			link: '/group/pastoring',
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
					MyGroupPastoring
				</div>
			</div>
		</>
	);
};

export default MyGroupPastoring;
