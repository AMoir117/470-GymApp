import React from "react";
import {SectionList, StyleSheet, Text, View} from "react-native";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 60,
	},
	sectionHeader: {
		paddingTop: 2,
		paddingLeft: 10,
		paddingRight: 10,
		paddingBottom: 2,
		fontSize: 14,
		fontWeight: "bold",
		backgroundColor: "rgba(247,247,247,1.0)",
	},
	item: {
		padding: 10,
		fontSize: 18,
		height: 44,
	},
});

const SectionListBasics = () => {
	return (
		<View style={styles.container}>
			<SectionList
				sections={[
					{
						title: "Muscle",
						data: [
							"Abdominals",
							"Abductors",
							"Biceps",
							"Calves",
							"Chest",
							"Forearms",
							"Glutes",
							"Hamstrings",
							"Lats",
							"Lower back",
							"Middle back",
							"Neck",
							"Quadriceps",
							"Traps",
							"Triceps",
						],
					},
					{
						title: "Difficulty",
						data: ["Beginner", "Intermediate", "Expert"],
					},
					{
						title: "Type",
						data: [
							"Cardio",
							"Olympic weightlifting",
							"plyometrics",
							"Powerlifting",
							"Strength",
							"Stretching",
							"Strongman",
						],
					},
				]}
				renderSectionHeader={({section}) => (
					<Text style={styles.sectionHeader}>{section.title}</Text>
				)}
				renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
			/>
		</View>
	);
};

export default SectionListBasics;
