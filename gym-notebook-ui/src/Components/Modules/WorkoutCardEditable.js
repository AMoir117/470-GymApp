import {useState, useEffect} from "react";
import {StyleSheet, View, Alert} from "react-native";
import {Card, Paragraph, IconButton} from "react-native-paper";
import GlobalStyles from "../GlobalStyles";
import axios from "axios";
import SelectDropdown from "react-native-select-dropdown";

const styles = StyleSheet.create({
	cardContainer: {
		backgroundColor: GlobalStyles.hexColor.brown,
		flex: 1,
		margin: 2,
		borderRadius: 0,
	},
	cardContent: {
		flex: 1,
		alignSelf: "center",
		marginLeft: 20,
		fontSize: 15,
	},
	cardButton: {
		justifyContent: "center",
		alignSelf: "center",
	},
	buttonStyles: {
		width: 100,
		backgroundColor: GlobalStyles.hexColor.brown,
		borderWidth: 0.2,
	},
});

const acceptedSets = [1, 2, 3, 4, 5];
const acceptedReps = [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
const acceptedWeights = [
	"BW",
	"5 lbs",
	"10 lbs",
	"15 lbs",
	"20 lbs",
	"25 lbs",
	"30 lbs",
	"35 lbs",
	"40 lbs",
	"45 lbs",
	"50 lbs",
	"55 lbs",
	"60 lbs",
	"65 lbs",
	"70 lbs",
	"75 lbs",
	"80 lbs",
	"85 lbs",
	"90 lbs",
	"95 lbs",
	"100 lbs",
	"100 lbs",
	"105 lbs",
	"110 lbs",
	"115 lbs",
	"120 lbs",
	"125 lbs",
	"130 lbs",
	"135 lbs",
	"140 lbs",
	"145 lbs",
	"150 lbs",
	"155 lbs",
	"160 lbs",
	"165 lbs",
	"170 lbs",
	"175 lbs",
	"180 lbs",
	"185 lbs",
	"190 lbs",
	"195 lbs",
	"200 lbs",
	"205 lbs",
	"210 lbs",
	"215 lbs",
	"220 lbs",
	"225 lbs",
	"230 lbs",
	"235 lbs",
	"240 lbs",
	"245 lbs",
	"250 lbs",
	"255 lbs",
	"260 lbs",
	"265 lbs",
	"270 lbs",
	"275 lbs",
	"280 lbs",
	"285 lbs",
	"290 lbs",
	"295 lbs",
	"300 lbs",
	"305 lbs",
	"310 lbs",
	"315 lbs",
	"320 lbs",
	"325 lbs",
	"330 lbs",
	"335 lbs",
	"340 lbs",
	"345 lbs",
	"350 lbs",
	"355 lbs",
	"360 lbs",
	"365 lbs",
	"370 lbs",
	"375 lbs",
	"380 lbs",
	"385 lbs",
	"390 lbs",
	"395 lbs",
	"400 lbs",
	"405 lbs",
];

const WorkoutCardEditable = (props) => {
	const {workout, showModal, forceUpdate} = props;
	const [workoutName, setWorkoutName] = useState({});
	const [sets, setSets] = useState(workout.sets);
	const [reps, setReps] = useState(workout.reps);
	const [weight, setWeight] = useState(workout.weight);

	useEffect(() => {
		const getExerciseName = async () => {
			await axios.get(`exercises/id/${workout.exerciseID}`).then((exerciseResponse) => {
				const newWorkout = exerciseResponse.data.slice();
				newWorkout[0].workoutName = newWorkout[0].workoutName.toUpperCase();
				setWorkoutName(newWorkout[0]);
			});
		};
		getExerciseName();
	}, []);

	useEffect(() => {
		const updateSRW = async () => {
			await axios.put(`daily-routine/update/${sets}/${reps}/${weight}/${workout.id}`);
		};
		updateSRW();
	}, [sets, reps, weight]);

	const deleteWorkout = async () => {
		console.log("deleting");
		await axios.delete(`daily-routine/delete/${workout.id}`).then(forceUpdate());
	};

	return (
		<>
			<Card style={styles.cardContainer}>
				<Card.Content>
					<View style={{borderWidth: 1, flexDirection: "row"}}>
						<Paragraph style={styles.cardContent}>{workoutName.workoutName}</Paragraph>
						<IconButton
							icon="delete-forever-outline"
							onPress={() => {
								Alert.alert("", "Are you sure you want to delete forever?", [
									{
										text: "Accept",
										onPress: () => {
											deleteWorkout();
										},
									},
									{
										text: "Cancel",
										onPress: () => console.log("canceled"),
										style: "cancel",
									},
								]);
							}}
							iconColor={GlobalStyles.hexColor.red}
						/>
					</View>
				</Card.Content>
				<Card.Actions style={styles.cardButton}>
					<IconButton
						icon="file-gif-box"
						style={styles.buttonStyles}
						iconColor={GlobalStyles.hexColor.green}
						onPress={() => showModal(workoutName)}
					/>
					<SelectDropdown
						data={acceptedSets}
						defaultButtonText={workout.sets}
						buttonStyle={styles.buttonStyles}
						onSelect={(selectedItem, index) => setSets(selectedItem)}
						buttonTextAfterSelection={(selectedItem, index) => {
							return selectedItem;
						}}
						rowTextForSelection={(item, index) => {
							return item;
						}}
					/>
					<SelectDropdown
						data={acceptedReps}
						defaultButtonText={workout.reps}
						buttonStyle={styles.buttonStyles}
						onSelect={(selectedItem, index) => {
							setReps(selectedItem);
						}}
						buttonTextAfterSelection={(selectedItem, index) => {
							return selectedItem;
						}}
						rowTextForSelection={(item, index) => {
							return item;
						}}
					/>
					<SelectDropdown
						data={acceptedWeights}
						defaultButtonText={workout.weight}
						buttonStyle={styles.buttonStyles}
						onSelect={(selectedItem, index) => {
							setWeight(selectedItem);
						}}
						buttonTextAfterSelection={(selectedItem, index) => {
							return selectedItem;
						}}
						rowTextForSelection={(item, index) => {
							return item;
						}}
					/>
				</Card.Actions>
			</Card>
		</>
	);
};

export default WorkoutCardEditable;
