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
import {DataTable, Avatar} from "react-native-paper";

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

const friends = [
	{
		userID: "01",
		imgUrl: require("../../../assets/arnold.jpg"),
		userName: "Arnie47",
	},
	{
		userID: "02",
		imgUrl: require("../../../assets/anush.jpg"),
		userName: "Anush_Gorak",
	},
];

const renderProfile = ({item}) => {
	console.log(item.imgUrl);
	//fixme::how to require image dynamically
	return <Avatar.Image style={styles.avatarStyle} size={150} source={item.imgUrl} />;
};

const FriendsList = () => {
	return (
		<SafeAreaView>
			<FlatList
				showsVerticalScrollIndicator={false}
				alwaysBounceVertical={true}
				data={friends}
				renderItem={renderProfile}
				//keyExtractor={(item) => item}
			/>
		</SafeAreaView>
	);
};

export default FriendsList;
