import axios from "axios";
import React, {useEffect, useState} from "react";
import {SectionList, StyleSheet, Text, View} from "react-native";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 60,
	},
	sectionHeader: {
		paddingTop: 2,
		paddingLeft: 10,
		paddingRight: 10,
		paddingBottom: 2,
		fontSize: 14,
		fontWeight: "bold",
		backgroundColor: "rgba(247,247,247,1.0)",
	},
	item: {
		padding: 10,
		fontSize: 18,
		height: 44,
	},
});

const API_KEY = process.env.API_KEY;
const listExercisesURL = "https://exercisedb.p.rapidapi.com/exercises";
const listTargetMuscle = "https://exercisedb.p.rapidapi.com/exercises/targetList";
const listEquipment = "https://exercisedb.p.rapidapi.com/exercises/equipmentList";

const testURL =
	"https://exercisedb.p.rapidapi.com/exercises?rapidapi-key=97e3f105e3msh0cdc4a25bc58929p109281jsn1e0296a83699";

function Data() {
	const [exercise, setExercise] = useState([]);

	useEffect(() => {
		getAllExercises();
	}, []);

	const getAllExercises = async () => {
		const response = await axios.get(testURL);
		setExercise(response.data);
	};

	//console.log("test:", exercise[0].name);
	return (
		<View style={styles.container}>
			<SectionList
				sections={[
					{
						title: "Target Muscle",
						data: exercise.map((workout) => <Text>{workout.name}</Text>),
					},
				]}
				renderSectionHeader={({section}) => (
					<Text style={styles.sectionHeader}>{section.title}</Text>
				)}
				renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
			/>
		</View>
	);
}

export default Data;
