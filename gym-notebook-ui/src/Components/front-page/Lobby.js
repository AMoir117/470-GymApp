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
import {DataTable, Avatar, Surface} from "react-native-paper";

const styles = StyleSheet.create({
	backgroundImage: {
		flex: 1,
		backgroundColor: "#000000",
	},
	surfaceStyle: {
		height: 80,
		width: 350,
		borderRadius: 20,
		flex: 1,
		flexDirection: "row",
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
	addTextStyle: {
		height: 20,
		margin: 1,
		alignSelf: "center",
		color: "#ffffff",
	},
	userNameStyle: {
		height: 20,
		margin: 1,
		alignSelf: "center",
	},
	postTitleStyle: {
		height: 20,
		margin: 10,
		alignSelf: "center",
	},
	upVoteStyle: {
		height: 20,
		margin: 5,
		flex: 1,
		alignSelf: "center",
		textAlign: "right",
		color: "#93c47d",
	},
	avatarStyle: {
		alignSelf: "center",
		margin: 5,
		backgroundColor: "#ffffff",
	},
});

const posts = [
	{
		postID: "01",
		imgUrl: require("../../../assets/arnold.jpg"),
		userName: "Arnie47",
		postTitle: "How to build your back in 6 months",
		upVotes: 93,
	},
	{
		postID: "02",
		imgUrl: require("../../../assets/ronnie-coleman.png"),
		userName: "LightW8",
		postTitle: "light weight to heavy weight!!!",
		upVotes: 68,
	},
];

const renderPosts = ({item}) => {
	//fixme::how to require image dynamically
	return (
		<Surface style={styles.surfaceStyle} numColumns={3} elevation={1}>
			<Avatar.Image style={styles.avatarStyle} size={50} source={item.imgUrl} />
			<Text style={styles.postTitleStyle}>{item.postTitle}</Text>
			<Text style={styles.upVoteStyle}>{item.upVotes}</Text>
		</Surface>
	);
};

const FriendsList = () => {
	return (
		<SafeAreaView style={{flex: 1, maxHeight: "100%"}}>
			<ImageBackground style={styles.backgroundImage}>
				<FlatList
					style={styles.flatListContainer}
					numColumns={1}
					showsVerticalScrollIndicator={false}
					alwaysBounceVertical={true}
					data={posts}
					renderItem={renderPosts}
					keyExtractor={(item) => item.postID}
				/>
				<Surface style={styles.addButton} elevation={1}>
					<Avatar.Image
						style={styles.avatarStyle}
						size={50}
						source={require("../../../assets/add.png")}
					/>
					<Text style={styles.addTextStyle}>Post</Text>
				</Surface>
			</ImageBackground>
		</SafeAreaView>
	);
};

export default FriendsList;
