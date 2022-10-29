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
		height: 60,
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
		width: 140,
		height: 140,
		borderRadius: 20,
		alignSelf: "center",
	},
	userNameStyle: {
		height: 20,
		margin: 5,
		alignSelf: "center",
	},
	postTitleStyle: {
		height: 20,
		margin: 5,
		alignSelf: "center",
	},
	upVoteStyle: {
		height: 20,
		margin: 5,
		textAlign: "end",
		alignSelf: "center",
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
		postTitle: "How to build you back in 6 months",
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
			<View>
				<Avatar.Image style={styles.avatarStyle} size={50} source={item.imgUrl} />
				<Text style={styles.userNameStyle}>{item.userName}</Text>
			</View>
			<Text style={styles.postTitleStyle}>{item.postTitle}</Text>
			<Text style={styles.upVoteStyle}>{item.upVotes}</Text>
		</Surface>
	);
};

const FriendsList = () => {
	return (
		<SafeAreaView style={{flex: 1, maxHeight: "100%"}}>
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
					size={100}
					source={require("../../../assets/add.png")}
				/>
				<Text style={styles.userNameStyle}>New Post</Text>
			</Surface>
		</SafeAreaView>
	);
};

export default FriendsList;
