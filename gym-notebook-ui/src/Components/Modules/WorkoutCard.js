import {useState, useEffect} from "react";
import {StyleSheet, View, Image} from "react-native";
import {
	Avatar,
	Button,
	Card,
	Title,
	Paragraph,
	SegmentedButtons,
	Divider,
	Provider,
	Portal,
	Modal,
	IconButton,
} from "react-native-paper";
import GlobalStyles from "../GlobalStyles";
import axios from "axios";
import {StorageAccessFramework} from "expo-file-system";

const styles = StyleSheet.create({
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
					<Button mode="outlined" compact={true}>
						<Paragraph style={styles.cardContent}>{workoutName.workoutName}</Paragraph>
					</Button>
				</Card.Content>
				<Card.Actions style={styles.cardButton}>
					<IconButton
						icon="file-gif-box"
						style={styles.buttonStyles}
						iconColor={GlobalStyles.hexColor.green}
						onPress={() => showModal(workoutName)}
					/>
					<Button
						mode="outlined"
						style={styles.buttonStyles}
						textColor={GlobalStyles.hexColor.green}
					>
						Sets: {workout.sets}
					</Button>
					<Button
						mode="outlined"
						textColor={GlobalStyles.hexColor.black}
						style={styles.buttonStyles}
					>
						Reps: {workout.reps}
					</Button>
					<Button
						mode="outlined"
						style={styles.buttonStyles}
						textColor={GlobalStyles.hexColor.black}
					>
						{workout.weight} Lbs
					</Button>
				</Card.Actions>
			</Card>
		</>
	);
};

export default MyComponent;
