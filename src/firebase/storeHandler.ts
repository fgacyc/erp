import { FirebaseApp, initializeApp } from 'firebase/app';
import {
	getFirestore,
	doc,
	setDoc,
	collection,
	addDoc,
	updateDoc,
	serverTimestamp,
	deleteDoc,
	getDoc,
	getDocs,
	arrayUnion,
	arrayRemove,
	Firestore,
	DocumentSnapshot,
	QuerySnapshot,
	DocumentData,
	increment,
} from 'firebase/firestore';
import firebaseConfig from './config';

// for npm
/*
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, collection, addDoc, updateDoc, serverTimestamp, deleteDoc, getDoc, getDocs, where, query, orderBy } from "firebase/firestore";
*/

export class FBStore {
	app: FirebaseApp;
	db: Firestore;
	isMerge: boolean;
	debug: boolean;
	useCache: boolean;
	_cache: {
		[key: string]: DocumentData;
	};
	constructor() {
		this.app = initializeApp(firebaseConfig);
		this.db = getFirestore(this.app);
		this.isMerge = true; // true: merge / false: overwrite
		this.debug = false;
		this.useCache = true;
		this._cache = {};
	}

	write(
		collectionName: string,
		document: DocumentSnapshot,
		documentID: string,
	) {
		if (documentID === undefined) documentID = '';
		else documentID = documentID.toString();
		return new Promise((resolve, reject) => {
			if (arguments.length === 2) {
				//  autoId
				addDoc(collection(this.db, collectionName), { ...document }).then(
					(docRef) => {
						if (this.debug)
							console.log('Document written with ID: ', docRef.id);
						resolve(docRef.id);
					},
				);
			} else if (arguments.length === 3) {
				//  documentID  and merge / overwrite
				setDoc(
					doc(this.db, collectionName, documentID),
					{ ...document },
					{ merge: this.isMerge },
				)
					.then(() => {
						if (this.debug)
							console.log(`"Document ${documentID} successfully written!"`);
						return true;
					})
					.catch((error) => {
						console.error(`Error writing document: ${documentID}`, error);
						return false;
					});
			} else {
				reject(
					'Invalid number of arguments, expected 2 or 3, got ' +
						arguments.length,
				);
			}
		});
	}

	readCollection(collectionName: string) {
		if (arguments.length !== 1)
			throw new Error(
				'Invalid number of arguments, expected 1, got ' + arguments.length,
			);

		return new Promise((resolve, reject) => {
			try {
				getDocs(collection(this.db, collectionName)).then((querySnapshot) => {
					const data = this.snapshotToObj(querySnapshot);
					if (this.useCache) this.cache[collectionName] = data;
					if (this.debug) console.log(`collect ${collectionName} data: `, data);
					resolve(data);
				});
			} catch (error) {
				console.error(`Error reading collection: ${collectionName}`, error);
				reject(`Error reading collection: ${collectionName}`);
			}
		});
	}

	get cache() {
		return this._cache;
	}

	readDocument(collectionName: string, documentID: string) {
		if (arguments.length !== 2)
			throw new Error(
				'Invalid number of arguments, expected 2, got ' + arguments.length,
			);

		documentID = documentID.toString();

		const docRef = doc(this.db, collectionName, documentID);

		// let docSnap = await getDoc(docRef);
		return new Promise((resolve, reject) => {
			getDoc(docRef)
				.then((docSnap) => {
					if (docSnap.exists()) {
						if (this.debug)
							console.log(`Document ${documentID} data:`, docSnap.data());
						const res = docSnap.data();
						res.id = docSnap.id;
						resolve(res);
					} else {
						if (this.debug) console.log(`No such document ${documentID}!`);
						reject(`No such document ${documentID}!`);
					}
				})
				.catch((error) => {
					console.error(`Error reading document: ${documentID}`, error);
				});
		});
	}

	// query(collectionName: string, queries, order) {
	// 	if (arguments.length !== 2 && arguments.length !== 3)
	// 		throw new Error(
	// 			'Invalid number of arguments, expected 2 or 3, got ' + arguments.length,
	// 		);
	// 	if (this.validate(collectionName) !== 'string')
	// 		throw new Error(
	// 			'Invalid collection name, expected string, got ' + typeof collection,
	// 		);
	// 	if (this.validate(queries) !== 'object')
	// 		throw new Error(
	// 			'Invalid queries, expected object, got ' + typeof queries,
	// 		);

	// 	if (arguments.length === 3) {
	// 		if (this.validate(order) !== 'object')
	// 			throw new Error('Invalid order, expected object, got ' + typeof order);
	// 	}

	// 	let q;

	// 	if (this.validate(queries[0]) !== 'object') queries = [queries];

