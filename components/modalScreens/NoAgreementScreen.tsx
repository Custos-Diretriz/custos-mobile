import React from "react";
import styled from "styled-components/native";
import OutlinedButton from "@/components/OutlinedButton";
import { useTheme } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import emptyStateAnimation from "@/assets/animations/empty-state.json";

const NoAgreementScreen: React.FC<{ onContinue: () => void }> = ({
  onContinue,
}) => {
  const { colors } = useTheme();

  return (
    <Body>
      <LottieContainer>
        <LottieView
          source={emptyStateAnimation}
          autoPlay
          loop
          style={{ width: 280, height: 280 }}
        />
      </LottieContainer>

      <NoAgreementText color={colors.text}>
        You have not created any agreement yet. You can start creating one from
        here.
      </NoAgreementText>
      <OutlinedButton title="Create New Agreement" onPress={onContinue} />
    </Body>
  );
};

export default NoAgreementScreen;

const Body = styled.View`
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: '#1E2F37',
`;

const LottieContainer = styled.View`
  width: 280px;
  height: 280px;
`;

const NoAgreementText = styled.Text<{ color: string }>`
  color: ${(props) => props.color};
  font-size: 16px;
  text-align: center;
  width: 300px;
  margin-bottom: 30px;
`;
