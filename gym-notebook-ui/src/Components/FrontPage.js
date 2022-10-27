import * as React from "react";
import {BottomNavigation, Text} from "react-native-paper";
import Signup from "./Signup";

const FriendsRoute = () => <Text>Friends</Text>;

const LobbyRoute = () => <Text>Lobby</Text>;

const MainRoute = () => <Text>Main</Text>;

const MyProfileRoute = () => <Signup />;

const SchedulesRoute = () => <Text>Schedules</Text>;

const FrontPage = () => {
	const [index, setIndex] = React.useState(0);
	const [routes] = React.useState([
		{key: "friends", title: "Friends", focusedIcon: "heart", unfocusedIcon: "heart-outline"},
		{key: "lobby", title: "Lobby", focusedIcon: "album"},
		{key: "main", title: "Main", focusedIcon: "star"},
		{key: "myProfile", title: "MyProfile", focusedIcon: "history"},
		{
			key: "schedules",
			title: "Schedules",
			focusedIcon: "bell",
			unfocusedIcon: "bell-outline",
		},
	]);

	const renderScene = BottomNavigation.SceneMap({
		friends: FriendsRoute,
		lobby: LobbyRoute,
		main: MainRoute,
		myProfile: MyProfileRoute,
		schedules: SchedulesRoute,
	});

	return (
		<BottomNavigation
			navigationState={{index, routes}}
			onIndexChange={setIndex}
			renderScene={renderScene}
		/>
	);
};

export default FrontPage;
