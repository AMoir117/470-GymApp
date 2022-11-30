import axios from "axios";
import React, {useState, useEffect, useContext} from "react";
import {Text, StyleSheet, View, FlatList, SafeAreaView, TouchableOpacity} from "react-native";
import {Avatar, Surface, Badge, IconButton} from "react-native-paper";
import {useNavigation} from "@react-navigation/native";
import GlobalStyles from "../GlobalStyles";
import SvgComponent from "../../SVG_Backgrounds/Lobby-bg";
import AuthContext from "../../Context/AuthProvider";

const styles = StyleSheet.create({
	surfaceStyle: {
		width: 400,
		borderRadius: 0,
		backgroundColor: GlobalStyles.hexColor.brown,
		flex: 1,
		marginTop: 10,
		flexDirection: "row",
	},
	flatListContainer: {
		alignSelf: "center",
	},
	postTitle: {
		fontSize: 20,
	},
	postUsername: {
		fontSize: 15,
		position: "absolute",
		bottom: 0,
	},
	upVoteBadge: {
		alignSelf: "center",
		color: "#93c47d",
		margin: 5,
		backgroundColor: GlobalStyles.hexColor.black,
	},
	upVoteButton: {
		alignSelf: "center",
		margin: 5,
	},
	avatarStyle: {
		alignSelf: "center",
		margin: 10,
	},
});

const Lobby = () => {
	const navigation = useNavigation();
	const [posts, setPosts] = useState([]);
	const [upvotes, setUpvotes] = useState();
	const {auth} = useContext(AuthContext);

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
					<Avatar.Image style={styles.avatarStyle} size={50} source={{uri: item.imagePath}} />
				</TouchableOpacity>
				<View style={{flex: 1}}>
					<Text style={styles.postTitle}>{item.title}</Text>
					<Text style={styles.postUsername}>{item.username}</Text>
				</View>
				<View style={{justifyContent: "center"}}>
					<Badge style={styles.upVoteBadge}>{item.upvotes}</Badge>
					<IconButton
						style={styles.upVoteButton}
						icon="arrow-up-drop-circle"
						iconColor={"red"}
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
		if (item.userId === auth.user.id) {
			navigation.navigate("User Profile");
		} else {
			navigation.navigate("Profile View", {userProfile: item});
		}
	};

	const incrementUpvotes = (item) => {
		axios.put(`weekly-schedule/increment-upvotes/${item.id}`).then((response) => {
			const temp = upvotes + 1;
			setUpvotes(temp);
		});
	};

	return (
		<SafeAreaView style={{flex: 1, maxHeight: "100%"}}>
			<SvgComponent
				style={{
					position: "absolute",
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					zIndex: -1,
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
