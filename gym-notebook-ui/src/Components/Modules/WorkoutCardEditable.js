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
		width: 80,
		backgroundColor: GlobalStyles.hexColor.brown,
		borderWidth: 0.2,
	},
});

const acceptedSets = [1, 2, 3, 4, 5];
const acceptedReps = [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
const acceptedWeights = [
	"BW",
	5,
	10,
	15,
	20,
	25,
	30,
	35,
	40,
	45,
	50,
	55,
	60,
	65,
	70,
	75,
	80,
	85,
	90,
	95,
	100,
	100,
	105,
	110,
	115,
	120,
	125,
	130,
	135,
	140,
	145,
	150,
	155,
	160,
	165,
	170,
	175,
	180,
	185,
	190,
	195,
	200,
	205,
	210,
	215,
	220,
	225,
	230,
	235,
	240,
	245,
	250,
	255,
	260,
	265,
	270,
	275,
	280,
	285,
	290,
	295,
	300,
	305,
	310,
	315,
	320,
	325,
	330,
	335,
	340,
	345,
	350,
	355,
	360,
	365,
	370,
	375,
	380,
	385,
	390,
	395,
	400,
	405,
];

const MyComponent = (props) => {
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

export default MyComponent;
