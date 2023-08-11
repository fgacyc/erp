// import { FBStore } from '../firebase/storeHandler';

// export default class User {
// 	constructor(
// 		name,
// 		position,
// 		id_number,
// 		contact_number,
// 		avatar_url,
// 		bio,
// 		email,
// 		address,
// 		create_at,
// 		password,
// 		settings,
// 	) {
// 		this.name = name;
// 		this.position = position;
// 		this.id_number = id_number;
// 		this.contact_number = contact_number;
// 		this.avatar_url = avatar_url;
// 		this.bio = bio;
// 		this.email = email;
// 		this.address = address;
// 		this.create_at = create_at;
// 		this.password = password;
// 		this.settings = settings;

// 		this.fbStore = new FBStore();
// 	}

// 	submit() {
// 		this.fbStore.write('users', this).then((data) => {
// 			console.log(data);
// 		});
// 	}
// }
