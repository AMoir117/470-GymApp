import React, {useState, useEffect} from "react";
import {SafeAreaView, Text, StyleSheet, View, FlatList, TextInput, Image} from "react-native";
import axios from "axios";
import {IconButton, Modal, Portal, Provider} from "react-native-paper";

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

// axios.get("/bodypart/:bodyPart")
// axios.get("/muscle/:targetMuscle")
// axios.get("/equipment/:equipment")

const SearchBar = ({navigation, back}) => {
	const [search, setSearch] = useState("");
	const [filteredDataSource, setFilteredDataSource] = useState([]);
	const [masterDataSource, setMasterDataSource] = useState([]);
	const [gifShow, setGifShow] = useState(false);
	const [modalUri, setModalUri] = useState("");

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
						}}
					/>
				);
			},
		});
	}, [navigation]);

	useEffect(() => {
		const getAllExercises = async () => {
			const response = await axios.get("exercises/all-exercises");
			setFilteredDataSource(response.data);
			setMasterDataSource(response.data);
		};

		getAllExercises();
	}, []);

	const searchFilterFunction = (text) => {
		if (text) {
			// Filter the masterDataSource and update FilteredDataSource
			const newData = masterDataSource.filter(function (item) {
				// Applying filter for the inserted text in search bar
				//item is an exercise with the same naming convention in the db
				const itemData = item.targetMuscle
					? item.targetMuscle.toUpperCase()
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
		return (
			// Flat List Item
			<Text style={styles.itemStyle} onPress={() => showModal(item)}>
				{item.workoutName.toUpperCase()}
			</Text>
		);
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
				<TextInput
					style={styles.textInputStyle}
					onChangeText={(text) => searchFilterFunction(text)}
					value={search}
					underlineColorAndroid="transparent"
					placeholder="Search Here"
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

export default SearchBar;
