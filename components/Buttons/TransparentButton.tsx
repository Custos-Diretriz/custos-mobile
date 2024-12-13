import React from 'react';
import styled from 'styled-components/native';
import {StyleSheet, TouchableOpacity, useColorScheme} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {LucidePlus} from "lucide-react-native";
import {ThemedView} from "@/components/ThemedView";
import {ThemedText} from "@/components/ThemedText";
import {Colors} from "@/constants/Colors";

export type ButtonProps = {
  text: string;
  textType?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
  icon?: React.ReactNode;
  onPress: () => void;
  customStyles?: any;
  children?: React.ReactNode;
};

const TransparentButton: React.FC<ButtonProps> = ({text, textType, icon, onPress, customStyles, children}) => {
  const colorScheme = useColorScheme();
  const _textType = textType || 'default';

  return (
    <TouchableOpacity
      style={[styles.buttonContainer, customStyles]}
      onPress={onPress}
    >
      <LinearGradient
        colors={['transparent', 'transparent']}
        start={{x: 0, y: 0}} end={{x: 1, y: 0}}
        style={{padding: 3, borderRadius: 100}}
      >
        <ThemedView style={styles.buttonContentContainer}>
          {
            children
            ??
              <React.Fragment><ThemedText type={_textType}>{text}</ThemedText>
                {icon ?? <LucidePlus strokeWidth={3} color={Colors[colorScheme ?? "light"].text}/>}
              </React.Fragment>
          }
        </ThemedView>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default TransparentButton;

const styles = StyleSheet.create({
  buttonContainer: {
    flexGrow: 1,
    borderRadius: 100,
  },
  buttonContentContainer: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 8,
    justifyContent: "center",
    borderRadius: 100,
    paddingHorizontal: 20,
    paddingVertical: 14,
    elevation: 8,
  }
})
