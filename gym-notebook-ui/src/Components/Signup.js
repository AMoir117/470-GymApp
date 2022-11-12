import React, {useState, useEffect, useContext} from "react";
import {
	ScrollView,
	Text,
	StyleSheet,
	View,
	FlatList,
	Pressable,
	TextInput,
	SafeAreaView,
	Platform,
	ImageBackground,
} from "react-native";
import {Divider, Appbar, Button, Avatar, Dialog} from "react-native-paper";
import WheelPickerExpo from "react-native-wheel-picker-expo";
import InsertDate from "./Modules/InsertDate";
import ImagePick from "./Modules/ImagePicker";
import axios from "axios";
import AuthContext from "../Context/AuthProvider";

import SvgImage from "./SvgImage";
import GlobalStyles from "./GlobalStyles";

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

	const {setAuth} = useContext(AuthContext);

	useEffect(() => {}, []);

	const saveProfile = async () => {
		if (password !== checkPassword) {
			console.log("Password is different");
			return;
		} else if (username === "" || email === "") {
			console.log("Username or email is empty!");
			return;
		} else {
			console.log(username);
			return;
		}
		await axios
			.post(`users/insert-user`, {
				username: username,
				userPassword: password,
				firstName: firstName,
				lastName: lastName,
				DoB: date.toISOString().split("T")[0],
				imagePath: imagePath,
				email: email,
				profileBio: bio,
			})
			.then((response) => {
				const userInfo = {
					username: username,
					userPassword: password,
					firstName: firstName,
					lastName: lastName,
					DoB: date.toISOString().split("T")[0],
					imagePath: imagePath,
					email: email,
					profileBio: bio,
				};
				setAuth({user: userInfo});
				console.log("profile saved");
				navigation.navigate("Front Page");
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
						placeholder={"*Username"}
						value={username}
						textContentType={"username"}
						onChangeText={setUsername}
					/>
					<TextInput
						style={styles.textInputStyle}
						placeholder={"First Name"}
						value={firstName}
						textContentType={"givenName"}
						onChangeText={setFirstName}
					/>
					<TextInput
						style={styles.textInputStyle}
						placeholder={"Last Name"}
						value={lastName}
						textContentType={"lastName"}
						onChangeText={setLastName}
					/>
					<TextInput
						style={styles.textInputStyle}
						placeholder={"*Email"}
						value={email}
						textContentType={"emailAddress"}
						onChangeText={setEmail}
					/>
					<TextInput
						style={styles.textInputStyle}
						placeholder={"Date of Birth"}
						value={date.toLocaleDateString(undefined, options)}
						editable={false}
					/>
					<InsertDate show={show} setShow={setShow} date={date} setDate={setDate} />
					{/* <WheelPickerExpo
					height={300}
					width={150}
					initialSelectedIndex={3}
					items={CITIES.map((name) => ({label: name, value: ""}))}
					onChange={() => {}}
				/> */}
					<TextInput
						style={styles.bioInputStyle}
						placeholder={"Bio"}
						value={bio}
						multiline={true}
						onChangeText={setBio}
					/>
					<TextInput
						style={styles.textInputStyle}
						secureTextEntry={true}
						placeholder={"Password"}
						value={password}
						textContentType={"password"}
						onChangeText={setPassword}
					/>
					{/*fixme::check if second password is the same as first password*/}
					<TextInput
						style={styles.textInputStyle}
						secureTextEntry={true}
						placeholder={"Re-input Password"}
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
