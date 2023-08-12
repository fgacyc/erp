import { Space, Button } from '@arco-design/web-react';
import { Dispatch, FunctionComponent, SetStateAction } from 'react';

interface ButtonGroupProps {
	currentActive: number;
	setCurrentActive: Dispatch<SetStateAction<number>>;
}

export const ButtonGroup: FunctionComponent<ButtonGroupProps> = ({
	currentActive,
	setCurrentActive,
}) => {
	return (
		<>
			<Space>
				{currentActive === 0 ? (
					<Button shape="round" type="secondary">
						All
					</Button>
				) : (
					<Button
						shape="round"
						type="text"
						style={{ color: 'black' }}
						onClick={() => setCurrentActive(0)}
					>
						All
					</Button>
				)}
				{currentActive === 1 ? (
					<Button shape="round" type="secondary">
						In progress
					</Button>
				) : (
					<Button
						shape="round"
						type="text"
						style={{ color: 'black' }}
						onClick={() => setCurrentActive(1)}
					>
						In progress
					</Button>
				)}
				{currentActive === 2 ? (
					<Button shape="round" type="secondary">
						Finished
					</Button>
				) : (
					<Button
						shape="round"
						type="text"
						style={{ color: 'black' }}
						onClick={() => setCurrentActive(2)}
					>
						Finished
					</Button>
				)}
			</Space>
		</>
	);
};
