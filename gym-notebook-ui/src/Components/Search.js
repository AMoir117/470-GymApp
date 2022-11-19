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
import {IconButton, Modal, Portal, Provider, Searchbar} from "react-native-paper";
import axios from "axios";
import {DrawerActions, useNavigation} from "@react-navigation/native";
import SearchResults from "./Modules/SearchResults";

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
		height: 300,
		alignSelf: "center",
	},
});

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
	"body weight",
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

const SearchBar = ({navigation, back}) => {
	const [search, setSearch] = useState("");
	const [filteredDataSource, setFilteredDataSource] = useState([]);
	const [masterDataSource, setMasterDataSource] = useState([]);
	const [gifShow, setGifShow] = useState(false);
	const [modalUri, setModalUri] = useState("");

	const [searchQuery, setSearchQuery] = useState("");

	useEffect(() => {
		const getAllExercises = async () => {
			const response = await axios.get("exercises/all-exercises");
			setFilteredDataSource(response.data);
			setMasterDataSource(response.data);

			setSearchQuery(response);
		};

		getAllExercises();
	}, []);

	const onChangeSearch = (query) => setSearchQuery(query);

	const searchFilterFunction = (text) => {
		if (text) {
			// Filter the masterDataSource and update FilteredDataSource
			const newData = masterDataSource.filter(function (item) {
				const itemData = item.targetMuscle
					? item.targetMuscle.toUpperCase()
					: "".toUpperCase();
				item.bodyPart ? item.bodyPart.toUpperCase() : "".toUpperCase();
				item.workoutName ? item.workoutName.toUpperCase() : "".toUpperCase();

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

	const searchFilterFunction2 = (text) => {
		masterDataSource.filter(function (item) {
			if (item.hasOwnProperty(text)) {
				console.log(true);
			}
		});
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
		return <SearchResults showModal={showModal} workout={item} addResult={addResult} />;
	};

	const addResult = async (item) => {
		console.log(item);
		await axios.post(
			"daily-routine/insert/${item.id}/:sets/:reps/:weight/:dayOfWeek/:weeklyScheduleID"
		);
		//	"/insert/:exerciseID/:sets/:reps/:weight/:dayOfWeek/:weeklyScheduleID",
	};

	const ShowGif = (props) => {
		return (
			<Provider>
				<Portal>
					<Modal
						visible={gifShow}
						onDismiss={hideModal}
						contentContainerStyle={styles.gifModal}
					>
						<Image style={{width: 300, height: 300}} source={{uri: modalUri}} />
					</Modal>
				</Portal>
			</Provider>
		);
	};
	const showModal = (item) => {
		setGifShow(true);
		setModalUri(item.gifUrl);
	};
	const hideModal = () => setGifShow(false);

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
					onChangeText={(text) => searchFilterFunction2(text)}
					value={searchQuery}
				/>
				<FlatList
					data={filteredDataSource}
					keyExtractor={(item, index) => index.toString()}
					renderItem={ItemView}
				/>
			</View>
			<ShowGif />
		</SafeAreaView>
	);
};

const RightDrawerContent = () => {
	return (
		<View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
			<Text>This is the right drawer</Text>
		</View>
	);
};

const RightDrawer = createDrawerNavigator();

const RightDrawerScreen = () => {
	return (
		<RightDrawer.Navigator
			useLegacyImplementation
			id="RightDrawer"
			drawerContent={(props) => <RightDrawerContent {...props} />}
			screenOptions={{
				drawerPosition: "right",
				headerShown: false,
			}}
		>
			<RightDrawer.Screen name="HomeDrawer" component={SearchBar} />
		</RightDrawer.Navigator>
	);
};

const Search = () => {
	const navigation = useNavigation();

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

	return <RightDrawerScreen />;
};

export default Search;
