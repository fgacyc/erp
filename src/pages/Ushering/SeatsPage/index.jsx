import { getFirestore } from 'firebase/firestore';
import React from 'react';
import { FirestoreProvider, useFirebaseApp } from 'reactfire';
import { Seats } from './Seats';

const SeatsPage = () => {
	const firestoreInstance = getFirestore(useFirebaseApp());

	return (
		<FirestoreProvider sdk={firestoreInstance}>
			<Seats />
		</FirestoreProvider>
	);
};

export default SeatsPage;
