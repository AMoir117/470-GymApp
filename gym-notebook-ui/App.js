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

import {GestureHandlerRootView} from "react-native-gesture-handler";
import GlobalStyles from "./src/Components/GlobalStyles";

const App = () => {
	const Stack = createNativeStackNavigator();

	return (
		<GestureHandlerRootView style={{flex: 1}}>
			<NavigationContainer>
				<Stack.Navigator
					initialRouteName="Login"
					screenOptions={{
						headerStyle: {backgroundColor: GlobalStyles.hexColor.brown},
						headerTintColor: GlobalStyles.hexColor.black,
						headerTitleAlign: "center",
						headerTitleStyle: {fontSize: 40},
					}}
				>
					<Stack.Screen name="Login" component={Login} options={{title: ""}} />
					<Stack.Screen name="Signup" component={Signup} options={{title: ""}} />
					<Stack.Screen name="Front Page" component={FrontPage} options={{title: ""}} />
				</Stack.Navigator>
			</NavigationContainer>
		</GestureHandlerRootView>
	);
};

export default App;
