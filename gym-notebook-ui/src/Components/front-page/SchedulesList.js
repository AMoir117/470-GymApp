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
	ImageBackground,
	Animated,
	Alert,
} from "react-native";
import {DataTable, Avatar, Surface, Badge} from "react-native-paper";
import {useNavigation} from "@react-navigation/native";
import SwipingRow from "../Modules/SwipingRow";
import {RectButton, Swipeable} from "react-native-gesture-handler";
import GlobalStyles from "../GlobalStyles";
import axios from "axios";
import SvgImage2 from "../SvgImage2";
import AuthContext from "../../Context/AuthProvider";

const styles = StyleSheet.create({
	backgroundColor: {
		flex: 1,
		backgroundColor: GlobalStyles.hexColor.black,
	},
	surfaceStyle: {
		height: 80,
		flex: 1,
		flexDirection: "row",
		borderWidth: 1,
		borderColor: GlobalStyles.hexColor.black,
		backgroundColor: GlobalStyles.hexColor.brown,
	},
	flatListContainer: {
		flex: 1,
		marginTop: 20,
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
	postTitleStyle: {
		fontSize: 20,
		height: 25,
		marginTop: 10,
		marginLeft: 10,
	},
	postCreatedOn: {
		height: 20,
		marginTop: 10,
		marginLeft: 20,
	},
	upVoteBadge: {
		color: "#93c47d",
		alignSelf: "center",
		margin: 20,
		backgroundColor: GlobalStyles.hexColor.black,
	},
	avatarStyle: {
		alignSelf: "center",
		margin: 5,
		backgroundColor: GlobalStyles.hexColor.white,
	},
	leftAction: {
		width: 120,
		backgroundColor: "#497AFC",
		justifyContent: "center",
	},
	actionText: {
		color: "white",
		fontSize: 16,
		backgroundColor: "transparent",
		padding: 10,
	},
	rightAction: {
		alignItems: "center",
		flex: 1,
		justifyContent: "center",
	},
});

const SchedulesList = () => {
	const {auth} = useContext(AuthContext);
	const navigation = useNavigation();
	const [mySchedules, setMySchedules] = useState([]);

	useEffect(() => {
		const getAllSchedules = async () => {
			await axios
				.get(`weekly-schedule/get-all-schedules/${auth.user.id}`)
				.then((scheduleResponses) => {
					console.log(scheduleResponses.data);
					setMySchedules(scheduleResponses.data);
				});
		};
		getAllSchedules();
	}, []);

	const setCurrentSchedule = () => {
		//todo::set current schedule
		console.log("test");
	};

	const renderLeftActions = () => {
		return (
			<RectButton style={styles.leftAction} onPress={() => {}}>
				<Animated.Text style={[styles.actionText]}>Post Schedule</Animated.Text>
			</RectButton>
		);
	};
	const renderRightAction = (text, color) => {
		const pressHandler = () => {
			switch (text) {
				case "Select":
					Alert.alert("Make This Your Main Schedule.", "", [
						{
							text: "Accept",
							onPress: () => setCurrentSchedule(),
						},
						{text: "Cancel", style: "cancel"},
					]);
					break;

				case "Edit":
					navigation.navigate("Schedules");
					break;

				case "Delete":
					Alert.alert("Delete Permanently", "", [
						{text: "accept", onPress: () => console.log("deleted")},
						{text: "cancel", onPress: () => console.log("canceled"), style: "cancel"},
					]);

					break;
			}
		};
		return (
			<Animated.View style={{flex: 1, transform: [{translateX: 0}]}}>
				<RectButton
					style={[styles.rightAction, {backgroundColor: color}]}
					onPress={pressHandler}
				>
					<Text style={styles.actionText}>{text}</Text>
				</RectButton>
			</Animated.View>
		);
	};

	const renderRightActions = (progress) => (
		<View style={{width: 230, flexDirection: "row"}}>
			{renderRightAction("Select", "#C8C7CD", 230, progress)}
			{renderRightAction("Edit", "#ffab00", 200, progress)}
			{renderRightAction("Delete", "#dd2c00", 170, progress)}
		</View>
	);

	const renderSchedules = ({item}) => {
		const test = new Date(item.created);
		const myDate = test.toLocaleDateString("en-us", GlobalStyles.date);
		return (
			<Swipeable
				friction={2}
				leftThreshold={40}
				rightThreshold={40}
				renderLeftActions={renderLeftActions}
				renderRightActions={renderRightActions}
			>
				<Surface style={styles.surfaceStyle} numColumns={2} elevation={1}>
					<View style={{flex: 1}}>
						<Text style={styles.postTitleStyle}>{item.title}</Text>
						<Text style={styles.postCreatedOn}>{`Created: ${myDate}`}</Text>
					</View>
					<Badge style={styles.upVoteBadge}>{item.upvotes}</Badge>
				</Surface>
			</Swipeable>
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
				numColumns={1}
				showsVerticalScrollIndicator={false}
				alwaysBounceVertical={true}
				data={mySchedules}
				renderItem={renderSchedules}
				keyExtractor={(item) => item.id}
			/>
		</SafeAreaView>
	);
};

export default SchedulesList;
