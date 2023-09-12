import createClient from "openapi-fetch";
import { paths as identityPaths } from "@/@types/identity";
import { paths as eventPaths } from "@/@types/event";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";

export const useIdentityAPI = () => {
	const [client, setClient] = useState(createClient<identityPaths>());
	const { getAccessTokenSilently } = useAuth0();

	useEffect(() => {
		const audience = import.meta.env["VITE_IDENTITY_API_URL"];
		const scope = import.meta.env["VITE_IDENTITY_API_SCOPE"];

		(async () => {
			try {
				const token = await getAccessTokenSilently({
					authorizationParams: { audience, scope },
				});
				setClient(
					createClient<identityPaths>({
						baseUrl: audience,
						headers: { Authorization: `Bearer ${token}` },
					}),
				);
			} catch (e) {
				// Handle errors such as `login_required` and `consent_required` by re-prompting for a login
				console.error(`Failed to acquire access token for ${audience}: ${e}`);
			}
		})();

	}, [getAccessTokenSilently]);
	return client;
};

export const useEventAPI = () => {
	const [client, setClient] = useState(createClient<eventPaths>());
	const { getAccessTokenSilently } = useAuth0();

	useEffect(() => {
	  const audience = import.meta.env["VITE_EVENT_API_URL"];
	  const scope = import.meta.env["VITE_EVENT_API_SCOPE"];

	  (async () => {
		try {
		  const token = await getAccessTokenSilently({
		    authorizationParams: { audience, scope },
		  });
		  setClient(createClient<eventPaths>({
			  baseUrl: audience,
			  headers: { Authorization: `Bearer ${token}` }
		  }));
		} catch (e) {
		  // Handle errors such as `login_required` and `consent_required` by re-prompting for a login
		  console.error(`Failed to acquire access token for ${audience}: ${e}`);
		}
	  })();
	}, [getAccessTokenSilently]);
	return client;
};
