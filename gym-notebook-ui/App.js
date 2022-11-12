import {React, useEffect, useState, goBack} from "react";
import {SectionList, StyleSheet, Text, View} from "react-native";
import {Provider, Drawer, Appbar} from "react-native-paper";
import {NavigationContainer, StackActions} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {GestureHandlerRootView} from "react-native-gesture-handler";

import Data from "./src/API_interface/API_interface";
import SearchBar from "./src/Components/Modules/SearchBar";
import Login from "./src/Components/Login";
import Signup from "./src/Components/Signup";
import FrontPage from "./src/Components/FrontPage";
import Profile from "./src/Components/front-page/Profile";
import GlobalStyles from "./src/Components/GlobalStyles";
import CustomNavigationBar from "./src/Components/CustomNavigationBar";
import ProfileViewer from "./src/Components/front-page/ProfileViewer";
import ScheduleEdit from "./src/Components/ScheduleEdit";
import SectionListBasics from "./src/Components/SectionListBasics";

const App = () => {
	const Stack = createNativeStackNavigator();

	return (
		<GestureHandlerRootView style={{flex: 1}}>
			<Provider>
				<NavigationContainer>
					<Stack.Navigator initialRouteName="Login">
						<Stack.Screen
							name="Login"
							component={Login}
							options={{
								title: "",
								headerStyle: {backgroundColor: GlobalStyles.hexColor.brown},
							}}
						/>
						<Stack.Screen
							name="Signup"
							component={Signup}
							options={{
								title: "",
								headerStyle: {backgroundColor: GlobalStyles.hexColor.brown},
							}}
						/>
						<Stack.Screen
							name="Front Page"
							component={FrontPage}
							options={{header: (props) => <CustomNavigationBar {...props} />}}
						/>
						<Stack.Screen
							name="Profile Viewer"
							component={ProfileViewer}
							options={{header: (props) => <CustomNavigationBar {...props} />}}
						/>
						<Stack.Screen
							name="WORKING_PAGE"
							component={SearchBar}
							options={{
								title: "WORKING_PAGE",
								headerStyle: {backgroundColor: GlobalStyles.hexColor.brown},
							}}
						/>
					</Stack.Navigator>
				</NavigationContainer>
			</Provider>
		</GestureHandlerRootView>
		//<SearchBar />
	);
};

export default App;
