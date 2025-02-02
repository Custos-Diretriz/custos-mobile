import React from 'react';
import styled from 'styled-components/native';
import { StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { LucidePlus } from "lucide-react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";

export type ButtonProps = {
  text: string;
  textType?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
  icon?: React.ReactNode;
  onPress: () => void;
  children?: React.ReactNode;
};

const GradientButton: React.FC<ButtonProps> = ({ text, textType, icon, onPress, children }) => {
  const colorScheme = "dark";
  const _textType = textType || 'default';

  return (
    <TouchableOpacity
      style={styles.buttonContainer}
      onPress={onPress}
    >
      <LinearGradient
        colors={['#0094FF', '#A02294']}
        start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
        style={{ padding: 3, borderRadius: 100 }}
      >
        {
          children
          ?? <ThemedView style={styles.buttonContentContainer}>
            <ThemedText style={{ color: "#EAFBFF" }} type={_textType}>{text}</ThemedText>
            {icon ?? <LucidePlus strokeWidth={3} color={Colors[colorScheme ?? "light"].text} />}
          </ThemedView>
        }
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default GradientButton;

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 100,
  },
  buttonContentContainer: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 8,
    justifyContent: "center",
    backgroundColor: Colors.primary_color,
    borderRadius: 100,
    paddingHorizontal: 20,
    paddingVertical: 14,
  }
})

const GradientBorder = styled(LinearGradient).attrs({
  start: { x: 0, y: 0 },
  end: { x: 1, y: 0 },
})`
    padding: 3px;
    border-radius: 100px 100px;
    width: 292px;
`;

const ButtonContainer = styled(TouchableOpacity) <{ background: string }>`
        //background-color: ${(props) => props.background};
    border-radius: 100px;
    padding: 15px 20px;
    align-items: center;
    justify-content: center;
    flex-direction: row;
`;

const PlusIconContainer = styled(TouchableOpacity)`
    margin-left: 10px;
`;

const ButtonView = styled(ThemedView)`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    //background-color: #000;
    border-radius: 30px;
    padding: 16px 0;
`;

const ButtonText = styled(ThemedText) <{ color: string }>`
    color: ${(props) => props.color};
    font-size: 16px;
`;
