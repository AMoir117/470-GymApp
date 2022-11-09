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
	const {auth} = useContext(AuthContext);

	const username = auth.user.username;
	const firstName = auth.user.firstName;
	const lastName = auth.user.lastName;
	const Dob = auth.user.DoB;

	/*

  username VARCHAR(25) NOT NULL UNIQUE,
  firstName VARCHAR(20),
  lastName VARCHAR(20),
  DoB DATE,
  imagePath VARCHAR(100),


	*/

	const User = {
		username: "arnolds17",
		firstName: "Arnold",
		lastName: "Schwarzenegger",
		Dob: "1947-07-03",
		bio: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur porta ex sit amet odio volutpat tincidunt. Quisque eleifend suscipit quam, vitae ultricies dui. Fusce nibh nibh, gravida non arcu quis, cursus luctus enim. Vivamus vitae porttitor orci, sed rutrum nulla. Pellentesque euismod sagittis lobortis. Sed tincidunt arcu non nisi porttitor.`,
		imagePath: require("../../../assets/arnold.jpg"),
	};

	useEffect(() => {
		//const bio = auth.user.bio;
		//const imagePath = auth.user.imagePath;
	}, []);

	return (
		<SafeAreaView style={{flex: 1, maxHeight: "100%"}}>
			<Card style={{backgroundColor: GlobalStyles.hexColor.brown}}>
				<Card.Cover source={User.imagePath} />
				<Card.Title title={firstName + " " + lastName[0] + "."} subtitle={username} />
				<Card.Content>
					<Title>Bio</Title>
					<Divider style={{borderWidth: 1}} />
					<Paragraph>{User.bio}</Paragraph>
				</Card.Content>
			</Card>
		</SafeAreaView>
	);
};

export default ProfileViewer;
