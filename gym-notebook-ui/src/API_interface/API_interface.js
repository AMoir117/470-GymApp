import axios from "axios";
import React, {useEffect, useState} from "react";
import {SectionList, StyleSheet, Text, View} from "react-native";

const AxiosConfigured = () => {
	// Indicate to the API that all requests for this app are AJAX
	axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

	// Set the baseURL for all requests to the API domain instead of the current domain
	// axios.defaults.baseURL = `http://localhost:8443/api/v1`;
	axios.defaults.baseURL = `http://localhost:8443/api/v1`;


	// Allow the browser to send cookies to the API domain (which include auth_token)
	axios.defaults.withCredentials = true;


//    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrf_token;

	return axios;
};


const axiosAgent = AxiosConfigured();

export default class APIInterface {

	async getUserInfo(user_id) {
		return axiosAgent.get(`login/${user_id}`)
			.then(userInfo => userInfo.data)
			.catch(error => (
				{
					error,
					user: undefined
				}));
	}

	async allExercises() {
		return axiosAgent.get(`exercises/all-exercises`);
	}

	/*async routesWithID(routeID) {
		return axiosAgent.get(`routes/${routeID}`);
	}*/

}

/*const styles = StyleSheet.create({
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

const API_KEY = process.env.API_KEY;
const listExercisesURL = `https://exercisedb.p.rapidapi.com/exercises?rapidapi-key=${API_KEY}`;
const listTargetMuscleURL = `https://exercisedb.p.rapidapi.com/exercises/targetList?rapidapi-key=${API_KEY}`;
const listEquipmentURL = `https://exercisedb.p.rapidapi.com/exercises/equipmentList?rapidapi-key=${API_KEY}`;

function Data() {
	const [exercises, setExercises] = useState([]);
	const [targetMuscles, setTargetMuscles] = useState([]);
	const [equipments, setEquipments] = useState([]);

	useEffect(() => {
		const getAllExercises = async () => {
			const response = await axios.get(listExercisesURL);
			setExercises(response.data);
		};

		const getTargetMuscles = async () => {
			const response = await axios.get(listTargetMuscleURL);
			setTargetMuscles(response.data);
		};

		const getAllEquipments = async () => {
			const response = await axios.get(listEquipmentURL);
			setEquipments(response.data);
		};

		getAllExercises();
		getTargetMuscles();
		getAllEquipments();
	}, []);

	return (
		<View style={styles.container}>
			<SectionList
				sections={[
					{
						title: "Target Muscle",
						data: exercises.map((obj) => <Text>{obj.gifUrl}</Text>),
					},
				]}
				renderSectionHeader={({section}) => (
					<Text style={styles.sectionHeader}>{section.title}</Text>
				)}
				renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
			/>
		</View>
	);
}

export default Data;*/