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
} from "react-native";
import {Divider, Appbar, Button, Avatar, Portal, Card, Title, Paragraph, Surface, Badge, DataTable} from "react-native-paper";
import axios from "axios";



import ProfileSwipingRow from "./Modules/ProfileSwipingRow";
import GmailStyleSwipeableRow from "./Modules/AndroidSwipe";

import GlobalStyles from "./GlobalStyles";
import * as FS from "expo-file-system";
import SvgImage2 from "./SvgImage2";

import AuthContext from "../Context/AuthProvider"

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
		padding: 10,
		borderRadius: 25,
		margin: 5,
		borderColor: "#000000"
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
});


const ProfileView = ({route, navigation}) => {
	const {auth} = useContext(AuthContext);
	const {userProfile} = route.params;
	const [userSchedules, setUserSchedules] = useState([]);
	const [routinesToAdd, setRoutinesToAdd] = useState([]);
	const [scheduleToAdd, setScheduleToAdd] = useState();


	useEffect(() => {
		const getPublicSchedules = async() => {
			// dont display schedules if profile is your own
			if (auth.user.id === userProfile.id){
				return;
			}
			await axios.get(
				`weekly-schedule/profile-view/${auth.user.id}/public`
			).then((scheduleResponses) => {
				console.log(scheduleResponses.data);
				setUserSchedules(scheduleResponses.data);
			});
		};
		getPublicSchedules();
	}, []);



	const addSchedule = async(weeklyScheduleData) => {
		console.log(`in add schedule.`);
		return;

		// first get all the daily schedules of the weekly schedule
		await axios.get(
			`daily-routine/by-weekly-schedule/${weeklyScheduleID}`
		).then((routineResponse) => {
			console.log(routineResponse.data);
			setRoutinesToAdd(routineResponse);
		});
		// insert new weekly schedule
		await axios.post(`weekly-schedule/insert/private/${weeklyScheduleData.title}/0/${auth.user.id}`).then((response) => {
			console.log("Schedule Added.");
			setScheduleToAdd({id:response.data.insertId});
		});

		// add daily routines to new weeklyid
		routinesToAdd.forEach(() => {
			;
		})
	}

	const renderSchedules = ({item}) => {
		const test = new Date(item.created);
		const myDate = test.toLocaleDateString("en-us", GlobalStyles.date);
		return (
			<ProfileSwipingRow addSchedule={addSchedule}>
				<Surface style={styles.surfaceStyle} numColumns={2} elevation={1}>
					<View style={{flex: 1}}>
						<Text style={styles.postTitleStyle}>{item.title}</Text>
						<Text style={styles.postCreatedOn}>{`Created: ${myDate}`}</Text>
							<Text style={styles.postCreatedOn}>{`Upvotes:`}<Badge style={styles.upVoteBadge}>{item.upvotes}</Badge></Text>

					</View>

				</Surface>
			</ProfileSwipingRow>
		);
	};


	return (
		<SafeAreaView style={{flex: 1, maxHeight: "100%", backgroundColor: '#423F3B'}}>
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
