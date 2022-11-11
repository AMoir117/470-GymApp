import React, {useState, useEffect, useContext, createContext} from "react";
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
import {Divider, Appbar, Button, Avatar, Portal, Card, Title, Paragraph} from "react-native-paper";
import axios from "axios";
import AuthContext from "../../Context/AuthProvider";
import GlobalStyles from "../GlobalStyles";
import * as FS from "expo-file-system";
import {getStorage, ref, getDownloadURL} from "firebase/storage";
import {initializeApp} from "firebase/app";
import firebaseConfig from "../../../firebaseConfig";

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
		width: 250,
		marginTop: 30,
		alignSelf: "center",
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
	},
});
const ProfileViewer = (props) => {
	const app = initializeApp(firebaseConfig);
	const storage = getStorage(app);
	const pathRef = ref(storage, "admin"); //todo:: set second argument to user pathFileName

	const {auth} = useContext(AuthContext);
	const [uri, setUri] = useState(undefined);

	const username = auth.user.username;
	const firstName = auth.user.firstName;
	const lastName = auth.user.lastName;
	const bio = auth.user.profileBio;
	const Dob = auth.user.DoB;
	const pathFileName = auth.user.imagePath;

	useEffect(() => {
		// getDownloadURL(pathRef).then(async (url) => {
		// 	console.log(url);
		// 	setUri(url);
		// });
	}, []);

	return (
		<SafeAreaView style={{flex: 1, maxHeight: "100%"}}>
			<Card style={{backgroundColor: GlobalStyles.hexColor.brown}}>
				<Card.Cover style={{top: 0}} source={{uri: pathFileName}} />
				<Card.Title title={firstName + " " + lastName[0] + "."} subtitle={username} />
				<Card.Content>
					<Title>Bio</Title>
					<Divider style={{borderWidth: 1}} />
					<Paragraph>{bio}</Paragraph>
				</Card.Content>
			</Card>
		</SafeAreaView>
	);
};

export default ProfileViewer;
