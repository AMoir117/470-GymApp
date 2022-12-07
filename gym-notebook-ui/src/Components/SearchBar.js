import React, {useState, useEffect} from "react";
import {SafeAreaView, Text, StyleSheet, View, FlatList, Image} from "react-native";
import {createDrawerNavigator, DrawerItemList} from "@react-navigation/drawer";
import {IconButton, Modal, Portal, Provider, Searchbar, Button} from "react-native-paper";
import axios from "axios";
import {DrawerActions} from "@react-navigation/native";
import SearchResults from "./Modules/SearchResults";
import GlobalStyles from "./GlobalStyles";
import SvgComponent from "../SVG_Backgrounds/Workout-search-bg";

const styles = StyleSheet.create({
	searchBar: {
		marginTop: 5,
		marginBottom: 5,
	},
	itemStyle: {
		padding: 10,
	},
	textInputStyle: {
		height: 40,
		borderWidth: 1,
		paddingLeft: 20,
		margin: 5,
		borderColor: "#009688",
		backgroundColor: "#FFFFFF",
	},
	gifModal: {
		width: 300,
		flexDirection: "row",
		alignSelf: "center",
	},
	buttonStyles: {
		width: 100,
		backgroundColor: GlobalStyles.hexColor.brown,
		borderColor: "#000000",
		borderWidth: 1,
	},
	routineModal: {
		flex: 1,
		backgroundColor: "#cbbeb5",
		flexDirection: "column",
	},
});

