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
	List,
} from "react-native-paper";
import GlobalStyles from "../GlobalStyles";
import axios from "axios";
import SelectDropdown from "react-native-select-dropdown";
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
		width: 100,
		backgroundColor: GlobalStyles.hexColor.brown,
		borderColor: "#000000",
		borderWidth: 1,
	},
});

const acceptedSets = [1, 2, 3, 4, 5];
const acceptedReps = [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
const acceptedWeights = [
	5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 100, 105, 110,
	115, 120, 125, 130, 135, 140, 145, 150, 155, 160, 165, 170, 175, 180, 185, 190, 195, 200, 205,
	210, 215, 220, 225, 230, 235, 240, 245, 250, 255, 260, 265, 270, 275, 280, 285, 290, 295, 300,
	305, 310, 315, 320, 325, 330, 335, 340, 345, 350, 355, 360, 365, 370, 375, 380, 385, 390, 395,
	400, 405,
];

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
					{/* <Button
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
					</Button> */}
					<SelectDropdown
						data={acceptedSets}
						defaultButtonText="Sets"
						buttonStyle={styles.buttonStyles}
						onSelect={(selectedItem, index) => {
							console.log(selectedItem, index);
						}}
						buttonTextAfterSelection={(selectedItem, index) => {
							// text represented after item is selected
							// if data array is an array of objects then return selectedItem.property to render after item is selected
							return selectedItem;
						}}
						rowTextForSelection={(item, index) => {
							// text represented for each item in dropdown
							// if data array is an array of objects then return item.property to represent item in dropdown
							return item;
						}}
					/>
					<SelectDropdown
						data={acceptedReps}
						defaultButtonText="Reps"
						buttonStyle={styles.buttonStyles}
						onSelect={(selectedItem, index) => {
							console.log(selectedItem, index);
						}}
						buttonTextAfterSelection={(selectedItem, index) => {
							// text represented after item is selected
							// if data array is an array of objects then return selectedItem.property to render after item is selected
							return selectedItem;
						}}
						rowTextForSelection={(item, index) => {
							// text represented for each item in dropdown
							// if data array is an array of objects then return item.property to represent item in dropdown
							return item;
						}}
					/>
					<SelectDropdown
						data={acceptedWeights}
						defaultButtonText="Weight"
						buttonStyle={styles.buttonStyles}
						onSelect={(selectedItem, index) => {
							console.log(selectedItem, index);
						}}
						buttonTextAfterSelection={(selectedItem, index) => {
							// text represented after item is selected
							// if data array is an array of objects then return selectedItem.property to render after item is selected
							return selectedItem;
						}}
						rowTextForSelection={(item, index) => {
							// text represented for each item in dropdown
							// if data array is an array of objects then return item.property to represent item in dropdown
							return item;
						}}
					/>
				</Card.Actions>
			</Card>
		</>
	);
};

export default MyComponent;
