import React from 'react';
import {useTheme} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import emptyStateAnimation from '@/assets/animations/empty-state.json';
import OutlinedButton from "@/components/Buttons/OutlinedButton";
import styled from "styled-components/native";

const NoAgreementScreen: React.FC<{ onContinue: () => void }> = (
  {
    onContinue,
  }
) => {
  const {colors} = useTheme();

  return (
    <>
      <LottieContainer>
        <LottieView
          source={emptyStateAnimation}
          autoPlay
          loop
          style={{width: 280, height: 280}}
        />
      </LottieContainer>

      <NoAgreementText color={colors.text}>
        You have not created any agreement yet. You can start creating one from
        here.
      </NoAgreementText>
      {/*<OutlinedButton
        title='Create New Agreement'
        onPress={onContinue}
      />*/}

      <OutlinedButton text={"Create New Agreement"} onPress={onContinue}/>
    </>
  );
};

export default NoAgreementScreen;

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
