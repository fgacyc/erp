import { FirebaseApp, initializeApp } from 'firebase/app';
import {
	getAuth,
	createUserWithEmailAndPassword,
	sendEmailVerification,
	signInWithEmailAndPassword,
	sendPasswordResetEmail,
	updatePassword,
	deleteUser,
	reauthenticateWithCredential,
	EmailAuthProvider,
	GoogleAuthProvider,
	signInWithPopup,
	onAuthStateChanged,
	Auth,
} from 'firebase/auth';
import firebaseConfig from './config';

// For npm
/*
import { initializeApp } from 'firebase/app'
import { getAuth, sendSignInLinkToEmail, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
*/

export class FBAuth {
	app: FirebaseApp;
	auth: Auth;
	debug: boolean;
	constructor() {
		this.app = initializeApp(firebaseConfig);
		this.auth = getAuth(this.app);
		this.debug = false;
	}

	register(email: string, password: string) {
		return new Promise((resolve, reject) => {
			createUserWithEmailAndPassword(this.auth, email, password)
				.then((userCredential) => {
					// Signed in
					const user = userCredential.user;
					if (this.debug) console.log(`user ${user.email}:`, user);
					resolve(user);
				})
				.catch((error) => {
					if (this.debug) console.log(error.code, error.message);
					reject(error);
				});
		});
	}

	login(email: string, password: string) {
		return new Promise((resolve, reject) => {
			signInWithEmailAndPassword(this.auth, email, password)
				.then((userCredential) => {
					const user = userCredential.user;
					if (this.debug)
						console.log('Sign in with user: ', userCredential.user);
					localStorage.setItem('loginStatus', 'true');
					resolve(user);
				})
				.catch((error) => {
					if (this.debug) console.log(error.code, error.message);
					reject(error);
				});
		});
	}

	googleLogin() {
		return new Promise((resolve, reject) => {
			const provider = new GoogleAuthProvider();

			signInWithPopup(this.auth, provider)
				.then((result) => {
					const user = result.user;
					if (this.debug) console.log('Sign in with user: ', user);
					resolve(user);
				})
				.catch((error) => {
					if (this.debug) console.log(error.code, error.message);
					reject(error);
				});
		});
	}

	sendEmailVerification() {
		return new Promise((resolve, reject) => {
			if (!this.ifCurrentUserLoggedIn())
				reject('Must be logged in to send email verification');
			if (!this.auth.currentUser) {
				reject('No user detected.');
				return;
			}
			if (this.auth.currentUser?.emailVerified)
				reject('Email already verified');

			sendEmailVerification(this.auth.currentUser)
				.then(() => {
					if (this.debug)
						console.log(
							'send email verification to user' + this.auth.currentUser?.email,
						);
					resolve(true);
				})
				.catch((error) => {
					if (this.debug) console.log(error.code, error.message);
					reject(error);
				});
		});
	}

	forgotPassword(email: string) {
		return new Promise((resolve, reject) => {
			sendPasswordResetEmail(this.auth, email)
				.then(() => {
					if (this.debug)
						console.log('send password reset email to user' + email);
					resolve(true);
				})
				.catch((error) => {
					if (this.debug) console.log(error.code, error.message);
					reject(error);
				});
		});
	}

	updatePassword(newPassword: string) {
		return new Promise((resolve, reject) => {
			if (!this.ifCurrentUserLoggedIn())
				reject('Must be logged in to update password');
			const user = this.auth.currentUser;
			if (!user) {
				reject('No User Found!');
				return;
			}
			updatePassword(user, newPassword)
				.then(() => {
					if (this.debug) console.log('update password for user' + user.email);
					resolve(true);
				})
				.catch((error) => {
					if (this.debug) console.log(error.code, error.message);
					reject(error);
				});
		});
	}

	logout() {
		return new Promise((resolve, reject) => {
			const user = this.auth.currentUser;
			this.auth
				.signOut()
				.then(() => {
					if (this.debug) console.log(`User ${user?.email} sign out`);

					resolve(true);
				})
				.catch((error) => {
					if (this.debug) console.log(error.code, error.message);
					reject(error);
				});
		});
	}

