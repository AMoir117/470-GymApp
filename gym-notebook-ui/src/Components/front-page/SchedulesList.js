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
import {setStatusBarHidden} from "expo-status-bar";

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

//fixme:: consider using modal, Alert.alert does not work on web or android
const SchedulesList = () => {
	const {auth, setAuth} = useContext(AuthContext);
	const navigation = useNavigation();
	const [mySchedules, setMySchedules] = useState([]);
	const refArray = [];
	const [prevRow, setPrevRow] = useState(null);

	useEffect(() => {
		const getAllSchedules = async () => {
			await axios
				.get(`weekly-schedule/get-all-schedules/${auth.user.id}`)
				.then((scheduleResponses) => {
					setMySchedules(scheduleResponses.data);
				});
		};
		getAllSchedules();
	}, []);

	const closeRow = (item) => {
		if (prevRow === null) {
			setPrevRow(item.id);
		} else if (prevRow !== item.id) {
			refArray[prevRow].close();
		}
		setPrevRow(item.id);
	};

	const setCurrentSchedule = async (item) => {
		await axios.put(`users/use-weekly-schedule/${item.id}/${item.userID}`).then(() => {
			refArray[item.id].close();
			const newAuth = auth;
			newAuth.user = {
				...newAuth.user,
				currentWeeklyScheduleID: item.id,
			};
			setAuth(newAuth);
		});
	};

	const deleteCurrentSchedule = async (item) => {
		if (auth.user.currentWeeklyScheduleID === item.id) {
			Alert.alert(
				"Unable to delete current schedule!",
				"Change current schedule and try again.",
				[
					{
						text: "OK",
						onPress: () => console.log("cancel"),
						style: "cancel",
					},
				]
			);
			refArray[item.id].close();
			return;
		} else {
			await axios.delete(`weekly-schedule/delete/${item.id}`).then(async () => {
				refArray[item.id].close();
				await axios
					.get(`weekly-schedule/get-all-schedules/${auth.user.id}`)
					.then((scheduleResponses) => {
						setMySchedules(scheduleResponses.data);
					});
			});
		}
	};

	const renderLeftActions = () => {
		return (
			<RectButton style={styles.leftAction} onPress={() => {}}>
				<Animated.Text style={[styles.actionText]}>Post Schedule</Animated.Text>
			</RectButton>
		);
	};
	const renderRightAction = (text, color, width, progress, item) => {
		const pressHandler = () => {
			switch (text) {
				case "Select":
					Alert.alert("Make This Your Main Schedule.", "", [
						{
							text: "Accept",
							onPress: () => {
								setCurrentSchedule(item);
							},
						},
						{text: "Cancel", style: "cancel"},
					]);
					break;

				case "Edit":
					progress = 0;
					navigation.navigate("Schedules");
					break;

				case "Delete":
					Alert.alert("Delete Permanently", "", [
						{
							text: "accept",
							onPress: () => {
								deleteCurrentSchedule(item);
							},
						},
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

	const renderRightActions = (progress, item) => {
		return (
			<View style={{width: 230, flexDirection: "row"}}>
				{renderRightAction("Select", "#C8C7CD", 230, progress, item)}
				{renderRightAction("Edit", "#ffab00", 200, progress, item)}
				{renderRightAction("Delete", "#dd2c00", 170, progress, item)}
			</View>
		);
	};

	const renderSchedules = ({item, index}) => {
		const test = new Date(item.created);
		const myDate = test.toLocaleDateString("en-us", GlobalStyles.date);
		return (
			<Swipeable
				ref={(ref) => (refArray[item.id] = ref)}
				friction={2}
				leftThreshold={40}
				rightThreshold={40}
				renderLeftActions={renderLeftActions}
				renderRightActions={(progress) => renderRightActions(progress, item)}
				onSwipeableOpen={() => closeRow(item)}
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
