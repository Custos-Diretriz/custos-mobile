import React from "react";
import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "@react-navigation/native";
import Plus from "@/assets/svgs/plus.svg";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";

export type BottonProps = {
  title: string;
  onPress: () => void;
};

const GradientButton: React.FC<BottonProps> = ({ title, onPress }) => {
  const { colors } = useTheme();

  return (
    <ButtonContainer background={colors.background} onPress={onPress}>
      <GradientBorder colors={["#0094FF", "#A02294"]}>
        <ButtonView>
          <ButtonText color={colors.text}>{title}</ButtonText>
          <PlusIconContainer>
            <Plus fill={colors.text} />
          </PlusIconContainer>
        </ButtonView>
      </GradientBorder>
    </ButtonContainer>
  );
};

export default GradientButton;

const GradientBorder = styled(LinearGradient).attrs({
  start: { x: 0, y: 0 },
  end: { x: 1, y: 0 },
})`
  padding: 3px;
  border-radius: 100px 100px;
  width: 292px;
`;

const ButtonContainer = styled(TouchableOpacity) <{ background: string }>`
  background-color: ${(props) => props.background};
  border-radius: 100px;
  margin: 15px 20px;
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