import React from 'react';
import {
  View,
  Text,
  Pressable,
  Modal,
  StyleSheet,
  useWindowDimensions,
  Dimensions,
} from "react-native";
import { BlurView } from "expo-blur";
import { DrawerActions, useNavigation, useTheme } from "@react-navigation/native";
import { Arrow, Cross, Logo, Menu, Video } from "@/assets/images/icons/Icons";
import { LinearGradient } from "expo-linear-gradient";
import { useAppKit } from '@reown/appkit-wagmi-react-native';
import { useRouter } from 'expo-router';
import GradientButton from './GradientButton';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { X } from 'lucide-react-native';

interface MenuItemProps {
  text: string;
  icon?: React.ComponentType;
  onPress?: () => void;
}


const Navbar = () =>{
  const { colors } = useTheme();
  const [modalVisible, setModalVisible] = React.useState(false);
  const navigation = useNavigation();
  const router = useRouter();
  const { open } = useAppKit();






  return (
    <>
      <View style={[styles.navbar, { backgroundColor: colors.background }]}>
        <Pressable>
          <Logo />
        </Pressable>
        <Pressable onPress={()=>{
          navigation.dispatch(DrawerActions.toggleDrawer())
        }}>
          <Menu />
        </Pressable>
      </View>

      
    </>
  );
};





export default Navbar;


export const DrawerContent = () => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const width = Dimensions.get("screen").width;
  const { colors } = useTheme();
  const navigation = useNavigation();
  const router = useRouter();
  const { open } = useAppKit();
  const handleConnect = async () => {
    await open({ view: 'Connect' });
    router.push("/(tabs)");
};
const MenuItem: React.FC<MenuItemProps> = ({ text, icon: Icon, onPress }) => (
  <Pressable onPress={onPress} style={styles.item}>
    <Text style={[styles.menuItem, { color: colors.text }]}>{text}</Text>
    {Icon && <Icon />}
  </Pressable>
);

  return (
    <>
    {/* <Modal transparent visible={modalVisible} animationType="fade"> */}
        <Pressable style={[styles.modalOverlay,{width:width,left:0}]} onPress={() => setModalVisible(false)}>
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0)']}
            style={styles.backgr}
          />
          <X
           size={30}
           color="white"
           style={styles.closeIcon}
           onPress={()=>{
            navigation.dispatch(DrawerActions.toggleDrawer())
            setModalVisible(false)
          }} />
          <BlurView intensity={20} style={styles.blurContainer}>
            <MenuItem text="Home" icon={undefined} onPress={undefined} />
            <MenuItem text="Company" icon={undefined} onPress={undefined} />
            <MenuItem text="Agreement" icon={Cross} onPress={undefined} />
            <MenuItem text="Video" icon={Video} onPress={undefined} />

          
                <View style={styles.buttonItem}>
                <GradientButton onPress={handleConnect} width={248} />
                </View>

          </BlurView>
        </Pressable>
      {/* </Modal> */}
    </>
  )
}


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
    position:'relative',
    backgroundColor: "rgb(0, 0, 0)",
  },
  blurContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
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
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 1,
  },
});