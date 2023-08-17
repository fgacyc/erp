import { Avatar } from '@arco-design/web-react';
import { FunctionComponent } from 'react';

interface UIAvatarProps {
	size: number;
	clickEvent: () => void;
	url: string;
	username: string;
}

const UI_Avatar: FunctionComponent<UIAvatarProps> = ({
	size,
	clickEvent,
	url,
	username,
}) => {
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
					{username && username[0]?.toUpperCase()}
				</Avatar>
			)}
		</>
	);
};

export default UI_Avatar;
