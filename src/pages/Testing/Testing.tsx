// import { FBAuth } from '@/firebase/authHandler';
// import { FBStore } from '@/firebase/storeHandler';

// const fbAuth = new FBAuth();
// const fbStore = new FBStore();

// const Testing = () => {
// 	function addDataToFirebase(user) {
// 		// console.log(user);
// 		let userData = {
// 			email: user.email,
// 			username: user.displayName,
// 			photoURL: user.photoURL,
// 			phoneNumer: user.phoneNumber,
// 			uid: user.uid,
// 			recent_login: parseInt(reloadUserInfo.lastLoginAt),
// 		};

// 		console.log(userData);

// 		return new Promise((resolve, reject) => {
// 			fbStore
// 				.write('users', userData, user.uid)
// 				.then(() => {
// 					console.log('Document successfully written!');
// 					resolve(true);
// 				})
// 				.catch((error) => {
// 					console.error('Error writing document: ', error);
// 					reject(false);
// 				});
// 		});
// 	}

// 	async function handleGoogleLogin() {
// 		try {
// 			const user = await fbAuth.googleLogin();
// 			if (user) {
// 				// console.log(userData);

// 				// store details to browser
// 				console.log(user);
// 			}

// 			// Check if the user exists in the "users" collection
// 			fbStore
// 				.readDocument('users', user.uid)
// 				.then((doc) => {
// 					console.log(doc);
// 					// window.location.href = "profile.html";
// 				})
// 				.catch((error) => {
// 					// If the user does not exist in the "users" collection, add the data to Firebase
// 					addDataToFirebase(user).then((res) => {
// 						if (res) {
// 							console.log('Successfully added data to Firebase');
// 							// window.location.href = "profile.html";
// 						} else {
// 							console.log('Error when login with google', 3000, 'error');
// 						}
// 					});
// 				});
// 		} catch (error) {
// 			console.error('Error when login with google: ', error);
// 		}
// 	}

// 	return (
// 		<div>
// 			<button onClick={handleGoogleLogin}>Google</button>
// 		</div>
// 	);
// };

// export default Testing;
