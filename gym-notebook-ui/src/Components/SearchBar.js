import React, {useState, useEffect} from "react";
import {SafeAreaView, Text, StyleSheet, View, FlatList, TextInput} from "react-native";
import axios from "axios";

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
});
const SearchBar = () => {
	const [search, setSearch] = useState("");
	const [filteredDataSource, setFilteredDataSource] = useState([]);
	const [masterDataSource, setMasterDataSource] = useState([]);

	const API_KEY = process.env.API_KEY;
	const listExercisesURL = `exercises/all-exercises`;
	const mobileUrl = `http://192.168.1.242:19006/api/v1/exercises/all-exercise`;
	const testUrl = `http://192.168.1.242:19000/exercises/all-exercises`;

	useEffect(() => {
		const getAllExercises = async () => {
			const response = await axios.get(listExercisesURL);
			//console.log(response);
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
				const itemData = item.name ? item.name.toUpperCase() : "".toUpperCase();
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
			<Text style={styles.itemStyle} onPress={() => getItem(item)}>
				{item.workoutName.toUpperCase()}
			</Text>
		);
	};

	const ItemSeparatorView = () => {
		return (
			// Flat List Item Separator
			<View
				style={{
					height: 0.5,
					width: "100%",
					backgroundColor: "#C8C8C8",
				}}
			/>
		);
	};

	const getItem = (item) => {
		// Function for click on an item
		alert("clicked");
	};

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
					ItemSeparatorComponent={ItemSeparatorView}
					renderItem={ItemView}
				/>
			</View>
		</SafeAreaView>
	);
};

export default SearchBar;
