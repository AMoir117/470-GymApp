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
	TouchableOpacity,
	ImageBackground,
} from "react-native";
import {DataTable, Avatar, Surface, Portal} from "react-native-paper";
import GlobalStyles from "../GlobalStyles";
import ProfileViewer from "./ProfileViewer";

const styles = StyleSheet.create({
	backgroundImage: {
		flex: 1,
		backgroundColor: GlobalStyles.hexColor.black,
	},
	surfaceStyle: {
		height: 140,
		width: 140,
		borderRadius: 20,
		margin: 20,
		alignSelf: "center",
		backgroundColor: GlobalStyles.hexColor.brown,
	},
	flatListContainer: {
		alignSelf: "center",
	},
	addButton: {
		width: 40,
		height: 40,
		borderRadius: 20,
		margin: 5,
		backgroundColor: GlobalStyles.hexColor.red,
		alignSelf: "center",
	},
	userNameStyle: {
		height: 20,
		margin: 5,
		alignSelf: "center",
	},
	addTextStyle: {
		height: 20,
		margin: 1,
		alignSelf: "center",
		color: "#ffffff",
	},
	avatarStyle: {
		alignSelf: "center",
		margin: 5,
		backgroundColor: GlobalStyles.hexColor.white,
	},
});

const friends = [
	{
		userID: "01",
		imgUrl: require("../../../assets/arnold.jpg"),
		userName: "Arnie47",
	},
	{
		userID: "02",
		imgUrl: require("../../../assets/anush.jpg"),
		userName: "theMosster",
	},
	{
		userID: "03",
		imgUrl: require("../../../assets/ronnie-coleman.png"),
		userName: "LightW8",
	},
];

const clickUserProfile = (item) => {
	console.log(item);
	return (
		<Portal>
			<ProfileViewer userName={item.userName} userID={item.userID} imgUrl={item.imgUrl} />
		</Portal>
	);
	//fixme:: make it so when clicked routes to a view of friends profile
};

const renderProfile = ({item}) => {
	//fixme::how to require image dynamically
	return (
		<Surface style={styles.surfaceStyle} elevation={1}>
			<TouchableOpacity onPress={() => clickUserProfile(item)}>
				<Avatar.Image style={styles.avatarStyle} size={100} source={item.imgUrl} />
			</TouchableOpacity>
			<Text style={styles.userNameStyle}>{item.userName}</Text>
		</Surface>
	);
};

const FriendsList = ({navigation}) => {
	console.log(navigation);
	//navigation.navigate("Login");

	return (
		<SafeAreaView style={{flex: 1, maxHeight: "100%"}}>
			<ImageBackground style={styles.backgroundImage}>
				<FlatList
					style={styles.flatListContainer}
					numColumns={2}
					showsVerticalScrollIndicator={false}
					alwaysBounceVertical={true}
					data={friends}
					renderItem={renderProfile}
					keyExtractor={(item) => item.userID}
				/>
				<Surface style={styles.addButton} elevation={1}>
					<Avatar.Image
						style={styles.avatarStyle}
						size={30}
						source={require("../../../assets/add.png")}
					/>
				</Surface>
			</ImageBackground>
		</SafeAreaView>
	);
};

export default FriendsList;
