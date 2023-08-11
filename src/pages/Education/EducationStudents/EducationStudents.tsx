import UIBreadcrumb from '../../../components/UIBreadcrumb/index.jsx';

const EducationStudents = () => {
	const breadcrumbItems = [
		{
			name: 'Education',
			link: '/',
			clickable: false,
		},
		{
			name: 'Students',
			link: '/education/students',
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
					EducationStudents
				</div>
			</div>
		</>
	);
};

export default EducationStudents;
