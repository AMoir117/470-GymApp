import React, {useState, useEffect, useContext} from "react";
import {ScrollView, StyleSheet, SafeAreaView} from "react-native";
import {Button, TextInput} from "react-native-paper";
import InsertDate from "./Modules/InsertDate";
import ImagePick from "./Modules/ImagePicker";
import axios from "axios";
import AuthContext from "../Context/AuthProvider";
import SvgImage from "../SVG_Backgrounds/SvgImage";
import GlobalStyles from "./GlobalStyles";
import {getStorage, ref, getDownloadURL, uploadBytes} from "firebase/storage";
import {getAuth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile} from "firebase/auth";
import {initializeApp} from "firebase/app";
import firebaseConfig from "../../firebaseConfig";

const styles = StyleSheet.create({
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
	buttonSave: {
		height: 40,
		width: 100,
		marginTop: 20,
		alignSelf: "center",
	},
});

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
	const firebaseAuth = getAuth(app);

	const [usernameError, setUsernameError] = useState(false);
	const [passwordError, setPasswordError] = useState(false);

	useEffect(() => {}, []);

	const saveProfile = async () => {
		// await axios.get(`users/username/${username}`).then((response) => {
		// 	if (response.data.length > 0) {
		// 		console.log("username is not available");
		// 		setUsernameError(true);
		// 	} else {
		// 		setUsernameError(false);
		// 	}
		// 	return;
		// });
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

		createUserWithEmailAndPassword(firebaseAuth, email, password).then((userCredential) => {
			sendEmailVerification(firebaseAuth.currentUser);

			updateProfile(firebaseAuth.currentUser, {displayName: username});
			uploadBytes(pathRef, blob).then((snapshot) => {
				console.log("uploaded blob");

				getDownloadURL(pathRef).then(async (imageUrl) => {
					await axios
						.post(`users/insert-user`, {
							uid: userCredential.user.uid,
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
							await axios.get(`users/uid/${userCredential.user.uid}`).then(async (response) => {
								const user_id = response.data[0].id;
								await axios.post(`weekly-schedule/insert/private/${"My First Workout"}/0/${user_id}`).then(async () => {
									await axios.get("weekly-schedule/last-insert-id").then(async (response) => {
										const userInfo = {
											id: user_id,
											uid: userCredential.user.uid,
											username: username,
											userPassword: password,
											firstName: firstName,
											lastName: lastName,
											DoB: date.toISOString().split("T")[0],
											imagePath: imageUrl,
											email: email,
											profileBio: bio,
											currentWeeklyScheduleId: response.data[0].lastInsertId,
										};
										setAuth({user: userInfo});
										await axios.put(`users/use-weekly-schedule/${response.data[0].lastInsertId}/${user_id}`).then(() => {
											navigation.navigate("Front Page");
										});
									});
								});
							});
						});
					});
				});
			}
		});
	};

	return (
		<SafeAreaView style={{flex: 1, maxHeight: "100%"}}>
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
				<TextInput style={styles.textInputStyle} label={"Email"} value={email} textContentType={"emailAddress"} onChangeText={setEmail} />
				<TextInput
					style={styles.textInputStyle}
					label={"Date of Birth"}
					value={date.toLocaleDateString(undefined, GlobalStyles.date)}
					editable={false}
				/>
				<InsertDate show={show} setShow={setShow} date={date} setDate={setDate} />

				<TextInput style={styles.bioInputStyle} label={"Bio"} value={bio} multiline={true} onChangeText={setBio} />
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
				<Button style={styles.buttonSave} icon="content-save" mode="contained" buttonColor="#ff0000" onPress={saveProfile} />
			</ScrollView>
		</SafeAreaView>
	);
};

export default Signup;
