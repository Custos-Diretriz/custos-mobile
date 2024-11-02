import React, { useState } from 'react';
import styled from 'styled-components/native';
import { useTheme } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import DropDownPicker from 'react-native-dropdown-picker';
import CancelButton from '../CancelButton';
import ContinueButton from '../ContinueButton';
import { TextInput } from 'react-native-paper';

const SelectAgreementScreen: React.FC<{ onContinue: () => void }> = ({
  onContinue,
}) => {
  const { colors } = useTheme();

  return (
    <OuterContainer>
      <LinearGradient
        colors={['#19b1d2', '#0094ff']}
        style={{ flex: 1, borderRadius: 20, padding: 2 }} // Padding to create space for the border
      >
        <Container background={colors.background}>
          <StyledText color={colors.text}>Agreement Content</StyledText>
          <AgreementTypeText color={colors.text}>
            Agreement Title
          </AgreementTypeText>
          <InputWrapper
            colors={['#19B1D2', '#0094FF']}
            style={{ borderRadius: 10, padding: 2 }}
          >
            <TextInput
              mode='outlined'
              placeholder='Enter the title here'
              right={<TextInput.Affix text='/100' />}
            />
          </InputWrapper>
          <InputTitle color={colors.text}>Agreement Content</InputTitle>
          <GradientWrapper
            colors={['#BEBDBD', '#858585']}
            style={{ borderRadius: 10, padding: 2 }}
          >
            <TextInput
              mode='outlined'
              placeholder='Write or paste the content of your agreement here'
              right={<TextInput.Affix text='/100' />}
              multiline
              style={{ height: 146 }}
            />
          </GradientWrapper>

          <ButtonsContainer>
            <CancelButton
              onPress={onContinue}
              title='Cancel'
            />
            <ContinueButton
              onPress={onContinue}
              title='Continue'
            />
          </ButtonsContainer>
        </Container>
      </LinearGradient>
    </OuterContainer>
  );
};

export default SelectAgreementScreen;

// Outer container to ensure correct border appearance
const OuterContainer = styled.View`
  margin-top: 70px;
  width: 180px;
  height: 501.5px;
  align-items: center;
  justify-content: center;
`;

// This container is for the content only
const Container = styled.View<{ background: string }>`
  background-color: ${(props) => props.background};
  border-radius: 20px;
  padding: 20px;
  width: 100%;
`;

const InputWrapper = styled(LinearGradient).attrs({
  start: { x: 0, y: 0 },
  end: { x: 1, y: 0 },
})`
  border-radius: 5px;
  overflow: hidden;
  height: 60px;
`;

const GradientWrapper = styled(LinearGradient).attrs({
  start: { x: 0, y: 0 },
  end: { x: 1, y: 0 },
})`
  border-radius: 5px;
  overflow: hidden;
  margin-bottom: 20px;
  height: 150px;
`;

const StyledText = styled.Text<{ color: string }>`
  color: ${(props) => props.color};
  font-size: 26px;
  line-height: 35px;
`;

const AgreementTypeText = styled.Text<{ color: string }>`
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${(props) => props.color};
  font-size: 20px;
`;

const ButtonsContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 5px;
  width: 100%;
  gap: 30;
`;

const InputTitle = styled.Text<{ color: string }>`
  color: ${(props) => props.color};
  font-size: 18px;
  margin-top: 20px;
  margin-bottom: 10px;
`;
