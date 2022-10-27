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
	flatList: {},
});

const data = [
	{
		id: "001",
		name: "Pull-ups",
		sets: 4,
		reps: 12,
		weight: 50,
	},
	{
		id: "002",
		name: "Barbell Deadlift",
		sets: 3,
		reps: 8,
		weight: 225,
	},
	{
		id: "003",
		name: "Bend-over Row",
		sets: 4,
		reps: 10,
		weight: 75,
	},
	{
		id: "004",
		name: "Skullcrushers",
		sets: 3,
		reps: 10,
		weight: 55,
	},
	{
		id: "005",
		name: "Barbell Squats",
		sets: 4,
		reps: 8,
		weight: 315,
	},
	{
		id: "006",
		name: "Bench Press",
		sets: 3,
		reps: 8,
		weight: 225,
	},
];

const MainSchedule = ({navigation, back}) => {
	const [currentDay, setCurrentDay] = useState("Friday");
	const [workouts, setWorkouts] = useState(data);

	useEffect(() => {}, []);

	const renderItem = ({item}) => (
		<DataTable.Row>
			<DataTable.Cell>{item.name}</DataTable.Cell>
			<DataTable.Cell numeric>{item.sets}</DataTable.Cell>
			<DataTable.Cell numeric>{item.reps}</DataTable.Cell>
			<DataTable.Cell numeric>{item.weight}</DataTable.Cell>
		</DataTable.Row>
	);

	return (
		<SafeAreaView style={{flex: 1, maxHeight: "100%"}}>
			<Text style={styles.dayText}>{currentDay}</Text>
			<Divider
				style={{borderColor: "#ff0000", borderWidth: 3, borderRadius: 5}}
				horizontalInset="3"
			/>
			<DataTable>
				<DataTable.Header>
					<DataTable.Title>Exercise</DataTable.Title>
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
