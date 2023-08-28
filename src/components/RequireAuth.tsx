import { useAuth0 } from '@auth0/auth0-react';
import React, { FunctionComponent } from 'react';
import { Navigate } from 'react-router-dom';

export const RequireAuth: FunctionComponent<{ children: JSX.Element }> = ({
	children,
}) => {
	const { isLoading, isAuthenticated } = useAuth0();

	return isLoading ? (
		<>Loading</>
	) : isAuthenticated ? (
		children
	) : (
		<Navigate to={'/login'} replace />
	);
};
