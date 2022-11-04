import {React, useEffect, useState, goBack} from "react";
import {SectionList, StyleSheet, Text, View} from "react-native";
import {Provider, Drawer} from "react-native-paper";
import SectionListBasics from "./src/Components/SectionListBasics";
import {NavigationContainer, StackActions} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import CustomNavigationBar from "./src/Components/CustomNavigationBar";

import Data from "./src/API_interface/API_interface";
import SearchBar from "./src/Components/SearchBar";
import Login from "./src/Components/Login";
import Signup from "./src/Components/Signup";
import FrontPage from "./src/Components/FrontPage";

import {GestureHandlerRootView} from "react-native-gesture-handler";
import GlobalStyles from "./src/Components/GlobalStyles";
import {ScreenStackHeaderBackButtonImage} from "react-native-screens";

import {Appbar} from "react-native-paper";

const App = () => {
	const Stack = createNativeStackNavigator();

	return (
		<GestureHandlerRootView style={{flex: 1}}>
			<Provider>
				<NavigationContainer>
					<Stack.Navigator initialRouteName="Login">
						<Stack.Screen name="Login" component={Login} options={{title: ""}} />
						<Stack.Screen name="Signup" component={Signup} options={{title: ""}} />
						<Stack.Screen
							name="Front Page"
							component={FrontPage}
							options={{header: (props) => <CustomNavigationBar {...props} />}}
						/>
					</Stack.Navigator>
				</NavigationContainer>
			</Provider>
		</GestureHandlerRootView>
	);
};

export default App;
