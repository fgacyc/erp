import { useAPI } from "@/lib/openapi";
import { useAccount } from "@/store/useAccount";
import { Spin } from "@arco-design/web-react";
import { useAuth0 } from "@auth0/auth0-react";
import React, { FunctionComponent, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export const RequireAuth: FunctionComponent<{ children: JSX.Element }> = ({
	children,
}) => {
	const { isLoading, user: auth0User } = useAuth0();
	const { setUser, user } = useAccount();
	const api = useAPI();

	const [tip, setTip] = useState("Loading...");
	const [loadingUserData, setLoadingUserData] = useState(true);
	const [overallLoading, setOverallLoading] = useState(true);

	useEffect(() => {
		if (isLoading) return;
		api
			.GET("/users/{id}", {
				params: {
					path: {
						id: String(auth0User?.sub),
					},
				},
			})
			.then(({ data }) => {
				data && setUser(data);
				setLoadingUserData(false);
			})
			.catch((err) => {
				setLoadingUserData(false);
				throw new Error(err);
			});

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [auth0User?.sub, isLoading]);

	useEffect(() => {
		const timeout = setTimeout(() => setTip("This may take a while.."), 5000);

		return () => clearTimeout(timeout);
	}, []);

	useEffect(() => {
		if (!loadingUserData && !isLoading) {
			const to = setTimeout(() => setOverallLoading(false), 300);

			return () => clearTimeout(to);
		}
	}, [isLoading, loadingUserData]);

	return overallLoading ? (
		<div className="min-h-screen min-w-screen flex flex-col justify-center items-center">
			<Spin tip={tip} size={40} block />
		</div>
	) : user.id ? (
		children
	) : (
		<Navigate to={"/login"} />
	);
};
