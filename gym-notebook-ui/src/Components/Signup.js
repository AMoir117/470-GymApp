import React, {useState, useEffect} from "react";
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
import InsertDate from "./InsertDate";
import ImagePick from "./ImagePicker";
import axios from "axios";

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
	month: "long",
	day: "numeric",
};

const Signup = ({navigation, back}) => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [bio, setBio] = useState("");
	const [show, setShow] = useState(false);
	const [date, setDate] = useState(new Date());

	useEffect(() => {}, []);

	const saveProfile = () => {
		navigation.navigate("Login");
		console.log("profile saved");
		//todo::save information for new user
		console.log(`${date.getDate()}, ${date.getDay()}, ${date.getFullYear()}`);
		console.log(date.toLocaleDateString(undefined, options));
		console.log(Platform.OS);
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
					<ImagePick />
					<TextInput
						style={styles.textInputStyle}
						placeholder={"Username"}
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
						placeholder={"Email"}
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
						value={password}
						textContentType={"password"}
						onChangeText={setPassword}
					/>
					<Button
						style={styles.buttonSave}
						icon="content-save"
						mode="contained"
						buttonColor="#ff0000"
						onPress={saveProfile}
						//todo::determine if signing up or looking at own profile
					/>
				</ScrollView>
			</ImageBackground>
		</SafeAreaView>
	);
};

export default Signup;
