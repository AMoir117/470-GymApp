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
import AuthContext from "../Context/AuthProvider";
import GlobalStyles from "./GlobalStyles";

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
const UserProfile = (props) => {
	const {auth} = useContext(AuthContext);
	const uri = auth.user.imagePath;

	useEffect(() => {
		console.log(auth.user.imagePath);
	}, []);

	return (
		<SafeAreaView style={{flex: 1, maxHeight: "100%"}}>
			<Card style={{backgroundColor: GlobalStyles.hexColor.brown}}>
				<Card.Cover
					style={{top: 0}}
					source={{
						url: "https://firebasestorage.googleapis.com/v0/b/gymapp-470.appspot.com/o/admin?alt=media&token=87081d39-0e27-47e8-a8fc-a0e24abb9ff2",
					}}
				/>
				<Card.Title
					title={auth.user.firstName + " " + auth.user.lastName + "."}
					subtitle={auth.user.username}
				/>
				<Card.Content>
					<Title>Bio</Title>
					<Divider style={{borderWidth: 1}} />
					<Paragraph>{auth.user.profileBio}</Paragraph>
				</Card.Content>
			</Card>
		</SafeAreaView>
	);
};

export default UserProfile;
