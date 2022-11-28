import {React} from "react";
import {Provider} from "react-native-paper";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {GestureHandlerRootView} from "react-native-gesture-handler";

import SearchBar from "./src/Components/SearchBar";
import Login from "./src/Components/Login";
import Signup from "./src/Components/Signup";
import FrontPage from "./src/Components/FrontPage";
import UserProfile from "./src/Components/UserProfile";
import GlobalStyles from "./src/Components/GlobalStyles";
import CustomNavigationBar from "./src/Components/CustomNavigationBar";
import ProfileView from "./src/Components/ProfileView";
import Schedules from "./src/Components/front-page/Schedules";
import ResetPassword from "./src/Components/ResetPassword";
import EditableUserProfile from "./src/Components/EditableUserProfile";

import ScheduleView from "./src/Components/front-page/ScheduleView";
import WorkoutView from "./src/Components/front-page/WorkoutView";
//import DrawerTest from "./src/Components/DrawerTest";

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
								headerBackTitleVisible: false,
							}}
						/>
						<Stack.Screen name="Front Page" component={FrontPage} options={{header: (props) => <CustomNavigationBar {...props} />}} />
						<Stack.Screen name="User Profile" component={UserProfile} options={{header: (props) => <CustomNavigationBar {...props} />}} />
						<Stack.Screen
							name="Schedules"
							component={Schedules}
							options={{
								title: "",
								headerStyle: {backgroundColor: GlobalStyles.hexColor.brown},
								headerBackTitleVisible: false,
							}}
						/>
						<Stack.Screen
							name="SearchBar"
							component={SearchBar}
							options={{
								title: "",
								headerStyle: {backgroundColor: GlobalStyles.hexColor.brown},
								headerBackTitleVisible: false,
							}}
						/>
						<Stack.Screen
							name="Editable User Profile"
							component={EditableUserProfile}
							options={{header: (props) => <CustomNavigationBar {...props} />}}
						/>
						<Stack.Screen
							name="Profile View"
							component={ProfileView}
							options={{
								title: "",
								headerStyle: {backgroundColor: GlobalStyles.hexColor.brown},
								headerBackTitleVisible: false,
							}}
						/>
						<Stack.Screen
							name="Schedule View"
							component={ScheduleView}
							options={{
								title: "",
								headerStyle: {backgroundColor: GlobalStyles.hexColor.brown},
								headerBackTitleVisible: false,
							}}
						/>
						<Stack.Screen
							name="Workout View"
							component={WorkoutView}
							options={{
								title: "",
								headerStyle: {backgroundColor: GlobalStyles.hexColor.brown},
								headerBackTitleVisible: false,
							}}
						/>
						{/* <Stack.Screen
							name="WORKING_PAGE"
							component={ResetPassword}
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
