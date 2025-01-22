import React from "react";
import { useTheme } from "@react-navigation/native";
import styled from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";
import { Button, TouchableOpacity } from "react-native";

export type ButtonProps = {
  onPress: () => void;
  title: string;
};

const OutlinedButton: React.FC<ButtonProps> = ({ onPress, title }) => {
  const { colors } = useTheme();

  return (
    <LinearGradientCont
      colors={["#19B1D2", "#0094FF"]}
      style={{
        borderWidth: 1,
        borderColor: "transparent",
        overflow: "hidden",
        paddingVertical: 0,
      }}
    >
      <ButtonContainer>
        <ButtonContained onPress={onPress} color={colors.text} title={title} />
      </ButtonContainer>
    </LinearGradientCont>
  );
};

export default OutlinedButton;

const ButtonContainer = styled(TouchableOpacity)`
  width: 100%;
  height: 100%;
  border-radius: 32px;
  align-items: center;
  justify-content: center;
  border-color: #a02294;
  border-width: 1px;
`;

const ButtonContained = styled(Button)`
  width: 100%;
  height: 100%;
  border-radius: 50px;
  justify-content: center;
  padding: 6px;
`;

const LinearGradientCont = styled(LinearGradient).attrs({
  start: { x: 0, y: 0 },
  end: { x: 1, y: 1 },
})`
  width: 100%;
  height: 50px;
  border-radius: 32px;
`;
