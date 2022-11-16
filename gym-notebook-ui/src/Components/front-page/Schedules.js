import React, {useState, useEffect} from "react";
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
import {Divider, Appbar, Button, Avatar, DataTable} from "react-native-paper";
import axios from "axios";
import SvgImage from "../SvgImage";
import GlobalStyles from "../GlobalStyles";

const styles = StyleSheet.create({
	backgroundImage: {
		flex: 1,
		backgroundColor: "#000000",
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
	daysOfWeek: {
		flexDirection: "row",
	},
	dayButton: {
		flexGrow: 1,
		margin: 7,
		marginTop: 10,
		//fixme::width of window for each day button
	},
	tableHeader: {
		backgroundColor: GlobalStyles.hexColor.brown,
	},
	tableData: {
		backgroundColor: GlobalStyles.hexColor.brown,
	},
});

//fixme:: change to reflect database
const daysOfWeek = [
	{
		dayID: "1",
		dayName: "Mon",
	},
	{
		dayID: "2",
		dayName: "Tue",
	},
	{
		dayID: "3",
		dayName: "Wed",
	},
	{
		dayID: "4",
		dayName: "Thu",
	},
	{
		dayID: "5",
		dayName: "Fri",
	},
	{
		dayID: "6",
		dayName: "Sat",
	},
	{
		dayID: "7",
		dayName: "Sun",
	},
];
const schedules = [
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
		id: "0520",
		name: "kettlebell alternating press",
		gifUrl: "http://d205bpvrqc9yn1.cloudfront.net/0520.gif",
		sets: 3,
		reps: 8,
		weight: 225,
	},
];

const Schedules = ({navigation, back}) => {
	const [currentDay, setCurrentDay] = useState("Friday");
	const [scheduleName, setScheduleName] = useState("Path to Mr. Olympia");
	const [workouts, setWorkouts] = useState(schedules);

	useEffect(() => {}, []);

	const renderItem = ({item}) => (
		<DataTable.Row style={styles.tableData}>
			<DataTable.Cell style={{flex: 5}}>{item.name}</DataTable.Cell>
			<DataTable.Cell numeric>{item.sets}</DataTable.Cell>
			<DataTable.Cell numeric>{item.reps}</DataTable.Cell>
			<DataTable.Cell numeric>{item.weight}</DataTable.Cell>
		</DataTable.Row>
	);

	const clickDay = (dayName) => {
		//fixme::click a day and query the schedule for that day
		console.log(dayName);
	};

	return (
		<SafeAreaView style={{flex: 1, maxHeight: "100%"}}>
			<SvgImage
				style={{
					zIndex: -1,
					position: "absolute",
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
				}}
			/>
			<View style={styles.daysOfWeek}>
				{daysOfWeek.map((day) => {
					return (
						<Button
							style={styles.dayButton}
							compact={true}
							mode="elevated"
							textColor="#000000"
							onPress={() => clickDay(day.dayName)}
							key={day.dayID}
						>
							{day.dayName}
						</Button>
					);
				})}
			</View>

			<Text style={styles.dayText}>{currentDay}</Text>

			<Text style={styles.scheduleNameText}>{scheduleName}</Text>

			<DataTable>
				<DataTable.Header style={styles.tableHeader}>
					<DataTable.Title style={{flex: 5}}>Exercise</DataTable.Title>
					<DataTable.Title numeric>Sets</DataTable.Title>
					<DataTable.Title numeric>Reps</DataTable.Title>
					<DataTable.Title numeric>Weight</DataTable.Title>
				</DataTable.Header>

				<FlatList
					showsVerticalScrollIndicator={false}
					alwaysBounceVertical={true}
					data={schedules}
					renderItem={renderItem}
					keyExtractor={(item) => item.id}
				/>
			</DataTable>
		</SafeAreaView>
	);
};

export default Schedules;
