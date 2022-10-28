import {React, useEffect, useState} from "react";
import {SectionList, StyleSheet, Text, View} from "react-native";
import SectionListBasics from "./src/Components/SectionListBasics";
import {NavigationContainer, StackActions} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

import Data from "./src/API_interface/API_interface";
import SearchBar from "./src/Components/SearchBar";
import Login from "./src/Components/Login";
import Signup from "./src/Components/Signup";
import FrontPage from "./src/Components/FrontPage";

const App = () => {
	const Stack = createNativeStackNavigator();

	return (
		<NavigationContainer>
			<Stack.Navigator screenOptions={{headerStyle: {backgroundColor: "#ff0000"}}}>
				<Stack.Screen name="Login" component={Login} options={{title: ""}} />
				<Stack.Screen name="Signup" component={Signup} options={{title: "My Profile"}} />
				<Stack.Screen
					name="Front Page"
					component={FrontPage}
					options={{title: "Gym Notebook"}}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default App;
