import React, {useState, useEffect, useContext, createContext} from "react";
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
	Animated,
} from "react-native";
import {
	Divider,
	Appbar,
	Button,
	Avatar,
	Portal,
	Card,
	Title,
	Paragraph,
	Surface,
	Badge,
	DataTable,
	IconButton,
} from "react-native-paper";
import axios from "axios";

import GmailStyleSwipeableRow from "./Modules/AndroidSwipe";

import GlobalStyles from "./GlobalStyles";
import * as FS from "expo-file-system";
import SvgImage2 from "../SVG_Backgrounds/Friends-bg";

import AuthContext from "../Context/AuthProvider";
import {RectButton, Swipeable} from "react-native-gesture-handler";

const styles = StyleSheet.create({
	backgroundImage: {
		flex: 1,
		backgroundColor: "#000000",
	},
	areaView: {
		height: 1200,
	},
	textTitle: {
		fontSize: 30,
		alignSelf: "center",
	},
	textInputStyle: {
		width: 250,
		marginTop: 30,
		alignSelf: "center",
	},
	bioInputStyle: {
		height: 100,
		width: 250,
		borderWidth: 1,
		paddingLeft: 10,
		marginTop: 30,
		alignSelf: "center",
		borderColor: "#000000",
		backgroundColor: "#FFFFFF",
		textAlignVertical: "top",
	},
	surfaceStyle: {
		height: 80,
		flex: 1,
		flexDirection: "row",
		backgroundColor: GlobalStyles.hexColor.brown,
	},
	textUploadImage: {
		fontSize: 15,
		color: "#0073ff",
		alignSelf: "center",
	},
	buttonSave: {
		height: 40,
		width: 100,
		marginTop: 20,
		alignSelf: "center",
	},
	buttonStyle: {
		height: 30,
		width: 70,
		margin: 2,
		marginTop: 10,
		borderColor: "#949494",
		backgroundColor: "#949494",
	},
	buttonText: {
		fontSize: 20,
		color: "#000000",
		textAlign: "center",
	},
	avatarStyle: {
		alignSelf: "center",
	},
	profileScheduleHeader: {
		alignSelf: "center",
		fontSize: 35,
		margin: 5,
		color: "#000000",
		padding: 20,
	},
	postTitleStyle: {
		fontSize: 20,
		height: 20,
		marginTop: 10,
		marginLeft: 10,
	},
	postCreatedOn: {
		height: 20,
		marginTop: 10,
		marginLeft: 10,
	},
	upVoteBadge: {
		color: "#93c47d",
		alignSelf: "center",
		margin: 20,
		backgroundColor: GlobalStyles.hexColor.black,
	},
	flatListContainer: {
		flex: 1,
		marginTop: 20,
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

const ProfileView = ({route, navigation}) => {
	const {auth} = useContext(AuthContext);
	const {userProfile} = route.params;
	const [userSchedules, setUserSchedules] = useState([]);
	const [routinesToAdd, setRoutinesToAdd] = useState([]);
	const [scheduleToAdd, setScheduleToAdd] = useState();
	const refArray = [];
	const [prevRow, setPrevRow] = useState(null);

	useEffect(() => {
		const getPublicSchedules = async () => {
			// dont display schedules if profile is your own
			if (auth.user.id === userProfile.userId) {
				return;
			}
			await axios
				.get(`weekly-schedule/profile-view/${userProfile.userId}/public`)
				.then((scheduleResponses) => {
					setUserSchedules(scheduleResponses.data);
				});
		};
		getPublicSchedules();
	}, []);

	const closeRow = (item) => {
		if (prevRow === null) {
			setPrevRow(item.id);
		} else if (prevRow !== item.id) {
			refArray[prevRow].close();
		}
		setPrevRow(item.id);
	};

	const clickAddSchedule = async (item) => {
		let routineData = [];
		let weeklyScheduleID = "";
		refArray[item.id].close();

		// first get all the daily schedules of the weekly schedule
		await axios.get(`daily-routine/by-weekly-schedule/${item.id}`).then((routineResponse) => {
			setRoutinesToAdd(routineResponse.data);
			routineData = routineResponse.data;
		});
		// insert new weekly schedule
		await axios
			.post(`weekly-schedule/insert/private/${item.title}/0/${auth.user.id}`)
			.then((response) => {
				console.log("Schedule Added.");
				setScheduleToAdd({id: response.data.insertId});
				weeklyScheduleID = response.data.insertId;
			});

		// add daily routines to new weeklyid

		routineData.forEach(async (item) => {
			await axios
				.post(
					`daily-routine/insert/${item.exerciseID}/${item.sets}/${item.reps}/${item.weight}/${item.dayOfWeek}/${weeklyScheduleID}`
				)
				.then((response) => {
					console.log("added routine.");
				});
		});
	};

	const renderRightAction = (progress, item) => {
		return (
			<RectButton style={styles.leftAction} onPress={() => clickAddSchedule(item)}>
				<Animated.Text style={[styles.actionText]}>Add Schedule</Animated.Text>
			</RectButton>
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
				renderRightActions={(progress) => renderRightAction(progress, item)}
				onSwipeableOpen={() => closeRow(item)}
			>
				<Surface style={styles.surfaceStyle} numColumns={2} elevation={1}>
					<View style={{flex: 1}}>
						<Text style={styles.postTitleStyle}>{item.title}</Text>
						<Text style={styles.postCreatedOn}>{`Created: ${myDate}`}</Text>
						<Text style={styles.postCreatedOn}>
							{`Upvotes:`}
							<Badge style={styles.upVoteBadge}>{item.upvotes}</Badge>
						</Text>
					</View>
				</Surface>
			</Swipeable>
		);
	};

	useEffect(() => {
		navigation.setOptions({
			headerLeft: () => (
				<IconButton
					icon="arrow-left"
					onPress={() => {
						navigation.goBack();
					}}
					title="Back"
				/>
			),
		});
	}, [navigation]);

	return (
		<SafeAreaView style={{flex: 1, maxHeight: "100%", backgroundColor: "#423F3B"}}>
			<Card style={{backgroundColor: GlobalStyles.hexColor.brown}}>
				<Card.Cover style={{top: 0}} source={{uri: userProfile.imagePath}} />
				<Card.Title
					title={userProfile.firstName + " " + userProfile.lastName[0] + "."}
					subtitle={userProfile.username}
				/>
				<Card.Content>
					<Title>Bio</Title>
					<Divider style={{borderWidth: 1}} />
					<Paragraph>{userProfile.profileBio}</Paragraph>
				</Card.Content>
			</Card>

			<Text style={styles.profileScheduleHeader}>Schedules</Text>
			<Divider style={{borderWidth: 1}} />

			<FlatList
				style={styles.flatListContainer}
				numColumns={1}
				showsVerticalScrollIndicator={false}
				alwaysBounceVertical={true}
				data={userSchedules}
				renderItem={renderSchedules}
				keyExtractor={(item) => item.id}
			/>
		</SafeAreaView>
	);
};

export default ProfileView;
