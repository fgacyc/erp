import { useOpenApi } from "@/lib/openapi/context";
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
	const { identity, ready } = useOpenApi();

	const [tip, setTip] = useState("Loading...");
	const [loadingUserData, setLoadingUserData] = useState(true);
	const [overallLoading, setOverallLoading] = useState(true);

	useEffect(() => {
		(async () => {
			console.log("Finding");
			console.log("Ready", ready);
			if (!ready) return;
			if (isLoading) return;
			identity
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
					console.log("Found");
				})
				.catch((err) => {
					setLoadingUserData(false);
					console.log("Erred");
					throw new Error(err);
				});
		})();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [auth0User?.sub, ready]);

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

	return !ready || overallLoading ? (
		<div className="min-h-screen min-w-screen flex flex-col justify-center items-center">
			<Spin tip={tip} size={40} block />
		</div>
	) : user.id ? (
		children
	) : (
		<Navigate to={"/login"} />
	);
};
