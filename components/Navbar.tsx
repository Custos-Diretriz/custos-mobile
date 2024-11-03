import React from 'react';
import {
  View,
  Text,
  Pressable,
  Modal,
  StyleSheet,
} from "react-native";
import { BlurView } from "expo-blur";
import { useTheme } from "@react-navigation/native";
import { Arrow, Cross, Logo, Menu, Video } from "@/assets/images/icons/Icons";
import { LinearGradient } from "expo-linear-gradient";
import { useAppKit } from '@reown/appkit-wagmi-react-native';
import { useRouter } from 'expo-router';
import GradientButton from './GradientButton';



const Navbar = () => {
  const { colors } = useTheme();
  const [modalVisible, setModalVisible] = React.useState(false);

  const router = useRouter();
  const { open } = useAppKit();

  const handleConnect = async () => {
      await open({ view: 'Connect' });
      router.push("/(tabs)");
  };


  interface MenuItemProps {
    text: string;
    icon?: React.ComponentType;
    onPress?: () => void;
  }

  const MenuItem: React.FC<MenuItemProps> = ({ text, icon: Icon, onPress }) => (
    <Pressable onPress={onPress} style={styles.item}>
      <Text style={[styles.menuItem, { color: colors.text }]}>{text}</Text>
      {Icon && <Icon />}
    </Pressable>
  );

  return (
    <>
      <View style={[styles.navbar, { backgroundColor: colors.background }]}>
        <Pressable>
          <Logo />
        </Pressable>
        <Pressable onPress={() => setModalVisible(true)}>
          <Menu />
        </Pressable>
      </View>

      <Modal transparent visible={modalVisible} animationType="fade">
        <Pressable style={styles.modalOverlay} onPress={() => setModalVisible(false)}>
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0)']}
            style={styles.backgr}
          />
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
      </Modal>
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
    flex: 1,
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
  }
});

export default Navbar;