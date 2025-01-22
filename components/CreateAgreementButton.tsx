import React from "react";
import { useTheme } from "@react-navigation/native";
import styled from "styled-components/native";
import { Button } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { TouchableOpacity } from "react-native";

export type ButtonProps = {
  onPress: () => void;
  title: string;
};

const CreateAgreementBut: React.FC<ButtonProps> = ({ onPress, title }) => {
  const { colors } = useTheme();

  return (
    <LinearGradientCont
      colors={["#00f", "#f0f"]}
      style={{
        borderWidth: 1,
        borderColor: "transparent",
        borderRadius: 50,
        overflow: "hidden",
        paddingVertical: 0,
      }}
    >
      <ButtonContainer>
        <Button
          mode="contained"
          onPress={onPress}
          labelStyle={{ color: `${colors.text}` }}
          style={{
            borderRadius: 50,
            paddingVertical: 6,
          }}
        >
          {title}
        </Button>
      </ButtonContainer>
    </LinearGradientCont>
  );
};

export default CreateAgreementBut;

const ButtonContainer = styled(TouchableOpacity)`
  width: auto;
  height: 50px;
  border-radius: 32px;
  align-items: center;
  justify-content: center;
`;

const LinearGradientCont = styled(LinearGradient).attrs({
  start: { x: 0, y: 0 },
  end: { x: 1, y: 1 },
})`
  border-radius: 32px;
`;
