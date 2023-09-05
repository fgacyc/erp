import UIBreadcrumb from '../../../components/UIBreadcrumb/index.jsx';
import EducationVideoComponent from './EducationVideoComponent.jsx';
import './educationVideo.css';
const EducationVideos = () => {

    const arr = [1,2,3];

	const breadcrumbItems = [
		{
			name: 'Education',
			link: '/',
			clickable: false,
		},
		{
			name: 'Videos',
			link: '/education/videos',
			clickable: true,
		},
	];

	return (
		<>
			<UIBreadcrumb items={breadcrumbItems} />
			<div className="app-component full-screen-app-component p-5">
				<div
					style={{
						margin: '20px 20px 0 20px',
						fontSize: 26,
						fontWeight: 'bold',
					}}
				>
					Educational videos
				</div>
                {
                    arr.map((a, index) => (
                        <span className='m-5' key={index + a}>
                        {/* <EducationVideoComponent /> */}
                        </span>
                    ))
                }   
            </div>
		</>
	);
};

export default EducationVideos;
