import { getFirestore } from "firebase/firestore";
import React from "react";
import { FirestoreProvider, useFirebaseApp } from "reactfire";
import { Seats } from "./Seats";
import UIBreadcrumb from "@/components/UIBreadcrumb/index";

const SeatsPage = () => {
	const breadcrumbItems = [
		{
			name: "Ushering",
			link: "/",
			clickable: false,
		},
		{
			name: "Seats",
			link: "/ushering/seats",
			clickable: true,
		},
	];
	const firestoreInstance = getFirestore(useFirebaseApp());

	return (
		<>
			<UIBreadcrumb items={breadcrumbItems} />
			<div className="app-component full-screen-app-component">
				<FirestoreProvider sdk={firestoreInstance}>
					<Seats />
				</FirestoreProvider>
			</div>
		</>
	);
};

export default SeatsPage;
