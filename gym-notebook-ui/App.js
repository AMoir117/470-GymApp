import {React, useEffect, useState, goBack} from "react";
import {SectionList, StyleSheet, Text, View} from "react-native";
import {Drawer} from "react-native-paper";
import SectionListBasics from "./src/Components/SectionListBasics";
import {NavigationContainer, StackActions} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
//import {CustomNavigationBar} from "./src/Components/CustomNavigationBar";

import Data from "./src/API_interface/API_interface";
import SearchBar from "./src/Components/SearchBar";
import Login from "./src/Components/Login";
import Signup from "./src/Components/Signup";
import FrontPage from "./src/Components/FrontPage";

import {GestureHandlerRootView} from "react-native-gesture-handler";
import GlobalStyles from "./src/Components/GlobalStyles";
import {ScreenStackHeaderBackButtonImage} from "react-native-screens";

import {Appbar} from "react-native-paper";

const CustomNavigationBar = () => {
	return (
		<Appbar.Header>
			<Appbar.Content title="My awesome app" />
		</Appbar.Header>
	);
};

const App = () => {
	const Stack = createNativeStackNavigator();

	return (
		<GestureHandlerRootView style={{flex: 1}}>
			<NavigationContainer>
				<Stack.Navigator
					initialRouteName="Login"
					screenOptions={{
						header: (props) => <CustomNavigationBar {...props} />,
					}}
				>
					<Stack.Screen name="Login" component={Login} />
					<Stack.Screen name="Signup" component={Signup} />
					<Stack.Screen name="Front Page" component={FrontPage} />
				</Stack.Navigator>
			</NavigationContainer>
		</GestureHandlerRootView>
	);
};

export default App;
