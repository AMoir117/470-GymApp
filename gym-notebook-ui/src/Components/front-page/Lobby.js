import axios from "axios";
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
import {DataTable, Avatar, Surface, Badge, IconButton} from "react-native-paper";
import GlobalStyles from "../GlobalStyles";
import SvgImage2 from "../SvgImage2";

const styles = StyleSheet.create({
	backgroundColor: {
		flex: 1,
		backgroundColor: GlobalStyles.hexColor.black,
	},
	surfaceStyle: {
		height: "auto",
		width: 400,
		borderRadius: 5,
		backgroundColor: GlobalStyles.hexColor.brown,
		flex: 1,
		marginTop: 20,
		flexDirection: "row",
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
		alignSelf: "center",
		color: "#ffffff",
	},
	postTitle: {
		height: 20,

		flex: 1,
	},
	postUsername: {
		fontSize: 10,
		height: 20,
		marginTop: 10,
		flex: 1,
	},
	upVoteBadge: {
		margin: 5,
		color: "#93c47d",
		backgroundColor: GlobalStyles.hexColor.black,
	},
	upVoteButton: {
		margin: 5,
	},
	avatarStyle: {
		alignSelf: "center",
		margin: 5,
		backgroundColor: GlobalStyles.hexColor.white,
	},
});

const renderPosts = ({item}) => {
	return (
		<Surface style={styles.surfaceStyle} numColumns={3} elevation={1}>
			<Avatar.Image style={styles.avatarStyle} size={50} source={item.imagePath} />
			<View style={{flex: 1}}>
				<Text style={styles.postTitle}>{item.title}</Text>
				<Text style={styles.postUsername}>{item.username}</Text>
			</View>
			<View>
				<Badge style={styles.upVoteBadge}>{item.upvotes}</Badge>
				<IconButton
					style={styles.upVoteButton}
					icon="arrow-up-drop-circle"
					animate={true}
					selected={true}
				/>
			</View>
		</Surface>
	);
};

const Lobby = () => {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		const lobby = async () => {
			const newPostsArray = posts.slice();
			await axios.get("weekly-schedule/lobby").then((response) => {
				response.data.map(async (post) => {
					await axios
						.get(`users/id/${post.userID}`)
						.then((userResponse) => {
							const newPost = {
								username: userResponse.data[0].username,
								title: post.title,
								upvotes: post.upvotes,
								imagePath: userResponse.data[0].imagePath,
								id: post.id,
							};
							newPostsArray.push(newPost);
						})
						.then(() => {
							setPosts(newPostsArray);
						});
				});
			});
		};
		lobby();
	}, []);

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
				keyExtractor={(item) => item.id}
			/>
		</SafeAreaView>
	);
};

export default Lobby;
