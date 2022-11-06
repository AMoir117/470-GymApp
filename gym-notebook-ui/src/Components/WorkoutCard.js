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
} from "react-native-paper";
import GlobalStyles from "./GlobalStyles";
import axios from "axios";

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
});

const MyComponent = (props) => {
	const {workout, showModal} = props;

	useEffect(() => {
		const getAllExercises = async () => {
			const response = await axios.get(`exercises/all-exercises`);
		};

		getAllExercises();
	}, []);

	return (
		<>
			<Card style={styles.cardContainer}>
				<Card.Content>
					<Button mode="outlined" compact={true} onPress={() => showModal(workout)}>
						<Paragraph style={styles.cardContent}>
							{workout.name.toUpperCase()}
						</Paragraph>
					</Button>
				</Card.Content>
				<Card.Actions style={styles.cardButton}>
					<Button mode="outlined">Sets: {workout.sets}</Button>
					<Button mode="outlined">Reps: {workout.reps}</Button>
					<Button mode="outlined">{workout.weight} Lbs</Button>
				</Card.Actions>
			</Card>
		</>
	);
};

export default MyComponent;
