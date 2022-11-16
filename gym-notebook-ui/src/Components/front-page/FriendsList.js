import React, {useState, useEffect, useContext} from "react";
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
import {DataTable, Avatar, Surface, Portal, IconButton} from "react-native-paper";
import GlobalStyles from "../GlobalStyles";
import ProfileView from "../ProfileView";
import AuthContext from "../../Context/AuthProvider";
import {useNavigation} from "@react-navigation/native";
import SvgImage2 from "../SvgImage2";
import axios from "axios";

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
	addUserButton: {
		alignSelf: "center",
		margin: 0,
		padding: 0,
	},
});

const FriendsList = () => {
	//brings navigation from parents
	const navigation = useNavigation();
	const {auth} = useContext(AuthContext);
	const [following, setFollowing] = useState([]);

	useEffect(() => {
		const getFollowers = async () => {
			await axios.get(`users/get-followers/${auth.user.id}`).then((followersResponse) => {
				setFollowing(followersResponse.data);
			});
		};
		getFollowers();
	}, []);

	const clickUserProfile = (item) => {
		console.log(item);
		navigation.navigate("Profile View", {userProfile: item});
	};

	const RenderProfile = ({item}) => {
		//fixme::how to require image dynamically
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
				numColumns={2}
				showsVerticalScrollIndicator={false}
				alwaysBounceVertical={true}
				data={following}
				renderItem={RenderProfile}
				keyExtractor={(item) => item.id}
			/>
			<IconButton
				icon="plus-circle"
				iconColor={GlobalStyles.hexColor.red}
				size={50}
				compact={true}
				style={styles.addUserButton}
				onPress={() => navigation.navigate("Front Page")}
			/>
		</SafeAreaView>
	);
};

export default FriendsList;
