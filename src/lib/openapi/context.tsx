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
    identity: null;
    event: null;
    ready: false;
} | {
    identity: IdentityClient;
    event: EventClient;
    ready: true;
}

const context = createContext<Context>({ event: null, identity: null, ready: false });

// eslint-disable-next-line react/prop-types
export const OpenApiProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [identity, setIdentity] = useState<IdentityClient | null>(null);
    const [event, setEvent] = useState<EventClient | null>(null);
    const { getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        const audience = import.meta.env["VITE_IDENTITY_API_URL"];
        const scope = import.meta.env["VITE_IDENTITY_API_SCOPE"];

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
            } catch (e) {
                // Handle errors such as `login_required` and `consent_required` by re-prompting for a login
                console.error(`Failed to acquire access token for ${audience}: ${e}`);
            }
        })();
    }, [getAccessTokenSilently]);

    useEffect(() => {
        const audience = import.meta.env["VITE_EVENT_API_URL"];
        const scope = import.meta.env["VITE_EVENT_API_SCOPE"];

        (async () => {
            try {
                const token = await getAccessTokenSilently({
                    authorizationParams: { audience, scope },
                });
                setEvent(createClient<eventPaths>({
                    baseUrl: audience,
                    headers: { Authorization: `Bearer ${token}` }
                }));
            } catch (e) {
                // Handle errors such as `login_required` and `consent_required` by re-prompting for a login
                console.error(`Failed to acquire access token for ${audience}: ${e}`);
            }
        })();
    }, [getAccessTokenSilently]);

    return <context.Provider value={!!event && !!identity ? { identity, event, ready: true } : { identity: null, event: null, ready: false }}>{children}</context.Provider>;
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
            const user = await identity.GET("/users/{id}", { params: { path: { id: "test-id" } } });
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