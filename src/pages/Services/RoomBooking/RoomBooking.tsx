import UIBreadcrumb from '@/components/UIBreadcrumb';

const RoomBooking = () => {
	const breadcrumbItems = [
		{
			name: 'Services',
			link: '/services',
			clickable: true,
		},
		{
			name: 'Room Booking',
			link: '/services/room_booking',
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
					RoomBooking
				</div>
			</div>
		</>
	);
};

export default RoomBooking;
