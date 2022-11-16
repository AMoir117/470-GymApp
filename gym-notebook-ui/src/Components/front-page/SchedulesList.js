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
} from "react-native";
import {DataTable, Avatar, Surface, Badge} from "react-native-paper";

import SwipingRow from "../Modules/SwipingRow";
import GmailStyleSwipeableRow from "../Modules/AndroidSwipe";
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
	avatarStyle: {
		alignSelf: "center",
		margin: 5,
		backgroundColor: GlobalStyles.hexColor.white,
	},
});

const SchedulesList = () => {
	const {auth} = useContext(AuthContext);
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

	const renderSchedules = ({item}) => {
		const test = new Date(item.created);
		const myDate = test.toLocaleDateString("en-us", GlobalStyles.date);
		return (
			<SwipingRow>
				<Surface style={styles.surfaceStyle} numColumns={2} elevation={1}>
					<View style={{flex: 1}}>
						<Text style={styles.postTitleStyle}>{item.title}</Text>
						<Text style={styles.postCreatedOn}>{`Created: ${myDate}`}</Text>
					</View>
					<Badge style={styles.upVoteBadge}>{item.upvotes}</Badge>
				</Surface>
			</SwipingRow>
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
