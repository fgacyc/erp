import { Button, Result } from '@arco-design/web-react';
import PubSub from 'pubsub-js';
import { Dispatch, FunctionComponent, SetStateAction } from 'react';

interface SubmitResultsProps {
	setIfSubmit: Dispatch<SetStateAction<boolean>>;
	ifSubmitSuccess: boolean;
	resultMessage: string;
	setShowLoading: Dispatch<SetStateAction<boolean>>;
}

export const SubmitResults: FunctionComponent<SubmitResultsProps> = ({
	setIfSubmit,
	ifSubmitSuccess,
	resultMessage,
	setShowLoading,
}) => {
	function tryAgain() {
		PubSub.publish('reset_recruitment_add_candidate', { message: 'reset' });
	}

	function back() {
		setIfSubmit(false);
		setShowLoading(false);
	}

	return (
		<div>
			{ifSubmitSuccess ? (
				<Result
					status="success"
					title={resultMessage}
					extra={[
						<Button
							key="again"
							type="secondary"
							onClick={tryAgain}
							style={{ margin: '0 16px' }}
						>
							Add another
						</Button>,
						<Button key="back" type="primary" onClick={back}>
							Back
						</Button>,
					]}
				/>
			) : (
				<Result
					status="error"
					title={resultMessage}
					extra={[
						<Button
							key="again"
							type="secondary"
							style={{ margin: '0 16px' }}
							onClick={tryAgain}
						>
							Try again
						</Button>,
						<Button key="back" type="primary" onClick={back}>
							Back
						</Button>,
					]}
				/>
			)}
		</div>
	);
};
