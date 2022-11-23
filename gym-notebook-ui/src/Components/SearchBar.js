import React, {useState, useEffect} from "react";
import {
	SafeAreaView,
	Text,
	StyleSheet,
	View,
	FlatList,
	TextInput,
	Image,
	ScrollView,
} from "react-native";
import {createDrawerNavigator, DrawerItemList} from "@react-navigation/drawer";
import {IconButton, Modal, Portal, Provider, Searchbar, Button} from "react-native-paper";
import SelectDropdown from "react-native-select-dropdown";
import axios from "axios";
import {DrawerActions, useNavigation} from "@react-navigation/native";
import SearchResults from "./Modules/SearchResults";
import GlobalStyles from "./GlobalStyles";

const styles = StyleSheet.create({
	container: {
		backgroundColor: "white",
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
});

const acceptedSets = [1, 2, 3, 4, 5];
const acceptedReps = [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
const acceptedWeights = [
	"BW",
	5,
	10,
	15,
	20,
	25,
	30,
	35,
	40,
	45,
	50,
	55,
	60,
	65,
	70,
	75,
	80,
	85,
	90,
	95,
	100,
	100,
	105,
	110,
	115,
	120,
	125,
	130,
	135,
	140,
	145,
	150,
	155,
	160,
	165,
	170,
	175,
	180,
	185,
	190,
	195,
	200,
	205,
	210,
	215,
	220,
	225,
	230,
	235,
	240,
	245,
	250,
	255,
	260,
	265,
	270,
	275,
	280,
	285,
	290,
	295,
	300,
	305,
	310,
	315,
	320,
	325,
	330,
	335,
	340,
	345,
	350,
	355,
	360,
	365,
	370,
	375,
	380,
	385,
	390,
	395,
	400,
	405,
];

const BODY_PART = [
	"Back",
	"Cardio",
	"Lower-arms",
	"Lower-legs",
	"Shoulders",
	"Upper-arms ",
	"Upper-legs",
	"Waist",
	"Neck",
	"Chest",
];

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
	const [gifShow, setGifShow] = useState(false);
	const [modalUri, setModalUri] = useState("");
	const [addWorkoutShow, setAddWorkoutShow] = useState(false);
	const [workoutToAdd, setWorkoutToAdd] = useState({});

	useEffect(() => {
		const getAllExercises = async () => {
			const response = await axios.get("exercises/all-exercises");
			setFilteredDataSource(response.data);
			setMasterDataSource(response.data);
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
			headerRight: () => {
				return (
					<IconButton
						icon="filter"
						onPress={() => {
							//todo::add window to filter equipment, targetMuscle, bodyPart
							navigation.dispatch(DrawerActions.openDrawer());
						}}
					/>
				);
			},
		});
	}, [navigation]);

	const searchFilterFunction = (text) => {
		if (text) {
			// Filter the masterDataSource and update FilteredDataSource
			const newData = masterDataSource.filter(function (item) {
				const itemData = item.workoutName
					? item.workoutName.toUpperCase()
					: "".toUpperCase();

				const textData = text.toUpperCase();
				return itemData.indexOf(textData) > -1;
			});
			setFilteredDataSource(newData);
			setSearch(text);
		} else {
			// Inserted text is blank
			// Update FilteredDataSource with masterDataSource
			setFilteredDataSource(masterDataSource);
			setSearch(text);
		}
	};

	const ItemView = ({item}) => {
		/*
		item.bodyPart
		item.equipment
		item.gifUrl
		item.id
		item.targetMuscle
		item.workoutName
		*/
		return <SearchResults workout={item} addResult={addResult} />;
	};

	const addResult = async (item) => {
		setWorkoutToAdd(item);
		showAddModal();
		console.log(item);
		//todo::show modal asking for reps sets and weight
		// await axios.post(
		// 	"daily-routine/insert/${item.id}/${set}/${rep}/${weight}/:dayOfWeek/:weeklyScheduleID"
		// );
		//	"/insert/:exerciseID/:sets/:reps/:weight/:dayOfWeek/:weeklyScheduleID",
	};

	const AddWorkout = (props) => {
		return (
			<Provider>
				<Portal>
					<Modal
						visible={addWorkoutShow}
						onDismiss={hideAddModal}
						contentContainerStyle={styles.gifModal}
					>
						<View
							style={{
								flex: 1,
								backgroundColor: GlobalStyles.hexColor.brown,
								flexDirection: "column",
							}}
						>
							<Text style={{fontSize: 15, alignSelf: "center", padding: 10}}>
								{workoutToAdd.workoutName
									? workoutToAdd.workoutName.toUpperCase()
									: ""}
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

							<Button style={{margin: 20}} mode="outlined" onPress={addRoutine}>
								Add Routine
							</Button>
						</View>
					</Modal>
				</Portal>
			</Provider>
		);
	};

	const showAddModal = (item) => {
		setAddWorkoutShow(true);
	};
	const hideAddModal = () => setAddWorkoutShow(false);

	const addRoutine = async () => {
		await axios
			.post(`daily-routine/insert/${workoutToAdd.id}/3/10/45/${day}/${weekSchedule.id}`)
			.then(() => {
				navigation.navigate("Schedules", {weekSchedule: weekSchedule});
			});
	};

	return (
		<SafeAreaView style={{flex: 1}}>
			<View style={styles.container}>
				{/* <TextInput
					style={styles.textInputStyle}
					onChangeText={(text) => searchFilterFunction(text)}
					value={search}
					underlineColorAndroid="transparent"
					placeholder="Search Here"
				/> */}
				<Searchbar
					placeholder="Search"
					onChangeText={(text) => searchFilterFunction(text)}
				/>
				<FlatList
					data={filteredDataSource}
					keyExtractor={(item, index) => index.toString()}
					renderItem={ItemView}
				/>
			</View>
			{/* <ShowGif /> */}
			<AddWorkout />
		</SafeAreaView>
	);
};

export default SearchBar;
