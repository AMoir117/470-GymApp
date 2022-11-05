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
import GlobalStyles from "../GlobalStyles";
import SvgImage2 from "../SvgImage2";

const styles = StyleSheet.create({
	backgroundColor: {
		flex: 1,
		backgroundColor: GlobalStyles.hexColor.black,
	},
	surfaceStyle: {
		height: 80,
		width: 350,
		borderRadius: 20,
		flex: 1,
		marginTop: 20,
		flexDirection: "row",
		alignSelf: "center",
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
		backgroundColor: GlobalStyles.hexColor.white,
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
			<SvgImage2
				style={{
					position: "absolute",
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
				}}
			/>
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
					size={30}
					source={require("../../../assets/add.png")}
				/>
				<Text style={styles.addTextStyle}>Post</Text>
			</Surface>
		</SafeAreaView>
	);
};

export default FriendsList;
