import React, {useState, useEffect, useContext} from "react";
import {Text, StyleSheet, View, FlatList, SafeAreaView, Animated} from "react-native";
import {Divider, Card, Title, Paragraph, Surface, Badge, IconButton, Avatar} from "react-native-paper";
import axios from "axios";

import GlobalStyles from "./GlobalStyles";
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
		height: 100,
		flex: 1,
		flexDirection: "row",
		backgroundColor: "#cbbeb5",
		marginBottom: 5,
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
		margin: 10,
		alignSelf: "center",
	},
	profileScheduleHeader: {
		alignSelf: "center",
		fontSize: 35,
		margin: 5,
		color: "#ffffff",
		padding: 10,
	},
	postTitleStyle: {
		fontSize: 20,

		marginTop: 10,
		marginLeft: 10,
	},
	postCreatedOn: {
		marginTop: 10,
		marginLeft: 10,
	},
	upVoteBadge: {
		color: "#93c47d",
		alignSelf: "center",
		height: 20,
		width: 20,
		backgroundColor: GlobalStyles.hexColor.black,
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
		borderBottomLeftRadius: 10,
		borderBottomRightRadius: 10,
	},
	flatListContainer: {
		flex: 1,
	},
	leftAction: {
		width: 120,
		backgroundColor: "#497AFC",
		justifyContent: "center",
	},
	followButton: {
		backgroundColor: "#497AFC",
		justifyContent: "center",
		textAlign: "center",
		width: 100,
		borderRadius: 80,
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
	const [followButtonColor, setFollowButtonColor] = useState("#497AFC");
	const refArray = [];
	const [prevRow, setPrevRow] = useState(null);
	const [followed, setFollowed] = useState(false);
	const [followerText, setFollowerText] = useState("");

	useEffect(() => {
		navigation.setOptions({
			headerLeft: () => (
				<IconButton
					icon="arrow-right"
					onPress={() => {
						navigation.navigate("Front Page");
					}}
					title="Back"
				/>
			),
		});
	}, [navigation]);

	useEffect(() => {
		const getPublicSchedules = async () => {
			// dont display schedules if profile is your own
			if (auth.user.id === userProfile.userId) {
				return;
			}
			await axios.get(`weekly-schedule/profile-view/${userProfile.userId}/public`).then((scheduleResponses) => {
				setUserSchedules(scheduleResponses.data);
			});
		};

		getPublicSchedules();
	}, []);

	useEffect(() => {
		// TODO: add follower checker here
		// TODO: query db to check if auth.user.id & userProfileID already have a follower table
		const checkFollowStatus = async () => {
			if (auth.user.id === userProfile.userId) {
				return;
			}
			console.log(userProfile);
			await axios.get(`follower/search/${userProfile.userId}/${auth.user.id}`).then((response) => {
				console.log("follower data:");
				console.log(response.data);
				if (response.data.length > 0) {
					setFollowed(true);
					setFollowerText("Unfollow");
					setFollowButtonColor(GlobalStyles.hexColor.red);
				} else {
					setFollowed(false);
					setFollowerText("Follow");
					setFollowButtonColor(GlobalStyles.hexColor.green);
				}
			});
		};
		checkFollowStatus();
	}, []);

	const closeRow = (item) => {
		if (prevRow === null) {
			setPrevRow(item.id);
		} else if (prevRow !== item.id) {
			refArray[prevRow].close();
		}
		setPrevRow(item.id);
	};

	const clickFollowButton = async (userProfileID) => {
		if (auth.user.id === userProfileID) {
			return;
		}
		if (followed) {
			await axios.delete(`follower/delete/${userProfileID}/${auth.user.id}`).then((response) => {
				setFollowerText("Follow");
				setFollowed(false);
				setFollowButtonColor(GlobalStyles.hexColor.green);
				console.log("follower removed");
			});
		} else {
			await axios
				.post(`follower/insert/${userProfileID}/${auth.user.id}`)
				.then((response) => {
					console.log("follower added");
					setFollowerText("Unfollow");
					setFollowButtonColor(GlobalStyles.hexColor.red);
					setFollowed(true);
				})
				.catch((error) => {
					// will usually be a dup key entry (bug on prod only)
					if (error.response) {
						console.log(error.message);
					}
				});
		}

		return;
	};

	const renderFollowButton = (userProfileID) => {
		// TODO: add on hover to follow button to show red unfollow text

		return (
			<Card.Content style={{margin: 5, marginLeft: 0}}>
				<RectButton
					style={{
						alignSelf: "center",
						alignItems: "center",
						backgroundColor: followButtonColor,
						width: 100,
						borderRadius: 80,
					}}
					onPress={() => clickFollowButton(userProfileID)}
				>
					<Animated.Text style={[styles.actionText]}>{followerText}</Animated.Text>
				</RectButton>
			</Card.Content>
		);
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
		await axios.post(`weekly-schedule/insert/private/${item.title}/0/${auth.user.id}`).then((response) => {
			console.log("Schedule Added.");
			setScheduleToAdd({id: response.data.insertId});
			weeklyScheduleID = response.data.insertId;
		});

		// add daily routines to new weeklyid

		routineData.forEach(async (item) => {
			await axios
				.post(`daily-routine/insert/${item.exerciseID}/${item.sets}/${item.reps}/${item.weight}/${item.dayOfWeek}/${weeklyScheduleID}`)
				.then((response) => {
					console.log("added routine.");
				});
		});
	};

	const clickViewSchedule = (item) => {
		// refArray[item.id].close();

		navigation.navigate("Workout View", {weekSchedule: item});
	};

	const renderRightAction = (progress, item) => {
		return (
			<View style={{width: 230, flexDirection: "row"}}>
				<RectButton style={styles.leftAction} onPress={() => clickAddSchedule(item)}>
					<Animated.Text style={[styles.actionText]}>Add Schedule</Animated.Text>
				</RectButton>
				<RectButton style={styles.viewScheduleButton} onPress={() => clickViewSchedule(item)}>
					<Animated.Text style={[styles.actionText]}>View Schedule</Animated.Text>
				</RectButton>
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
				renderRightActions={(progress) => renderRightAction(progress, item)}
				onSwipeableOpen={() => closeRow(item)}
			>
				<Surface style={styles.surfaceStyle} numColumns={2} elevation={1}>
					<View style={{flex: 1, overflow: "hidden"}}>
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
				<Avatar.Image style={styles.avatarStyle} size={200} source={{uri: userProfile.imagePath}} />

				{renderFollowButton(userProfile.userId)}

				<Card.Title title={userProfile.firstName + " " + userProfile.lastName[0] + "."} subtitle={userProfile.username} />
				<Card.Content>
					<Title>Bio</Title>
					<Divider style={{borderWidth: 1}} />
					<Paragraph style={{fontSize: 20, marginTop: 15}}>{userProfile.profileBio}</Paragraph>
				</Card.Content>
				<Text style={styles.profileScheduleHeader}>Schedules</Text>

				<Divider style={{borderWidth: 1}} />
			</Card>
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
