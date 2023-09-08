import { getFirestore } from "firebase/firestore";
import React from "react";
import { FirestoreProvider, useFirebaseApp } from "reactfire";
import { Seats } from "./Seats";

const SeatsPage = () => {
	const firestoreInstance = getFirestore(useFirebaseApp());

	return (
		<>
			<div className="app-component full-screen-app-component">
				<FirestoreProvider sdk={firestoreInstance}>
					<Seats />
				</FirestoreProvider>
			</div>
		</>
	);
};

export default SeatsPage;
