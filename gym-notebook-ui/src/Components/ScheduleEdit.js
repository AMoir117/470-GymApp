import React, {useState, useEffect} from "react";
import {
	ScrollView,
	StyleSheet,
	View,
	FlatList,
	TextInput,
	Pressable,
	SafeAreaView,
	TouchableOpacity,
	Image,
	ImageBackground,
} from "react-native";
import {
	Divider,
	Appbar,
	Button,
	Avatar,
	DataTable,
	Provider,
	Modal,
	Portal,
	Text,
	Card,
	Paragraph,
	IconButton,
} from "react-native-paper";
import axios from "axios";
import GlobalStyles from "./GlobalStyles";
import WorkoutCardEditable from "./WorkoutCardEditable";

const styles = StyleSheet.create({
	backgroundColor: {
		flex: 1,
		backgroundColor: GlobalStyles.hexColor.black,
	},
	dayText: {
		fontSize: 40,
		alignSelf: "center",
		color: GlobalStyles.hexColor.brown,
	},
	scheduleNameText: {
		fontSize: 20,
		alignSelf: "center",
		fontStyle: "italic",
		color: GlobalStyles.hexColor.brown,
	},
	workoutCellStyles: {
		color: GlobalStyles.hexColor.brown,
	},
	gifModal: {
		width: 300,
		height: 300,
		alignSelf: "center",
	},
	cardContainer: {
		backgroundColor: GlobalStyles.hexColor.brown,
		flex: 1,
		margin: 2,
		borderRadius: 10,
	},
	cardContent: {
		alignSelf: "center",
	},
	cardButton: {
		justifyContent: "center",
		alignSelf: "center",
	},
	dividerStyle: {
		color: GlobalStyles.hexColor.black,
		borderWidth: 0.2,
	},
	buttonStyles: {
		backgroundColor: GlobalStyles.hexColor.red,
	},
});

const data = [
	{
		id: "3194",
		name: "frankenstein squat",
		gifUrl: "http://d205bpvrqc9yn1.cloudfront.net/3194.gif",
		sets: 4,
		reps: 12,
		weight: 50,
	},
	{
		id: "3561",
		name: "glute bridge march",
		gifUrl: "http://d205bpvrqc9yn1.cloudfront.net/3561.gif",
		sets: 3,
		reps: 8,
		weight: 225,
	},
	{
		id: "1761",
		name: "hanging oblique knee raise",
		gifUrl: "http://d205bpvrqc9yn1.cloudfront.net/1761.gif",
		sets: 4,
		reps: 10,
		weight: 75,
	},
	{
		id: "0490",
		name: "incline close-grip push-up",
		gifUrl: "http://d205bpvrqc9yn1.cloudfront.net/0490.gif",
		sets: 3,
		reps: 10,
		weight: 55,
	},
	{
		id: "2400",
		name: "inverse leg curl (on pull-up cable machine)",
		gifUrl: "http://d205bpvrqc9yn1.cloudfront.net/2400.gif",
		sets: 4,
		reps: 8,
		weight: 315,
	},
	{
		id: "3116",
		name: "band fixed back underhand pulldown",
		gifUrl: "http://d205bpvrqc9yn1.cloudfront.net/3116.gif",
		sets: 3,
		reps: 15,
		weight: 25,
	},
	{
		id: "0043",
		name: "barbell full squat",
		gifUrl: "http://d205bpvrqc9yn1.cloudfront.net/0043.gif",
		sets: 3,
		reps: 8,
		weight: 315,
	},
	{
		id: "0032",
		name: "barbell deadlift",
		gifUrl: "http://d205bpvrqc9yn1.cloudfront.net/0032.gif",
		sets: 3,
		reps: 5,
		weight: 405,
	},
	{
		id: "0025",
		name: "barbell bench press",
		gifUrl: "http://d205bpvrqc9yn1.cloudfront.net/0025.gif",
		sets: 3,
		reps: 10,
		weight: 225,
	},
];

const ScheduleEdit = ({navigation, back}) => {
	const [currentDay, setCurrentDay] = useState("Friday");
	const [scheduleName, setScheduleName] = useState("Path to Mr. Olympia");
	const [workouts, setWorkouts] = useState(data);

	useEffect(() => {}, []);

	const renderItem = ({item}) => {
		return <WorkoutCardEditable workout={item} />;
	};

	return (
		<SafeAreaView style={{flex: 1, maxHeight: "200%"}}>
			<ImageBackground style={styles.backgroundColor}>
				<Text style={styles.dayText}>{currentDay}</Text>
				<Text style={styles.scheduleNameText}>{scheduleName}</Text>
				<Divider
					style={{
						borderColor: GlobalStyles.hexColor.red,
						borderWidth: 1,
						borderRadius: 5,
						margin: 10,
					}}
					horizontalInset="3"
				/>

				<FlatList
					showsVerticalScrollIndicator={false}
					alwaysBounceVertical={true}
					data={workouts}
					renderItem={renderItem}
					keyExtractor={(item) => item.id}
				/>
			</ImageBackground>
		</SafeAreaView>
	);
};

export default ScheduleEdit;
