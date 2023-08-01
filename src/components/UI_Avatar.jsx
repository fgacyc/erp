import { Avatar } from '@arco-design/web-react';

export default function UI_Avatar({ size, clickEvent, url, username }) {
	return (
		<>
			{url ? (
				<Avatar
					style={{ backgroundColor: '#ffffff' }}
					size={size}
					onClick={clickEvent}
				>
					<img src={url} alt="avatar" style={{ width: size, height: size }} />
				</Avatar>
			) : (
				<Avatar
					style={{ backgroundColor: '#3370ff' }}
					size={size}
					onClick={clickEvent}
				>
					{username && username[0].toUpperCase()}
				</Avatar>
			)}
		</>
	);
}
