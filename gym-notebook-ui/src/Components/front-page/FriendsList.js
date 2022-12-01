import React, {useState, useEffect, useContext} from "react";
import {Text, StyleSheet, FlatList, SafeAreaView, TouchableOpacity} from "react-native";
import {Avatar, Surface, IconButton} from "react-native-paper";
import GlobalStyles from "../GlobalStyles";
import AuthContext from "../../Context/AuthProvider";
import {useNavigation} from "@react-navigation/native";
import SvgComponent from "../../SVG_Backgrounds/Friends-bg";
import axios from "axios";

const styles = StyleSheet.create({
	surfaceStyle: {
		height: 160,
		width: 160,
		borderRadius: 20,
		margin: 20,
		alignSelf: "center",
		backgroundColor: GlobalStyles.hexColor.brown,
	},
	flatListContainer: {
		alignSelf: "center",
	},
	userNameStyle: {
		fontSize: 20,
		alignSelf: "center",
	},
	avatarStyle: {
		alignSelf: "center",
		margin: 10,
		backgroundColor: GlobalStyles.hexColor.white,
	},
	addUserButton: {
		alignSelf: "center",
		margin: 0,
		padding: 0,
		position: "absolute",
		bottom: 0,
	},
});

const FriendsList = () => {
	//brings navigation from parents
	const navigation = useNavigation();
	const {auth} = useContext(AuthContext);
	const [following, setFollowing] = useState([]);

	useEffect(() => {
		const getFollowers = async () => {
			console.log("getting followers use effect");

			console.log(auth.user.id);
			await axios.get(`users/get-followers/${auth.user.id}`).then((followersResponse) => {
				setFollowing(followersResponse.data);
			});
		};
		getFollowers();
	}, []);

	const clickUserProfile = (item) => {
		navigation.navigate("Profile View", {userProfile: item});
	};

	const RenderProfile = ({item}) => {
		return (
			<Surface style={styles.surfaceStyle} elevation={1}>
				<TouchableOpacity
					onPress={() => {
						clickUserProfile(item);
					}}
				>
					<Avatar.Image
						style={styles.avatarStyle}
						size={100}
						source={{uri: item.imagePath}}
					/>
				</TouchableOpacity>
				<Text style={styles.userNameStyle}>{item.username}</Text>
			</Surface>
		);
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
				}}
			/>
			<FlatList
				style={styles.flatListContainer}
				numColumns={2}
				showsVerticalScrollIndicator={false}
				alwaysBounceVertical={true}
				data={following}
				renderItem={RenderProfile}
				keyExtractor={(item) => item.userId}
			/>
			<IconButton
				icon="plus-circle"
				iconColor={GlobalStyles.hexColor.red}
				size={45}
				compact={true}
				style={styles.addUserButton}
				onPress={() => navigation.navigate("Front Page")}
			/>
		</SafeAreaView>
	);
};

export default FriendsList;
