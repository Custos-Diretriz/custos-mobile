// AgreementContentScreen.tsx
import React from 'react';
import { View, TextInput, Text } from 'react-native';
import styled from 'styled-components/native';
import OutlinedButton from '@/components/OutlinedButton';
import { useTheme } from '@react-navigation/native';

const AgreementContentScreen: React.FC<{ onContinue: () => void }> = ({
  onContinue,
}) => {
  const { colors } = useTheme();

  return (
    <Container>
      <StyledText color={colors.text}>Agreement Content</StyledText>
      <InputContainer>
        <InputTitle color={colors.text}>Agreement Title</InputTitle>
        <Input placeholder='Enter the title here' />
      </InputContainer>

      <InputContainer>
        <InputTitle color={colors.text}>Agreement Content</InputTitle>
        <ContentInput
          placeholder='Write or paste the content of your agreement here'
          multiline
        />
      </InputContainer>

      <OutlinedButton
        title='Continue'
        onPress={onContinue}
      />
    </Container>
  );
};

export default AgreementContentScreen;

const Container = styled.View`
  top: 100px;
  padding: 20px;
`;

const Input = styled.TextInput`
  border: 1px solid #ddd;
  padding: 10px;
  margin-bottom: 20px;
`;

const ContentInput = styled.TextInput`
  border: 1px solid #ddd;
  padding: 10px;
  height: 100px;
  margin-bottom: 20px;
`;

const StyledText = styled.Text<{ color: string }>`
  color: ${(props) => props.color};
  font-size: 24px;
`;

const InputTitle = styled.Text<{ color: string }>`
  color: ${(props) => props.color};
  font-size: 18px;
  margin-top: 20px;
  margin-bottom: 10px;
`;

const InputContainer = styled.View`
`;
