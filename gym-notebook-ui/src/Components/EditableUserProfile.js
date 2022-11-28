import React, {useState, useEffect, useContext} from "react";
import {StyleSheet, SafeAreaView} from "react-native";
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
		height: 40,
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

	useEffect(() => {}, []);

	const saveProfile = async () => {
		const response = await fetch(imgPath, {mode: "no-cors"});
		const blob = await response.blob();

		const pathRef = ref(storage, auth.user.username);

		uploadBytes(pathRef, blob).then((snapshot) => {
			console.log("uploaded blob");

			getDownloadURL(pathRef).then(async (imageUrl) => {
				setImgPath(imageUrl);
				await axios
					.put(`users/edit-profile/${username}/${firstName}/${lastName}/${email}/${profileBio}/${id}`)
					.then(() => {
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
						/*
						const userInfo = {
									id: response.data[0].id,
									username: username,
									userPassword: password,
									firstName: firstName,
									lastName: lastName,
									DoB: date.toISOString().split("T")[0],
									imagePath: imageUrl,
									email: email,
									profileBio: bio,
								};
						*/
						setAuth({user: userInfo});
						navigation.navigate("User Profile");
					})
					.catch((err) => {
						console.log(err);
					});
			});
		});
	};

	const changeToUserProfile = async () => {
		navigation.navigate("User Profile");
	};

	return (
		<SafeAreaView style={{flex: 1, maxHeight: "100%"}}>
			<Card style={{backgroundColor: GlobalStyles.hexColor.brown}}>
				<ImagePick image={imgPath} setImage={setImgPath} />
				<TextInput
					style={styles.textInputStyle}
					label={"Username"}
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
				<TextInput style={styles.textInputStyle} label={"Email"} value={email} textContentType={"emailAddress"} onChangeText={setEmail} />
				{/* <WheelPickerExpo
					height={300}
					width={150}
					initialSelectedIndex={3}
					items={CITIES.map((name) => ({label: name, value: ""}))}
					onChange={() => {}}
				/> */}
				<TextInput
					style={styles.bioInputStyle}
					error={true}
					mode="outlined"
					label={"Bio"}
					value={profileBio}
					multiline={true}
					onChangeText={setProfileBio}
				/>
				<Button style={styles.buttonSave} icon="content-save" mode="contained" buttonColor="#ff0000" onPress={saveProfile} />
				<IconButton
					style={styles.buttonStyle}
					icon="arrow-up-drop-circle"
					iconColor={"green"}
					animate={true}
					selected={true}
					onPress={changeToUserProfile}
				/>
			</Card>
		</SafeAreaView>
	);
};

export default EditableUserProfile;
