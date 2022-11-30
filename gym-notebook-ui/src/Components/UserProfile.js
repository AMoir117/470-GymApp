import React, {useState, useEffect, useContext, createContext, useInsertionEffect} from "react";
import {ScrollView, Text, StyleSheet, View, FlatList, TextInput, Pressable, SafeAreaView, ImageBackground} from "react-native";
import {Divider, Appbar, Button, Avatar, Portal, Card, Title, Paragraph, IconButton} from "react-native-paper";
import AuthContext from "../Context/AuthProvider";
import GlobalStyles from "./GlobalStyles";
import {getDownloadURL, ref, uploadBytes, getStorage} from "firebase/storage";

import {initializeApp} from "firebase/app";
import firebaseConfig from "../../firebaseConfig";
import ImagePick from "./Modules/ImagePicker";
import {useIsFocused} from "@react-navigation/native";

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
		alignSelf: "center",
		height: 30,
		width: 70,
		position: "absolute",
		bottom: 0,
		margin: 20,
		borderColor: "#949494",
		backgroundColor: "#949494",
	},
	buttonText: {
		fontSize: 20,
		color: "#000000",
		textAlign: "center",
	},
	avatarStyle: {
		margin: 10,
		alignSelf: "center",
	},
});
const UserProfile = ({navigation, back}) => {
	const [image, setImage] = useState(undefined);

	const {auth} = useContext(AuthContext);

	const app = initializeApp(firebaseConfig);
	const storage = getStorage(app);

	const [imgPath, setImgPath] = useState(auth.user.imagePath);
	const isFocused = useIsFocused();

	useEffect(() => {}, [navigation, isFocused]);

	const changeToEditable = async () => {
		navigation.navigate("Editable User Profile");
	};

	return (
		<SafeAreaView style={{flex: 1, maxHeight: "100%"}}>
			<Card style={{backgroundColor: GlobalStyles.hexColor.brown, padding: 30}}>
				<Avatar.Image style={styles.avatarStyle} size={200} source={{uri: imgPath}} />

				<Card.Title title={auth.user.firstName + " " + auth.user.lastName} subtitle={auth.user.username} />
				<Card.Content>
					<Title>Bio</Title>
					<Divider style={{borderWidth: 1}} />
					<Paragraph>{auth.user.profileBio}</Paragraph>
				</Card.Content>
			</Card>
			<IconButton style={styles.buttonStyle} icon="file-edit" iconColor={"red"} animate={true} selected={true} onPress={changeToEditable} />
		</SafeAreaView>
	);
};

export default UserProfile;
