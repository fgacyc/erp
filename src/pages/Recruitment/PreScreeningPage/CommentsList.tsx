import { Avatar, Comment, List, Dropdown, Menu } from '@arco-design/web-react';
import {
	Dispatch,
	FunctionComponent,
	SetStateAction,
	useEffect,
	useState,
} from 'react';
import { deleteReq, getReq } from '@/tools/requests';
import { IconMore } from '@arco-design/web-react/icon';
import './pre-screening.css';
import PubSub from 'pubsub-js';
import { getCurrentUserCYCID } from '@/tools/auth';

interface PreScreeningCommentProps {
	item: ClientComment;
	id?: number;
	RID?: string;
}

export const PreScreeningComment: FunctionComponent<
	PreScreeningCommentProps
> = ({ item, id, RID }) => {
	const [username, setUsername] = useState('');
	const [showDropdown, setShowDropdown] = useState(false);

	useEffect(() => {
		if (!item.CYC_ID) return;
		const router = `/auth/names?CYC_ID=${item.CYC_ID}`;
		getReq(router).then((res) => {
			if (res.status) setCommentUserName(res.data);
		});
		setShowDropdown(true);
	}, [item.CYC_ID]);

	function setCommentUserName(data: User) {
		if (data.username === null) {
			setUsername(data.full_name);
		} else {
			setUsername(data.username);
		}
	}

	return (
		<Comment
			align="right"
			author={username}
			avatar={
				<Avatar style={{ backgroundColor: '#14a9f8' }}>
					{username.charAt(0).toUpperCase()}
				</Avatar>
			}
			content={item.comment}
			datetime={new Date(item.timestamp * 1000).toLocaleString()}
			actions={
				showDropdown && (
					<Dropdown
						droplist={
							<Menu
								onClickMenuItem={(key) => menuEvent(key, id ?? 0, RID ?? '')}
							>
								{/*<Menu.Item key='1'>Edit</Menu.Item>*/}
								<Menu.Item key="2">Delete</Menu.Item>
							</Menu>
						}
						position="bl"
						trigger="click"
					>
						<span className="custom-comment-action">
							<IconMore />
						</span>
					</Dropdown>
				)
			}
		/>
	);
};

interface PreScreeningCommentsListProps {
	userData: Recruiter;
	setUserData: Dispatch<SetStateAction<Recruiter | undefined>>;
}

const PreScreeningCommentsList: FunctionComponent<
	PreScreeningCommentsListProps
> = ({ userData, setUserData }) => {
	const [currentCYCID, setCurrentCYCID] = useState(null);

	const comments = userData.pre_screening.comments;
	const RID = userData._id;

	useEffect(() => {
		const subscription = PubSub.subscribe('deleteComment', (_, data) => {
			const id = data.message;
			comments.splice(id, 1);
			//console.log(newComments)
			setUserData((state) => {
				if (!state) return;
				return {
					...state,
					pre_screening: { ...state.pre_screening, comments: comments },
				};
			});
		});
		getCurrentUserCYCID().then((res) => {
			setCurrentCYCID(res);
		});

		return () => {
			PubSub.unsubscribe(subscription);
		};
	}, [comments, setUserData]);

	return (
		<div>
			{currentCYCID && (
				<List bordered={false} header={<span>{comments.length} comments</span>}>
					{comments.map((item, index) => {
						return (
							<List.Item key={index}>
								<PreScreeningComment item={item} id={index} RID={RID} />
							</List.Item>
						);
					})}
				</List>
			)}

			<div id="comment-list-bottom"></div>
		</div>
	);
};

function menuEvent(key: string, id: number, RID: string) {
	// console.log(key,id,RID)

	if (key === '1') {
		console.log('edit');
	} else if (key === '2') {
		console.log('delete');
		deleteReq(`/comments/${RID}?commentID=${id}`).then((res) => {
			// console.log(res)
			if (res.status) {
				PubSub.publish('deleteComment', { message: id });
			}
		});
	} else {
		console.log('cancel');
	}
}
export default PreScreeningCommentsList;
