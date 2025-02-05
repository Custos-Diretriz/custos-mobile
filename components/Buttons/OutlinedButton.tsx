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
  const colorScheme = useColorScheme();
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
            <ThemedText type={_textType}>{text}</ThemedText>
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
    borderRadius: 100,
    paddingHorizontal: 20,
    paddingVertical: 14,
  }
})