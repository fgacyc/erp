/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import createClient from "openapi-fetch";
import { createContext, useContext, useEffect, useState } from "react";

import { paths as identityPaths } from "@/@types/identity";
import { paths as eventPaths } from "@/@types/event";
import { useAuth0 } from "@auth0/auth0-react";

type IdentityClient = ReturnType<typeof createClient<identityPaths>>;
type EventClient = ReturnType<typeof createClient<eventPaths>>;

type Context = {
	identity: IdentityClient;
	event: EventClient;
	ready: true | false;
};

const context = createContext<Context>({
	//@ts-ignore
	event: null,
	//@ts-ignore
	identity: null,
	ready: false,
});

type Auth0SilentAuthError = {
	error: string;
	error_description: string;
};

export const OpenApiProvider: React.FC<{ children: React.ReactNode }> = ({
	// eslint-disable-next-line react/prop-types
	children,
}) => {
	const [identity, setIdentity] = useState<IdentityClient | null>(null);
	const [event, setEvent] = useState<EventClient | null>(null);
	const { getAccessTokenSilently, loginWithRedirect } = useAuth0();
	const [ready, setReady] = useState(false);

	useEffect(() => {
		const audience = import.meta.env["VITE_IDENTITY_API_URL"];
		const scope = import.meta.env["VITE_IDENTITY_API_SCOPE"];
		console.log("init");
		(async () => {
			try {
				const token = await getAccessTokenSilently({
					authorizationParams: { audience, scope },
				});

				setIdentity(
					createClient<identityPaths>({
						baseUrl: audience,
						headers: { Authorization: `Bearer ${token}` },
					}),
				);
				setEvent(
					createClient<eventPaths>({
						baseUrl: audience,
						headers: { Authorization: `Bearer ${token}` },
					}),
				);
				setReady(true);
				console.log("Ready!");
			} catch (e) {
				// Handle errors such as `login_required` and `consent_required` by re-prompting for a login
				const error = e as Auth0SilentAuthError;
				console.error(
					`Failed to acquire access token for ${audience}: ${error.error}`,
				);

				if (error.error === "login_required") {
					localStorage.clear();
					loginWithRedirect();
				}
			}
		})();
	}, [getAccessTokenSilently, loginWithRedirect]);

	return (
		//@ts-ignore
		<context.Provider value={{ identity, event, ready: ready }}>
			{children}
		</context.Provider>
	);
};

// eslint-disable-next-line react-refresh/only-export-components
export const useOpenApi = () => useContext(context);

/** NOTE: Delete me, this is only an example usage */
// @ts-ignore
const ExampleComponent = () => {
	// @ts-ignore
	const { event, identity, ready } = useOpenApi();

	useEffect(() => {
		(async () => {
			if (!ready) return;
			const user = await identity.GET("/users/{id}", {
				params: { path: { id: "test-id" } },
			});
			if (user.error) {
				console.error(user.error);
				return;
			}

			console.log(user.data);
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ready]);

	if (!ready) return <>Loading...</>;

	return <>Hello World</>;
};
