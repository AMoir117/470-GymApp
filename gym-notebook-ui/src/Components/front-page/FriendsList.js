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
import {DataTable, Avatar, Surface} from "react-native-paper";

const styles = StyleSheet.create({
	surfaceStyle: {
		height: 140,
		width: 140,
		borderRadius: 20,
		alignSelf: "center",
	},
	flatListContainer: {
		alignSelf: "center",
	},
	addButton: {
		width: 90,
		height: 90,
		borderRadius: 20,
		backgroundColor: "#ff0000",
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
		backgroundColor: "#ffffff",
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

const renderProfile = ({item}) => {
	//fixme::how to require image dynamically
	return (
		<Surface style={styles.surfaceStyle} elevation={1}>
			<Avatar.Image style={styles.avatarStyle} size={100} source={item.imgUrl} />
			<Text style={styles.userNameStyle}>{item.userName}</Text>
		</Surface>
	);
};

const FriendsList = () => {
	return (
		<SafeAreaView style={{flex: 1, maxHeight: "100%"}}>
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
					size={50}
					source={require("../../../assets/add.png")}
				/>
				<Text style={styles.addTextStyle}>Add</Text>
			</Surface>
		</SafeAreaView>
	);
};

export default FriendsList;
