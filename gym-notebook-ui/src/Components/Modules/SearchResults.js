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

const SearchResults = (props) => {
	const {workout, showModal} = props;
	const [workoutName, setWorkoutName] = useState({});

	useEffect(() => {}, []);

	return (
		<>
			<Card style={styles.cardContainer}>
				<Card.Content>
					<Button mode="outlined" compact={true}>
						<Paragraph style={styles.cardContent}>{workout.workoutName}</Paragraph>
					</Button>
				</Card.Content>
				<Card.Actions style={styles.cardButton}>
					<Button
						mode="outlined"
						style={styles.buttonStyles}
						textColor={GlobalStyles.hexColor.green}
					>
						{workout.bodyPart}
					</Button>
					<Button
						mode="outlined"
						textColor={GlobalStyles.hexColor.black}
						style={styles.buttonStyles}
					>
						{workout.targetMuscle}
					</Button>
					<Button
						mode="outlined"
						style={styles.buttonStyles}
						textColor={GlobalStyles.hexColor.black}
					>
						{workout.equipment}
					</Button>
					<IconButton
						icon="file-gif-box"
						style={styles.buttonStyles}
						iconColor={GlobalStyles.hexColor.green}
						onPress={() => showModal(workout)}
					/>
				</Card.Actions>
			</Card>
		</>
	);
};

export default SearchResults;
