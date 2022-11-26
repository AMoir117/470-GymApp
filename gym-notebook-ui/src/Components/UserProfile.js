import React, {useEffect, useContext} from "react";
import {StyleSheet, SafeAreaView} from "react-native";
import {Divider, Card, Title, Paragraph} from "react-native-paper";
import AuthContext from "../Context/AuthProvider";
import GlobalStyles from "./GlobalStyles";

const styles = StyleSheet.create({});
const UserProfile = (props) => {
	const {auth} = useContext(AuthContext);

	useEffect(() => {}, []);

	return (
		<SafeAreaView style={{flex: 1, maxHeight: "100%"}}>
			<Card style={{backgroundColor: GlobalStyles.hexColor.brown}}>
				<Card.Cover
					style={{top: 0}}
					source={{
						uri: auth.user.imagePath,
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
