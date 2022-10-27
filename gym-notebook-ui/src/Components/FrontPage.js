import * as React from "react";
import {BottomNavigation, Text} from "react-native-paper";
import Signup from "./Signup";
import MainSchedule from "./front-page/MainSchedule";
import FriendsList from "./front-page/FriendsList";

const FriendsRoute = () => <FriendsList />;

const LobbyRoute = () => <Text>Lobby</Text>;

const MainRoute = () => <MainSchedule />;

const MyProfileRoute = () => <Signup />;

const SchedulesRoute = () => <Text>Schedules</Text>;

const FrontPage = () => {
	const [index, setIndex] = React.useState(2);
	const [routes] = React.useState([
		{key: "friends", title: "Friends", focusedIcon: "heart", unfocusedIcon: "heart-outline"},
		{key: "lobby", title: "Lobby", focusedIcon: "album"},
		{key: "main", title: "Main", focusedIcon: "star", unfocusedIcon: "star-outline"},
		{key: "myProfile", title: "MyProfile", focusedIcon: "history"},
		{
			key: "schedules",
			title: "Schedules",
			focusedIcon: "bell",
			unfocusedIcon: "bell-outline",
		},
	]);

	const renderScene = BottomNavigation.SceneMap({
		main: MainRoute,
		friends: FriendsRoute,
		lobby: LobbyRoute,
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
