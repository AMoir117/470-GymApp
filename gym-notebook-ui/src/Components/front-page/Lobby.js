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
	TouchableOpacity,
} from "react-native";
import {DataTable, Avatar, Surface, Badge, IconButton} from "react-native-paper";
import {useNavigation} from "@react-navigation/native";
import GlobalStyles from "../GlobalStyles";
import SvgImage2 from "../SvgImage2";

const styles = StyleSheet.create({
	backgroundColor: {
		flex: 1,
		backgroundColor: GlobalStyles.hexColor.black,
	},
	surfaceStyle: {
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

const Lobby = () => {
	//fixme:: lobby profiles not having bios
	const navigation = useNavigation();
	const [posts, setPosts] = useState([]);
	const [upvotes, setUpvotes] = useState();


	useEffect(() => {
		async function getLobby() {
			await axios.get("weekly-schedule/lobby").then((response) => {
				setPosts(response.data);
				setUpvotes(response.data.upvotes);
			});
		}
		getLobby();
	}, [upvotes]);

	const renderPosts = ({item}) => {
		return (
			<Surface style={styles.surfaceStyle} numColumns={3} elevation={1}>
				<TouchableOpacity
					onPress={() => {
						clickUserProfile(item);
					}}
				>
					<Avatar.Image style={styles.avatarStyle} size={50} source={item.imagePath} />
				</TouchableOpacity>
				<View style={{flex: 1}}>
					<Text style={styles.postTitle}>{item.title}</Text>
					<Text style={styles.postUsername}>{item.username}</Text>
				</View>
				<View>
					<Badge style={styles.upVoteBadge}>{item.upvotes}</Badge>
					<IconButton
						style={styles.upVoteButton}
						icon="arrow-up-drop-circle"
						iconColor={'red'}
						animate={true}
						selected={true}
						onPress={() => {
							incrementUpvotes(item);
						}}
					/>
				</View>
			</Surface>
		);
	};

	const clickUserProfile = (item) => {
		console.log(item);
		navigation.navigate("Profile View", {userProfile: item});
	};

	const incrementUpvotes = (item) => {
		console.log(item);
		axios.put(`weekly-schedule/increment-upvotes/${item.id}`).then((response) => {
			const temp = upvotes + 1;
			setUpvotes(temp);
		});
	};

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