const acceptedSets = [1, 2, 3, 4, 5];
const acceptedReps = [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
const acceptedWeights = [
	"BW",
	"5 lbs",
	"10 lbs",
	"15 lbs",
	"20 lbs",
	"25 lbs",
	"30 lbs",
	"35 lbs",
	"40 lbs",
	"45 lbs",
	"50 lbs",
	"55 lbs",
	"60 lbs",
	"65 lbs",
	"70 lbs",
	"75 lbs",
	"80 lbs",
	"85 lbs",
	"90 lbs",
	"95 lbs",
	"100 lbs",
	"100 lbs",
	"105 lbs",
	"110 lbs",
	"115 lbs",
	"120 lbs",
	"125 lbs",
	"130 lbs",
	"135 lbs",
	"140 lbs",
	"145 lbs",
	"150 lbs",
	"155 lbs",
	"160 lbs",
	"165 lbs",
	"170 lbs",
	"175 lbs",
	"180 lbs",
	"185 lbs",
	"190 lbs",
	"195 lbs",
	"200 lbs",
	"205 lbs",
	"210 lbs",
	"215 lbs",
	"220 lbs",
	"225 lbs",
	"230 lbs",
	"235 lbs",
	"240 lbs",
	"245 lbs",
	"250 lbs",
	"255 lbs",
	"260 lbs",
	"265 lbs",
	"270 lbs",
	"275 lbs",
	"280 lbs",
	"285 lbs",
	"290 lbs",
	"295 lbs",
	"300 lbs",
	"305 lbs",
	"310 lbs",
	"315 lbs",
	"320 lbs",
	"325 lbs",
	"330 lbs",
	"335 lbs",
	"340 lbs",
	"345 lbs",
	"350 lbs",
	"355 lbs",
	"360 lbs",
	"365 lbs",
	"370 lbs",
	"375 lbs",
	"380 lbs",
	"385 lbs",
	"390 lbs",
	"395 lbs",
	"400 lbs",
	"405 lbs",
];

const BODY_PART = ["Back", "Cardio", "Lower-arms", "Lower-legs", "Shoulders", "Upper-arms ", "Upper-legs", "Waist", "Neck", "Chest"];

const TARGET_BODY_PART = [
	"abductors",
	"abs",
	"adductors",
	"biceps",
	"calves",
	"cardiovascular system ",
	"delts",
	"forearms",
	"glutes",
	"hamstrings",
	"lats",
	"levator scapulae",
	"pectorals",
	"quads",
	"serratus anterior",
	"spine",
	"traps",
	"triceps",
	"upper back ",
];

const EQUIPMENT = [
	"assisted",
	"band",
	"barbell",
	"body45",
	"bosu ball",
	"cable",
	"dumbbell",
	"elliptical machine",
	"ez barbell",
	"hammer",
	"kettlebell",
	"leverage machine",
	"medicine ball",
	"olympic barbell",
	"resistance band",
	"roller",
	"rope",
	"skierg machine",
	"sled machine",
	"smith machine",
	"stability ball",
	"stationary bike",
	"stepmill machine",
	"tire",
	"trap bar",
	"upper body ergometer",
	"weighted",
	"wheel roller",
];
// const RightDrawer = createDrawerNavigator();

// const RightDrawerContent = (props) => {
// 	const {workoutToAdd} = props;
// 	return (
// 		<View
// 			style={{
// 				flex: 1,
// 				backgroundColor: GlobalStyles.hexColor.brown,
// 				flexDirection: "column",
// 			}}
// 		>
// 			<Text style={{fontSize: 15, alignSelf: "center", padding: 10}}>
// 				{workoutToAdd.workoutName ? workoutToAdd.workoutName.toUpperCase() : ""}
// 			</Text>
// 			{/* <Image
// 				style={{
// 					width: 200,
// 					height: 200,
// 					alignSelf: "center",
// 					margin: 20,
// 				}}
// 				source={{uri: workoutToAdd.gifUrl}}
// 			/> */}
// 			<View style={{flexDirection: "row"}}>
// 				<SelectDropdown
// 					data={acceptedSets}
// 					defaultButtonText="Sets"
// 					buttonStyle={styles.buttonStyles}
// 					onSelect={(selectedItem) => setSets(selectedItem)}
// 					buttonTextAfterSelection={(selectedItem) => {
// 						return selectedItem;
// 					}}
// 				/>
// 				<SelectDropdown
// 					data={acceptedReps}
// 					defaultButtonText="Reps"
// 					buttonStyle={styles.buttonStyles}
// 					onSelect={(selectedItem) => setReps(selectedItem)}
// 					buttonTextAfterSelection={(selectedItem) => {
// 						return selectedItem;
// 					}}
// 				/>
// 				<SelectDropdown
// 					data={acceptedWeights}
// 					defaultButtonText="Weight"
// 					buttonStyle={styles.buttonStyles}
// 					onSelect={(selectedItem) => setWeight(selectedItem)}
// 					buttonTextAfterSelection={(selectedItem) => {
// 						return selectedItem;
// 					}}
// 				/>
// 			</View>
// 			<Button mode="outlined">Add Routine</Button>
// 		</View>
// 	);
// };

// const RightDrawerScreen = (props) => {
// 	const {workoutToAdd} = props;
// 	return (
// 		<RightDrawer.Navigator
// 			useLegacyImplementation
// 			id="RightDrawer"
// 			drawerContent={(props) => <RightDrawerContent {...props} />}
// 			screenOptions={{
// 				drawerPosition: "right",
// 				headerShown: false,
// 			}}
// 		>
// 			<RightDrawer.Screen name="HomeDrawer" component={SearchBar} />
// 		</RightDrawer.Navigator>
// 	);
// };

const SearchBar = ({navigation, back, route}) => {
	const {weekSchedule, day} = route.params;
	const [search, setSearch] = useState("");
	const [filteredDataSource, setFilteredDataSource] = useState([]);
	const [masterDataSource, setMasterDataSource] = useState([]);
	const [addWorkoutShow, setAddWorkoutShow] = useState(false);
	const [workoutToAdd, setWorkoutToAdd] = useState({});

	useEffect(() => {
		const getAllExercises = async () => {
			await axios.get("exercises/all-exercises").then((response) => {
				setFilteredDataSource(response.data);
				setMasterDataSource(response.data);
			});
		};

		getAllExercises();
	}, []);

	useEffect(() => {
		navigation.setOptions({
			headerLeft: () => {
				return (
					<IconButton
						icon="arrow-left"
						onPress={() => {
							navigation.goBack();
						}}
					/>
				);
			},
			// headerRight: () => {
			// 	return (
			// 		<IconButton
			// 			icon="filter"
			// 			onPress={() => {
			// 				//todo::add window to filter equipment, targetMuscle, bodyPart
			// 				navigation.dispatch(DrawerActions.openDrawer());
			// 			}}
			// 		/>
			// 	);
			// },
		});
	}, [navigation]);

	const searchFilterFunction = (text) => {
		if (text) {
			const newData = masterDataSource.filter((item) => {
				const bodyPartData = item.bodyPart ? item.bodyPart.toUpperCase() : "".toUpperCase();
				const equipmentData = item.equipment ? item.equipment.toUpperCase() : "".toUpperCase();
				const targetMuscleData = item.targetMuscle ? item.targetMuscle.toUpperCase() : "".toUpperCase();
				const workoutNameData = item.workoutName ? item.workoutName.toUpperCase() : "".toUpperCase();

				const textData = text.toUpperCase();
				return (
					bodyPartData.indexOf(textData) > -1 ||
					equipmentData.indexOf(textData) > -1 ||
					targetMuscleData.indexOf(textData) > -1 ||
					workoutNameData.indexOf(textData) > -1
				);
			});
			setFilteredDataSource(newData);
			setSearch(text);
		} else {
			setFilteredDataSource(masterDataSource);
			setSearch(text);
		}
	};

	const ItemView = ({item}) => {
		return <SearchResults workout={item} addResult={addResult} />;
	};

	const addResult = async (item) => {
		setWorkoutToAdd(item);
		showAddModal();
	};

	const AddWorkout = (props) => {
		return (
			<Provider>
				<Portal>
					<Modal visible={addWorkoutShow} onDismiss={hideAddModal} contentContainerStyle={styles.gifModal}>
						<View style={styles.routineModal}>
							<Text style={{fontSize: 15, alignSelf: "center", padding: 10}}>
								{workoutToAdd.workoutName ? workoutToAdd.workoutName.toUpperCase() : ""}
							</Text>
							<Image
								style={{
									width: 200,
									height: 200,
									alignSelf: "center",
									margin: 20,
								}}
								source={{uri: workoutToAdd.gifUrl}}
							/>

							<Button style={{margin: 20}} textColor={GlobalStyles.hexColor.red} mode="outlined" onPress={addRoutine}>
								Add Routine
							</Button>
						</View>
					</Modal>
				</Portal>
			</Provider>
		);
	};

	const showAddModal = () => {
		setAddWorkoutShow(true);
	};
	const hideAddModal = () => setAddWorkoutShow(false);

	const addRoutine = async () => {
		await axios.post(`daily-routine/insert/${workoutToAdd.id}/3/10/45/${day}/${weekSchedule.id}`).then(() => {
			navigation.navigate("Schedules", {weekSchedule: weekSchedule});
		});
	};

	return (
		<SafeAreaView style={{flex: 1}}>
			<SvgComponent
				style={{
					position: "absolute",
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
				}}
			/>
			<View style={styles.container}>
				<Searchbar style={styles.searchBar} placeholder="Search" onChangeText={(text) => searchFilterFunction(text)} />
				<FlatList data={filteredDataSource} keyExtractor={(item, index) => index.toString()} renderItem={ItemView} />
			</View>
			<AddWorkout />
		</SafeAreaView>
	);
};

export default SearchBar;
