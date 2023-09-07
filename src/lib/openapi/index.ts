import createClient from "openapi-fetch";
import { paths } from "@/@types/schema";
import { useAuth0 } from "@auth0/auth0-react";

export const useAPI = () => {
	const { getAccessTokenSilently, isAuthenticated } = useAuth0();
	const token = isAuthenticated && getAccessTokenSilently();

	return createClient<paths>({
		baseUrl: import.meta.env["VITE_HOST_URL"],
		headers: token ? { Authorization: `Bearer ${token}` } : {},
	});
};
