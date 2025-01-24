import React, { useContext } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { BlurView } from "expo-blur";
import {
  DrawerActions,
  useNavigation,
  useTheme,
} from "@react-navigation/native";
import { Cross, Logo, Menu, Video } from "@/assets/images/icons/Icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import GradientButton from "./GradientButton";
import { X } from "lucide-react-native";

interface MenuItemProps {
  text: string;
  icon?: React.ComponentType;
  onPress?: () => void;
}

const Navbar = () => {
  const { colors } = useTheme();
  const [modalVisible, setModalVisible] = React.useState(false);
  const navigation = useNavigation();
  const router = useRouter();

  return (
    <>
      <View style={[styles.navbar, { backgroundColor: colors.background }]}>
        <Pressable>
          <Logo />
        </Pressable>
        <Pressable
          onPress={() => {
            navigation.dispatch(DrawerActions.toggleDrawer());
          }}
        >
          <Menu />
        </Pressable>
      </View>
    </>
  );
};

export default Navbar;

export const DrawerContent = () => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const { colors } = useTheme();
  const navigation = useNavigation();
  const router = useRouter();

  const MenuItem: React.FC<MenuItemProps> = ({ text, icon: Icon, onPress }) => (
    <Pressable onPress={onPress} style={styles.item}>
      <Text style={[styles.menuItem, { color: "#FFF" }]}>{text}</Text>
      {Icon && <Icon />}
    </Pressable>
  );

  return (
    <>
      {/* <Modal transparent visible={modalVisible} animationType="fade"> */}
      <Pressable
        style={[styles.modalOverlay]}
        onPress={() => setModalVisible(true)}
      >
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0)"]}
          style={styles.backgr}
        />
        <X
          size={30}
          color="white"
          style={styles.closeIcon}
          onPress={() => {
            navigation.dispatch(DrawerActions.closeDrawer());
            setModalVisible(false);
          }}
        />
        <BlurView intensity={20} style={styles.blurContainer}>
          <MenuItem text="Home" icon={undefined} onPress={undefined} />
          <MenuItem text="Company" icon={undefined} onPress={undefined} />
          <MenuItem text="Agreement" icon={Cross} onPress={undefined} />
          <MenuItem text="Video" icon={Video} onPress={undefined} />

          <View style={styles.buttonItem}>
            <GradientButton
              /*onPress={handleConnect}*/ width={248}
            ></GradientButton>
          </View>
        </BlurView>
      </Pressable>
      {/* </Modal> */}
    </>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    marginTop: 0,
    elevation: 3,
    paddingTop: 40,
  },
  backgr: {
    ...StyleSheet.absoluteFillObject,
  },
  modalOverlay: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    position: "relative",
    backgroundColor: "rgb(0, 0, 0)",
  },
  blurContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    padding: 20,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  menuItem: {
    fontSize: 23,
    textAlign: "left",
    paddingLeft: 10,
    marginRight: 10,
  },
  border: {
    borderRadius: 50,
    padding: 2,
    marginTop: 50,
  },
  buttonItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  closeIcon: {
    position: "absolute",
    top: 50,
    right: 20,
    zIndex: 1,
  },
});
