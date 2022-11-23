import React, {useState, useEffect, useContext} from "react";
import {
	ScrollView,
	Text,
	StyleSheet,
	View,
	FlatList,
	Pressable,
	SafeAreaView,
	Platform,
	ImageBackground,
} from "react-native";
import {Divider, Appbar, Button, Avatar, Dialog, TextInput} from "react-native-paper";
import WheelPickerExpo from "react-native-wheel-picker-expo";
import InsertDate from "./Modules/InsertDate";
import ImagePick from "./Modules/ImagePicker";
import axios from "axios";
import AuthContext from "../Context/AuthProvider";

import SvgImage from "./SvgImage";
import GlobalStyles from "./GlobalStyles";

import {getStorage, ref, getDownloadURL, uploadBytes} from "firebase/storage";
import {initializeApp} from "firebase/app";
import firebaseConfig from "../../firebaseConfig";
import {set} from "react-native-reanimated";

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
		margin: 10,
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

const Signup = ({navigation, back}) => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [checkPassword, setCheckPassword] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [bio, setBio] = useState("");
	const [show, setShow] = useState(false);
	const [date, setDate] = useState(new Date(2001, 1, 1));
	const [imagePath, setImagePath] = useState(undefined);

	const {auth, setAuth} = useContext(AuthContext);

	const app = initializeApp(firebaseConfig);
	const storage = getStorage(app);

	const [usernameError, setUsernameError] = useState(false);
	const [passwordError, setPasswordError] = useState(false);

	useEffect(() => {}, []);

	const saveProfile = async () => {
		await axios.get(`users/username/${username}`).then((response) => {
			if (response.data.length > 0) {
				console.log("username is not available");
				setUsernameError(true);
			} else {
				setUsernameError(false);
			}
			return;
		});
		if (password !== checkPassword) {
			console.log("Password is different");
			setPasswordError(true);
			return;
		} else if (username === "" || email === "") {
			console.log("Username or email is empty!");
			return;
		}

		//fixme::default image for users that don't supply profile image
		const response = await fetch(imagePath);
		const blob = await response.blob();

		const pathRef = ref(storage, username);

		uploadBytes(pathRef, blob).then((snapshot) => {
			console.log("uploaded blob");

			getDownloadURL(pathRef).then(async (imageUrl) => {
				await axios
					.post(`users/insert-user`, {
						username: username,
						userPassword: password,
						firstName: firstName,
						lastName: lastName,
						DoB: date.toISOString().split("T")[0],
						imagePath: imageUrl,
						email: email,
						profileBio: bio,
					})
					.then(async () => {
						const userInfo = {
							username: username,
							userPassword: password,
							firstName: firstName,
							lastName: lastName,
							DoB: date.toISOString().split("T")[0],
							imagePath: imageUrl,
							email: email,
							profileBio: bio,
						};
						setAuth({user: userInfo});
						console.log("profile saved");

						await axios
							.get(`users/username/${username}`)
							.then(async (response) => {
								const newUserInfo = auth;
								newUserInfo.user = {
									...userInfo.user,
									id: response.data[0].id,
								};
								setAuth(newUserInfo);
								await axios.post(
									`weekly-schedule/insert/private/${"My First Workout"}/0/${
										response.data[0].id
									}`
								);
							})
							.then(() => {
								navigation.navigate("Front Page");
							});
					});
			});
		});
	};

	return (
		<SafeAreaView style={{flex: 1, maxHeight: "100%"}}>
			<ImageBackground style={styles.backgroundColor}>
				<SvgImage
					style={{
						position: "absolute",
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
					}}
				/>
				<ScrollView
					style={{flex: 1, maxHeight: "100%"}}
					//stickyHeaderIndices={[0]}
					showsVerticalScrollIndicator={false}
					alwaysBounceVertical={false}
				>
					<ImagePick image={imagePath} setImage={setImagePath} />
					<TextInput
						style={styles.textInputStyle}
						error={usernameError}
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
					<TextInput
						style={styles.textInputStyle}
						label={"Email"}
						value={email}
						textContentType={"emailAddress"}
						onChangeText={setEmail}
					/>
					<TextInput
						style={styles.textInputStyle}
						label={"Date of Birth"}
						value={date.toLocaleDateString(undefined, options)}
						editable={false}
					/>
					<InsertDate show={show} setShow={setShow} date={date} setDate={setDate} />

					<TextInput
						style={styles.bioInputStyle}
						label={"Bio"}
						value={bio}
						multiline={true}
						onChangeText={setBio}
					/>
					<TextInput
						style={styles.textInputStyle}
						error={passwordError}
						secureTextEntry={true}
						label={"Password"}
						value={password}
						textContentType={"password"}
						onChangeText={setPassword}
					/>
					<TextInput
						style={styles.textInputStyle}
						error={passwordError}
						secureTextEntry={true}
						label={"Re-input Password"}
						value={checkPassword}
						textContentType={"password"}
						onChangeText={setCheckPassword}
					/>
					<Button
						style={styles.buttonSave}
						icon="content-save"
						mode="contained"
						buttonColor="#ff0000"
						onPress={saveProfile}
					/>
				</ScrollView>
			</ImageBackground>
		</SafeAreaView>
	);
};

export default Signup;
