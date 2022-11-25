import {useState, useEffect} from "react";
import {StyleSheet, View, Image, Text} from "react-native";
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
		borderRadius: 0,
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

const SearchResults = (props) => {
	const {workout, showModal, addResult} = props;
	const [workoutName, setWorkoutName] = useState({});

	useEffect(() => {}, []);

	return (
		<>
			<Card style={styles.cardContainer}>
				<Card.Content>
					<Button mode="outlined" compact={true} onPress={() => addResult(workout)}>
						<Paragraph style={styles.cardContent}>
							{workout.workoutName.toUpperCase()}
						</Paragraph>
					</Button>
					<View>
						<Text>{workout.bodyPart.toUpperCase()}</Text>
						<Text>{workout.targetMuscle.toUpperCase()}</Text>
						<Text>{workout.equipment.toUpperCase()}</Text>
					</View>
				</Card.Content>
			</Card>
		</>
	);
};

export default SearchResults;
