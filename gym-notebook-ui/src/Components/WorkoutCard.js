import {useState, useEffect} from "react";
import {StyleSheet} from "react-native";
import {Avatar, Button, Card, Title, Paragraph, SegmentedButtons} from "react-native-paper";

const data = [
	{
		id: "3194",
		name: "frankenstein squat",
		gifUrl: "http://d205bpvrqc9yn1.cloudfront.net/3194.gif",
		sets: 4,
		reps: 12,
		weight: 50,
	},
	{
		id: "3561",
		name: "glute bridge march",
		gifUrl: "http://d205bpvrqc9yn1.cloudfront.net/3561.gif",
		sets: 3,
		reps: 8,
		weight: 225,
	},
	{
		id: "1761",
		name: "hanging oblique knee raise",
		gifUrl: "http://d205bpvrqc9yn1.cloudfront.net/1761.gif",
		sets: 4,
		reps: 10,
		weight: 75,
	},
	{
		id: "0490",
		name: "incline close-grip push-up",
		gifUrl: "http://d205bpvrqc9yn1.cloudfront.net/0490.gif",
		sets: 3,
		reps: 10,
		weight: 55,
	},
	{
		id: "2400",
		name: "inverse leg curl (on pull-up cable machine)",
		gifUrl: "http://d205bpvrqc9yn1.cloudfront.net/2400.gif",
		sets: 4,
		reps: 8,
		weight: 315,
	},
	{
		id: "0520",
		name: "kettlebell alternating press",
		gifUrl: "http://d205bpvrqc9yn1.cloudfront.net/0520.gif",
		sets: 3,
		reps: 8,
		weight: 225,
	},
];

const styles = StyleSheet.create({
	cardContent: {alignSelf: "center"},
	cardButton: {justifyContent: "center", alignSelf: "center"},
});

const MyComponent = (props) => {
	const {workout} = props;
	const [value, setValue] = useState("");
	return (
		<Card>
			<Card.Content>
				<Paragraph style={styles.cardContent}>{workout.name}</Paragraph>
			</Card.Content>
			<Card.Actions style={styles.cardButton}>
				<SegmentedButtons
					value={value}
					onValueChange={setValue}
					buttons={[
						{
							value: "set",
							label: workout.sets,
						},
						{
							value: "rep",
							label: workout.reps,
						},
						{
							value: "weight",
							label: workout.weight,
						},
					]}
				/>
			</Card.Actions>
		</Card>
	);
};

export default MyComponent;