	getUserInfo() {
		return new Promise((resolve, reject) => {
			if (!this.ifCurrentUserLoggedIn())
				reject('Must be logged in to get user info');
			const user = this.auth.currentUser;
			if (!user) {
				reject('No User Found!');
				return;
			}
			const data = {
				uid: user.uid,
				displayName: user.displayName,
				email: user.email,
				emailVerified: user.emailVerified,
				phoneNumber: user.phoneNumber,
				photoURL: user.photoURL,
			};
			if (this.debug) console.log(`User ${data.email}:`, data);
			resolve(data);
		});
	}

	// updateUserInfo(newData) {
	// 	return new Promise((resolve, reject) => {
	// 		if (!this.ifCurrentUserLoggedIn())
	// 			reject('Must be logged in to update user info');
	// 		const user = this.auth.currentUser;
	// 		updateProfile(user, newData)
	// 			.then(() => {
	// 				if (this.debug) console.log(`update user ${user.email} info`);
	// 				resolve(user);
	// 			})
	// 			.catch((error) => {
	// 				if (this.debug) console.log(error.code, error.message);
	// 				reject(error);
	// 			});
	// 	});
	// }

	// updateUserEmail(newEmail: string) {
	// 	return new Promise((resolve, reject) => {
	// 		if (!this.ifCurrentUserLoggedIn())
	// 			reject('Must be logged in to update user email');
	// 		const user = this.auth.currentUser;
	// 		if (!user) {
	// 			reject('No User Found!');
	// 			return;
	// 		}
	// 		user
	// 			.updateEmail(newEmail)
	// 			.then(() => {
	// 				if (this.debug) console.log(`update user email to ${newEmail}`);
	// 				resolve(`update successfully, new email: ${newEmail}`);
	// 			})
	// 			.catch((error) => {
	// 				if (this.debug) console.log(error.code, error.message);
	// 				reject(error);
	// 			});
	// 	});
	// }

	deleteAccount() {
		return new Promise((resolve, reject) => {
			if (!this.ifCurrentUserLoggedIn())
				reject('Must be logged in to delete user');
			const user = this.auth.currentUser;
			if (!user) {
				reject('No User Found!');
				return;
			}
			deleteUser(user)
				.then(() => {
					if (this.debug) console.log(`delete user ${user.email}`);
					resolve(true);
				})
				.catch((error) => {
					if (this.debug) console.log(error.code, error.message);
					reject(error);
				});
		});
	}

	reauthenticate(password: string) {
		return new Promise((resolve, reject) => {
			if (!this.ifCurrentUserLoggedIn())
				reject('Must be logged in to re-authenticate');

			const user = this.auth.currentUser;
			if (!user) {
				reject('No User Found!');
				return;
			}
			const credential = EmailAuthProvider.credential(
				user.email ?? '',
				password,
			);
			reauthenticateWithCredential(user, credential)
				.then(() => {
					if (this.debug) console.log('re-authenticate' + user.email);
					resolve(true);
				})
				.catch((error) => {
					if (this.debug) console.log(error.code, error.message);
					reject(error);
				});
		});
	}

	// ifCurrentUserLoggedIn(reject, prompt) {
	//     if (this.auth.currentUser === null) {
	//         if (this.debug) console.log(prompt);
	//         reject(prompt);
	//     }
	// }

	ifCurrentUserLoggedIn() {
		return new Promise((resolve, reject) => {
			onAuthStateChanged(this.auth, (user) => {
				if (user) {
					if (this.debug) console.log('user logged in');
					resolve(true);
				} else {
					if (this.debug) console.log('user not logged in');
					reject(false);
				}
			});
		});
	}

	getCurrentUser() {
		return new Promise((resolve, reject) => {
			onAuthStateChanged(this.auth, (user) => {
				if (user) {
					if (this.debug) console.log('user logged in');
					resolve(user);
				} else {
					if (this.debug) console.log('user not logged in');
					reject(null);
				}
			});
		});
	}
}
