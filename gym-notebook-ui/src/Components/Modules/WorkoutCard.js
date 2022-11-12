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

	return (
		<>
			<Card style={styles.cardContainer}>
				<Card.Content>
					<Button mode="outlined" compact={true}>
						<Paragraph style={styles.cardContent}>
							{workout.name.toUpperCase()}
						</Paragraph>
					</Button>
				</Card.Content>
				<Card.Actions style={styles.cardButton}>
					<IconButton
						icon="file-gif-box"
						style={styles.buttonStyles}
						iconColor={GlobalStyles.hexColor.green}
						onPress={() => showModal(workout)}
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
