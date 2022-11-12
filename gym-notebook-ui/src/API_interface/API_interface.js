import axios from "axios";
import React, {useEffect, useState} from "react";
import {SectionList, StyleSheet, Text, View} from "react-native";

const AxiosConfigured = () => {
	// Indicate to the API that all requests for this app are AJAX
	axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

	// Set the baseURL for all requests to the API domain instead of the current domain
	// axios.defaults.baseURL = `http://localhost:8443/api/v1`;
	//fixme::find out how to put ip address in .env
	axios.defaults.baseURL = `http://10.0.0.224:8443/api/v1`;

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
	async insertNewUser(userInfo) {
		console.log(`API_Interface::insertNewUser: userInfo contains: ${JSON.stringify(userInfo )}`);
		return axiosAgent.post(`users/insert-user`, userInfo);
	}
}
