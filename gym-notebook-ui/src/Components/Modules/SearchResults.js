import {useState, useEffect} from "react";
import {StyleSheet, View, Text} from "react-native";
import {Button, Card, Divider, Paragraph} from "react-native-paper";
import GlobalStyles from "../GlobalStyles";

const styles = StyleSheet.create({
	cardContainer: {
		backgroundColor: GlobalStyles.hexColor.brown,
		flex: 1,
		margin: 2,
		borderRadius: 0,
	},
	cardContent: {
		fontSize: 15,
		alignSelf: "center",
	},
	textStyle: {
		textAlign: "center",
	},
});

const SearchResults = (props) => {
	const {workout, showModal, addResult} = props;

	useEffect(() => {}, []);

	return (
		<>
			<Card style={styles.cardContainer}>
				<Card.Content>
					<Button mode="outlined" compact={true} onPress={() => addResult(workout)}>
						<Paragraph style={styles.cardContent}>{workout.workoutName.toUpperCase()}</Paragraph>
					</Button>
					<View>
						<Text style={styles.textStyle}>{workout.bodyPart.toUpperCase()}</Text>
						<Text style={styles.textStyle}>{workout.targetMuscle.toUpperCase()}</Text>
						<Text style={styles.textStyle}>{workout.equipment.toUpperCase()}</Text>
					</View>
				</Card.Content>
			</Card>
		</>
	);
};

export default SearchResults;
