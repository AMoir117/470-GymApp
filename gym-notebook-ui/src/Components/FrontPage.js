import React, {useState, useEffect, useReducer} from "react";
import {BottomNavigation} from "react-native-paper";
import MainSchedule from "./front-page/MainSchedule";
import FriendsList from "./front-page/FriendsList";
import Lobby from "./front-page/Lobby";
import SchedulesList from "./front-page/SchedulesList";

const FrontPage = ({navigation}) => {
	const [update, setUpdate] = useReducer((x) => x + 1, 0);
	const [index, setIndex] = useState(0);
	const [routes] = useState([
		{key: "main", title: "Main", focusedIcon: "star", unfocusedIcon: "star-outline"},
		{key: "friends", title: "Friends", focusedIcon: "heart", unfocusedIcon: "heart-outline"},
		{key: "lobby", title: "Lobby", focusedIcon: "forum", unfocusedIcon: "forum-outline"},
		{
			key: "schedules",
			title: "Schedules",
			focusedIcon: "notebook-edit",
			unfocusedIcon: "notebook-edit-outline",
		},
	]);

	const FriendsRoute = () => {
		return <FriendsList update={update} setUpdate={setUpdate} />;
	};

	const LobbyRoute = () => {
		return <Lobby />;
	};

	const MainRoute = () => {
		return <MainSchedule update={update} />;
	};

	const SchedulesRoute = () => {
		return <SchedulesList setUpdate={setUpdate} />;
	};

	function forceUpdate() {
		setUpdate();
	}
	useEffect(() => {
		navigation.setOptions({title: routes[index].title});
	}, [index, navigation]);

	const renderScene = BottomNavigation.SceneMap({
		main: MainRoute,
		friends: FriendsRoute,
		lobby: LobbyRoute,
		schedules: SchedulesRoute,
	});

	return <BottomNavigation navigationState={{index, routes, update, setUpdate}} onIndexChange={setIndex} renderScene={renderScene} />;
};

export default FrontPage;
