import React, {useState, useEffect} from "react";
import {View, Text, StyleSheet, Modal as Modal2} from "react-native";
import {Menu, Portal, Modal as Modal1, Button, Provider} from "react-native-paper";
import GlobalStyles from "./GlobalStyles";

const styles = StyleSheet.create({
	gifModal: {
		width: 100,
		height: 100,
		alignSelf: "center",
	},
});

const MenuDrawer = () => {
	console.log("inside MenuDrawer!!!");
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		console.log(visible);
	}, [visible]);

	const showModal = () => setVisible(true);
	const hideModal = () => setVisible(false);

	const ShowDrawer = () => {
		return <Modal2 visible={visible} onDismiss={hideModal} style={styles.gifModal} />;
	};

	return (
		<Button icon="menu" onPress={showModal}>
			<Modal2 visible={visible} onDismiss={hideModal} />;
		</Button>
	);
};

export default MenuDrawer;