	// 	if (arguments.length === 2) {
	// 		let queriesList = [];
	// 		for (let qurey of queries) {
	// 			queriesList.push(where(qurey[0], qurey[1], qurey[2]));
	// 			q = query(collection(this.db, collectionName), ...queriesList);
	// 		}
	// 	} else if (arguments.length === 3) {
	// 		let queriesList = [];
	// 		for (let qurey of queries) {
	// 			queriesList.push(where(qurey[0], qurey[1], qurey[2]));
	// 			q = query(
	// 				collection(this.db, collectionName),
	// 				...queriesList,
	// 				orderBy(order[0], order[1]),
	// 			);
	// 		}
	// 	}
	// 	return new Promise((resolve, reject) => {
	// 		getDocs(q)
	// 			.then((querySnapshot) => {
	// 				const data = this.snapshotToArray(querySnapshot);
	// 				if (this.debug) console.log(`collect ${collectionName} data: `, data);
	// 				resolve(data);
	// 			})
	// 			.catch((error) => {
	// 				console.error(`Error reading collection: ${collectionName}`, error);
	// 				reject(`Error reading collection: ${collectionName}`, error);
	// 			});
	// 	});
	// }

	delete(collectionName: string, documentID: string) {
		if (arguments.length !== 2)
			throw new Error(
				'Invalid number of arguments, expected 2, got ' + arguments.length,
			);

		documentID = documentID.toString();

		return new Promise((resolve, reject) => {
			deleteDoc(doc(this.db, collectionName, documentID))
				.then(() => {
					if (this.debug)
						console.log(`Document ${documentID} successfully deleted!`);
					resolve(true);
				})
				.catch((error) => {
					console.error(`Error removing document: ${documentID}`, error);
					reject(false);
				});
		});
	}

	update(collectionName: string, document: DocumentData, documentID: string) {
		if (documentID === undefined) documentID = '';
		else documentID = documentID.toString();

		const docRef = doc(this.db, collectionName, documentID);

		return new Promise((resolve, reject) => {
			updateDoc(docRef, { ...document })
				.then(() => {
					if (this.debug)
						console.log(`Document successfully ${documentID} updated!`);
					resolve(true);
				})
				.catch((error) => {
					console.error(`Error updating document: ${documentID}`, error);
					reject(false);
				});
		});
	}

	addArrayElement(
		collectionName: string,
		documentID: string,
		fieldName: string,
		element: unknown,
	) {
		if (arguments.length !== 4)
			throw new Error(
				'Invalid number of arguments, expected 4, got ' + arguments.length,
			);

		//console.log(collectionName, documentID, fieldName, element);

		const docRef = doc(this.db, collectionName, documentID);

		return new Promise((resolve, reject) => {
			updateDoc(docRef, {
				[fieldName]: arrayUnion(element),
			})
				.then(() => {
					if (this.debug)
						console.log(`Document successfully ${documentID} updated!`);
					resolve(true);
				})
				.catch((error) => {
					console.error(`Error updating document: ${documentID}`, error);
					reject(false);
				});
		});
	}

	removeArrayElement(
		collectionName: string,
		documentID: string,
		fieldName: string,
		element: unknown,
	) {
		if (arguments.length !== 4)
			throw new Error(
				'Invalid number of arguments, expected 4, got ' + arguments.length,
			);

		const docRef = doc(this.db, collectionName, documentID);

		return new Promise((resolve, reject) => {
			updateDoc(docRef, {
				[fieldName]: arrayRemove(element),
			})
				.then(() => {
					if (this.debug)
						console.log(`Document successfully ${documentID} updated!`);
					resolve(true);
				})
				.catch((error) => {
					console.error(`Error updating document: ${documentID}`, error);
					reject(false);
				});
		});
	}

	addNum(
		collectionName: string,
		documentID: string,
		fieldName: string,
		number: number,
	) {
		if (arguments.length !== 4)
			throw new Error(
				'Invalid number of arguments, expected 4, got ' + arguments.length,
			);

		const docRef = doc(this.db, collectionName, documentID);

		const data = {
			[fieldName]: increment(number),
		};
		return new Promise((resolve, reject) => {
			updateDoc(docRef, data)
				.then(() => {
					if (this.debug)
						console.log(`Document : ${documentID} successfully updated!`);
					resolve(true);
				})
				.catch((error) => {
					console.error(`Error updating document: ${documentID}`, error);
					reject(false);
				});
		});
	}

	addOne(collectionName: string, documentID: string, fieldName: string) {
		return this.addNum(collectionName, documentID, fieldName, 1);
	}

	getCache(collectionName: string) {
		return new Promise((resolve, reject) => {
			if (this.cache[collectionName] !== undefined) {
				if (this.debug)
					console.log(
						`collect ${collectionName} data: `,
						this.cache[collectionName],
					);
				resolve(this.cache[collectionName]);
			} else {
				reject(`No such collection ${collectionName}!`);
			}
		});
	}

	getServerTimestamp() {
		return serverTimestamp();
	}

	snapshotToObj(snapshot: QuerySnapshot) {
		const obj: {
			[key: string]: DocumentData;
		} = {};
		snapshot.forEach((doc) => {
			obj[doc.id] = doc.data();
		});
		return obj;
	}

	snapshotToArray(snapshot: QuerySnapshot) {
		const arr: DocumentData[] = [];
		snapshot.forEach((doc) => {
			const data = doc.data();
			data.id = doc.id;
			arr.push(data);
		});
		return arr;
	}
}

// TODO 增加缓存机制，如果存在缓存，优先使用缓存
// TODO 提供刷新缓存的方法