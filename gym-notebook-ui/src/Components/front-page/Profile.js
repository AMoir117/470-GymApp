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
	ImageBackground,
} from "react-native";
import {Divider, Appbar, Button, Avatar} from "react-native-paper";
import axios from "axios";

const styles = StyleSheet.create({
	backgroundImage: {
		flex: 1,
		backgroundColor: "#000000",
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
const Profile = ({navigation, back}) => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [bio, setBio] = useState("");

	const [alertVisible, setAlertVisible] = useState(false);

	useEffect(() => {
		setUsername("NotAnAthlete");
		setFirstName("John");
		setLastName("Smith");
		setEmail("not_an_athlete@gmail.com");
		setBio("I am not an athlete, I just move heavy objects from point A to point B.");
	}, []);

	const editProfile = () => {
		console.log("profile saved");
		//todo::edit information for user
	};

	return (
		<SafeAreaView style={{flex: 1, maxHeight: "100%"}}>
			<ImageBackground style={styles.backgroundImage}>
				<ScrollView
					style={{flex: 1, maxHeight: "100%"}}
					//stickyHeaderIndices={[0]}
					showsVerticalScrollIndicator={false}
					alwaysBounceVertical={false}
				>
					<View>
						<Avatar.Image
							style={styles.avatarStyle}
							size={150}
							source={require("../../../assets/arnold.jpg")}
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
					<Button
						style={styles.buttonSave}
						icon="pencil"
						mode="contained"
						buttonColor="red"
						onPress={editProfile}
					/>
				</ScrollView>
			</ImageBackground>
		</SafeAreaView>
	);
};

export default Profile;
