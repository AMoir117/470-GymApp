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
} from "react-native";
import {Divider, Appbar, Button, Avatar, DataTable} from "react-native-paper";
import axios from "axios";

const styles = StyleSheet.create({
	dayText: {
		fontSize: 40,
		alignSelf: "center",
	},
	scheduleNameText: {
		fontSize: 20,
		alignSelf: "center",
		fontStyle: "italic",
	},
	flatList: {},
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
		id: "0520",
		name: "kettlebell alternating press",
		gifUrl: "http://d205bpvrqc9yn1.cloudfront.net/0520.gif",
		sets: 3,
		reps: 8,
		weight: 225,
	},
];

const MainSchedule = ({navigation, back}) => {
	const [currentDay, setCurrentDay] = useState("Friday");
	const [scheduleName, setScheduleName] = useState("Path to Mr. Olympia");
	const [workouts, setWorkouts] = useState(data);

	useEffect(() => {}, []);

	const renderItem = ({item}) => (
		<DataTable.Row>
			<DataTable.Cell style={{flex: 6}}>{item.name}</DataTable.Cell>
			<DataTable.Cell numeric>{item.sets}</DataTable.Cell>
			<DataTable.Cell numeric>{item.reps}</DataTable.Cell>
			<DataTable.Cell numeric>{item.weight}</DataTable.Cell>
		</DataTable.Row>
	);

	return (
		<SafeAreaView style={{flex: 1, maxHeight: "100%"}}>
			<Text style={styles.dayText}>{currentDay}</Text>
			<Text style={styles.scheduleNameText}>{scheduleName}</Text>

			<Divider
				style={{borderColor: "#ff0000", borderWidth: 3, borderRadius: 5}}
				horizontalInset="3"
			/>
			<DataTable>
				<DataTable.Header>
					<DataTable.Title style={{flex: 6}}>Exercise</DataTable.Title>
					<DataTable.Title numeric>Sets</DataTable.Title>
					<DataTable.Title numeric>Reps</DataTable.Title>
					<DataTable.Title numeric>Weight</DataTable.Title>
				</DataTable.Header>

				<FlatList
					showsVerticalScrollIndicator={false}
					alwaysBounceVertical={true}
					data={workouts}
					renderItem={renderItem}
					keyExtractor={(item) => item.id}
				/>
			</DataTable>
		</SafeAreaView>
	);
};

export default MainSchedule;
