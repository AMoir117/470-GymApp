import React, {useState, useEffect, useContext} from "react";
import {StyleSheet, SafeAreaView, ScrollView} from "react-native";
import {Button, TextInput, IconButton, Card} from "react-native-paper";
import ImagePick from "./Modules/ImagePicker";
import axios from "axios";
import AuthContext from "../Context/AuthProvider";

import GlobalStyles from "./GlobalStyles";

import {getStorage, ref, getDownloadURL, uploadBytes} from "firebase/storage";
import {initializeApp} from "firebase/app";
import firebaseConfig from "../../firebaseConfig";

const styles = StyleSheet.create({
	backgroundColor: {
		flex: 1,
		backgroundColor: GlobalStyles.hexColor.black,
	},
	areaView: {
		height: 1200,
	},
	textTitle: {
		fontSize: 30,
		alignSelf: "center",
	},
	textInputStyle: {
		height: 60,
		width: 300,
		paddingLeft: 10,
		alignSelf: "center",
		borderColor: "#000000",
		backgroundColor: "#ffffff",
	},
	bioInputStyle: {
		height: 100,
		width: 300,
		paddingLeft: 10,
		alignSelf: "center",
		borderColor: "#000000",
		backgroundColor: "#FFFFFF",
		textAlignVertical: "top",
	},
	textUploadImage: {
		fontSize: 15,
		color: "#0073ff",
		alignSelf: "center",
	},
	buttonSave: {
		height: 40,
		width: 100,
		marginTop: 20,
		alignSelf: "center",
	},
	buttonStyle: {
		height: 30,
		width: 70,
		margin: 2,
		marginTop: 10,
		borderColor: "#949494",
		backgroundColor: "#949494",
	},
	buttonText: {
		fontSize: 20,
		color: "#000000",
		textAlign: "center",
	},
	avatarStyle: {
		alignSelf: "center",
		margin: 15,
	},
});

const options = {
	year: "numeric",
	month: "numeric",
	day: "numeric",
};

const EditableUserProfile = ({navigation, back}) => {
	const {auth, setAuth} = useContext(AuthContext);

	const app = initializeApp(firebaseConfig);
	const storage = getStorage(app);

	const id = auth.user.id;

	const [username, setUsername] = useState(auth.user.username);
	const [firstName, setFirstName] = useState(auth.user.firstName);
	const [lastName, setLastName] = useState(auth.user.lastName);
	const [email, setEmail] = useState(auth.user.email);
	const [profileBio, setProfileBio] = useState(auth.user.profileBio);
	const [imgPath, setImgPath] = useState(auth.user.imagePath);

	useEffect(() => {
		console.log(auth.user);
	}, []);

	const saveProfile = async () => {
		const response = await fetch(imgPath, {mode: "no-cors"});
		const blob = await response.blob();

		const pathRef = ref(storage, auth.user.username);

		uploadBytes(pathRef, blob).then((snapshot) => {
			console.log("uploaded blob");

			getDownloadURL(pathRef).then(async (imagePath) => {
				await axios
					.put(`users/edit-profile/${firstName}/${lastName}/${profileBio}/${id}`)
					.then(() => {
						console.log("testing");
						const userInfo = {
							id: auth.user.id,
							username: username,
							userPassword: auth.user.userPassword,
							firstName: firstName,
							lastName: lastName,
							Dob: auth.user.DoB,
							imagePath: imgPath,
							email: email,
							profileBio: profileBio,
							currentWeeklyScheduleID: auth.user.currentWeeklyScheduleID,
						};
						setImgPath(imagePath);
						setAuth({user: userInfo});
					})
					.then(() => {
						navigation.navigate("Front Page");
					})
					.catch((err) => {
						console.log(err);
					});
			});
		});
	};

	return (
		<SafeAreaView style={{flex: 1, maxHeight: "100%"}}>
			<ScrollView
				style={{flex: 1, maxHeight: "100%"}}
				//stickyHeaderIndices={[0]}
				showsVerticalScrollIndicator={false}
				alwaysBounceVertical={false}
			>
				<ImagePick image={imgPath} setImage={setImgPath} />
				<TextInput
					style={styles.textInputStyle}
					label={"Username"}
					disabled={true}
					value={username}
					textContentType={"username"}
					onChangeText={setUsername}
				/>
				<TextInput
					style={styles.textInputStyle}
					label={"First Name"}
					value={firstName}
					textContentType={"givenName"}
					onChangeText={setFirstName}
				/>
				<TextInput
					style={styles.textInputStyle}
					label={"Last Name"}
					value={lastName}
					textContentType={"lastName"}
					onChangeText={setLastName}
				/>
				<TextInput
					style={styles.textInputStyle}
					disabled={true}
					label={"Email"}
					value={email}
					textContentType={"emailAddress"}
					onChangeText={setEmail}
				/>

				<TextInput
					style={styles.bioInputStyle}
					mode="outlined"
					label={"Bio"}
					value={profileBio}
					multiline={true}
					onChangeText={setProfileBio}
				/>
				<Button style={styles.buttonSave} icon="content-save" mode="contained" buttonColor="#ff0000" onPress={saveProfile} />
			</ScrollView>
		</SafeAreaView>
	);
};

export default EditableUserProfile;
