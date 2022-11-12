import axios from "axios";
import React, {useEffect, useState} from "react";
import {SectionList, StyleSheet, Text, View} from "react-native";

// require('dotenv').config();

const AxiosConfigured = () => {
	// Indicate to the API that all requests for this app are AJAX
	axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

	// Set the baseURL for all requests to the API domain instead of the current domain
	// axios.defaults.baseURL = `http://localhost:8443/api/v1`;
	//fixme::find out how to put ip address in .env

	// desktop
	// axios.defaults.baseURL = `http://192.168.1.242:8443/api/v1`;
	// phone
	axios.defaults.baseURL = `http://192.168.1.142:8443/api/v1`;



	// Allow the browser to send cookies to the API domain (which include auth_token)
	axios.defaults.withCredentials = true;

	//    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrf_token;

	return axios;
};

const axiosAgent = AxiosConfigured();

export default class APIInterface {
	async getUserInfo(user_id) {
		return axiosAgent
			.get(`login/${user_id}`)
			.then((userInfo) => userInfo.data)
			.catch((error) => ({
				error,
				user: undefined,
			}));
	}

	async allExercises() {
		return axiosAgent.get(`exercises/all-exercises`);
	}

	async exerciseByName(workoutName) {
		console.log(`exercisesByName called for workoutName = ${workoutName}`);
		return axiosAgent.get(`exercises/${workoutName}`);
	}

	async exerciseByID(id) {
		console.log(`exercisesByID called for id = ${id}`);
		return axiosAgent.get(`exercises/${id}`);
	}

	async exerciseByBodyPart(bodyPart) {
		console.log(`exercisesByBodyPart called for body part = ${bodyPart}`);
		return axiosAgent.get(`exercises/${bodyPart}`);
	}

	async exerciseByMuscle(targetMuscle) {
		console.log(`exercisesByBodyPart called for muscle = ${targetMuscle}`);
		return axiosAgent.get(`exercises/${targetMuscle}`);
	}

	async exerciseByEquipment(equipment) {
		console.log(`exercisesByEquipment called for equipment = ${equipment}`);
		return axiosAgent.get(`exercises/${equipment}`);
	}

	async allUsers() {
		console.log(`users all users called for`);
		return axiosAgent.get(`users/all-users`);
	}

	async userByName(username) {
		console.log(`userByName called for username = ${username}`);
		return axiosAgent.get(`users/${username}`);
	}

	async userByID(id) {
		console.log(`userByID called for id = ${id}`);
		return axiosAgent.get(`users/${id}`);
	}

	async getUsersFollowers(followedUserID){
		console.log(`getUsersFollowers called for id = ${followedUserID}`);
		return axiosAgent.get(`users/get-followers/${followedUserID}`);
	}

	async getPublicSchedules(){
		console.log(`getPublicSchedules called.`);
		return axiosAgent.get(`weekly-schedule/lobby`);
	}

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
