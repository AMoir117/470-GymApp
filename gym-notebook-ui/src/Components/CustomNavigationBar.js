import {useState, useEffect} from "react";
import {StyleSheet} from "react-native";
import {Appbar, Divider, Menu} from "react-native-paper";
import GlobalStyles from "./GlobalStyles";
import {useNavigation} from "@react-navigation/native";

const styles = StyleSheet.create({
	appBarHeader: {
		backgroundColor: GlobalStyles.hexColor.brown,
	},
	appBarTitle: {
		fontSize: 25,
	},
	dividerMenu: {
		borderWidth: 0.5,
	},
	menuItemTop: {
		color: GlobalStyles.hexColor.brown,
		backgroundColor: GlobalStyles.hexColor.black,
	},
	menuItemBot: {
		color: GlobalStyles.hexColor.black,
		backgroundColor: GlobalStyles.hexColor.brown,
	},
});

const CustomNavigationBar = ({navigation, back}) => {
	const [visible, setVisible] = useState(false);
	const openMenu = () => setVisible(true);
	const closeMenu = () => setVisible(false);

	return (
		<Appbar.Header style={styles.appBarHeader} mode="center-aligned">
			<Menu
				visible={visible}
				onDismiss={closeMenu}
				//statusBarHeight={}
				anchor={
					<Appbar.Action
						icon="menu"
						color={GlobalStyles.hexColor.black}
						onPress={openMenu}
					/>
				}
			>
				<Menu.Item
					title="Profile"
					style={styles.menuItemTop}
					titleStyle={styles.menuItemTop}
					onPress={() => {
						closeMenu();
						navigation.navigate("Profile");
					}}
				/>
				<Divider style={styles.dividerMenu} />
				<Menu.Item
					title="Option 2"
					style={styles.menuItemBot}
					titleStyle={styles.menuItemBot}
					onPress={() => {}}
				/>
				<Divider style={styles.dividerMenu} />
				<Menu.Item
					title="Sign out"
					style={styles.menuItemBot}
					titleStyle={styles.menuItemBot}
					onPress={() => {
						console.log("Signed out");
						navigation.navigate("Login");
					}}
				/>
			</Menu>
			<Appbar.Content
				titleStyle={styles.appBarTitle}
				color={GlobalStyles.hexColor.black}
				title="Gym Notebook"
			/>
		</Appbar.Header>
	);
};

export default CustomNavigationBar;
