import React, {useState, useEffect} from "react";
import {
	ScrollView,
	Text,
	StyleSheet,
	View,
	FlatList,
	TextInput,
	Pressable,
	SafeAreaView,
} from "react-native";
import {Divider, Appbar, Button, Avatar} from "react-native-paper";
import axios from "axios";

const styles = StyleSheet.create({
	areaView: {
		height: 1200,
	},
	textTitle: {
		fontSize: 30,
		alignSelf: "center",
	},
	textInputStyle: {
		height: 40,
		width: 250,
		borderWidth: 1,
		paddingLeft: 10,
		marginTop: 30,
		alignSelf: "center",
		borderColor: "#000000",
		backgroundColor: "#FFFFFF",
	},
	bioInputStyle: {
		height: 100,
		width: 250,
		borderWidth: 1,
		paddingLeft: 10,
		marginTop: 30,
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
const Signup = ({navigation, back}) => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [bio, setBio] = useState("");

	const [alertVisible, setAlertVisible] = useState(false);

	useEffect(() => {}, []);

	const saveProfile = () => {
		navigation.navigate("Login");
		console.log("profile saved");
		//todo::save information for new user
	};

	return (
		<SafeAreaView style={{flex: 1, maxHeight: "100%"}}>
			<ScrollView
				style={{flex: 1, maxHeight: "100%"}}
				//stickyHeaderIndices={[0]}
				showsVerticalScrollIndicator={false}
				alwaysBounceVertical={false}
			>
				{/* <View>
					<Appbar.Header alignSelf="center">
						{back ? (
							<Appbar.BackAction
								onPress={() => {
									navigation.goBack;
								}}
							/>
						) : null}
						<Appbar.Content title="MY PROFILE" mode="center-align" alignSelf="center" />
					</Appbar.Header>

					<Divider
						style={{borderColor: "#ff0000", borderWidth: 3, borderRadius: 5}}
						horizontalInset="3"
					/>
				</View> */}
				<View>
					<Avatar.Image
						style={styles.avatarStyle}
						size={150}
						//source={require("../../assets/pexels-anush-gorak-1431283.jpg")}
					/>
				</View>
				<View>
					<Pressable color={"#026df7"} onPress={() => {}}>
						<Text style={styles.textUploadImage}>Upload Image</Text>
					</Pressable>
				</View>
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
					textContentType={"emailAddress"}
					onChangeText={setPassword}
				/>
				<TextInput
					style={styles.textInputStyle}
					secureTextEntry={true}
					placeholder={"Re-input Password"}
					value={password}
					textContentType={"emailAddress"}
					onChangeText={setPassword}
				/>
				<Button
					style={styles.buttonSave}
					icon="content-save"
					mode="contained"
					buttonColor="red"
					onPress={saveProfile}
					//todo::determine if signing up or looking at own profile
				/>
			</ScrollView>
		</SafeAreaView>
	);
};

export default Signup;
