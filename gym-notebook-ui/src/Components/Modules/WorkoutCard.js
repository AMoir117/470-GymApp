import {useState, useEffect} from "react";
import {StyleSheet, Text} from "react-native";
import {Button, Card, IconButton} from "react-native-paper";
import GlobalStyles from "../GlobalStyles";
import axios from "axios";

const styles = StyleSheet.create({
	cardContainer: {
		width: 400,
		alignSelf: "center",
		backgroundColor: GlobalStyles.hexColor.brown,
		margin: 2,
		borderRadius: 0,
	},
	cardName: {
		flex: 1,
	},
	workoutName: {
		color: GlobalStyles.hexColor.black,
	},
	cardButton: {
		alignSelf: "center",
	},
});

const MyComponent = (props) => {
	const {workout, showModal} = props;
	const [workoutName, setWorkoutName] = useState({});

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

	return (
		<>
			<Card style={styles.cardContainer}>
				<Card.Content>
					<Button mode="outlined" compact={true} contentStyle={styles.cardName}>
						<Text style={styles.workoutName}>{workoutName.workoutName}</Text>
					</Button>
				</Card.Content>
				<Card.Actions style={styles.cardButton}>
					<IconButton
						icon="file-gif-box"
						iconColor={GlobalStyles.hexColor.green}
						onPress={() => showModal(workoutName)}
					/>
					<Button mode="outlined" textColor={GlobalStyles.hexColor.black}>
						Sets: {workout.sets}
					</Button>
					<Button mode="outlined" textColor={GlobalStyles.hexColor.black}>
						Reps: {workout.reps}
					</Button>
					<Button mode="outlined" textColor={GlobalStyles.hexColor.black}>
						{workout.weight} Lbs
					</Button>
				</Card.Actions>
			</Card>
		</>
	);
};

export default MyComponent;
