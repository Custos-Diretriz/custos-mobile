import React from 'react';
import { View, Text, TextInput } from 'react-native';
import styled from 'styled-components/native';
import OutlinedButton from '@/components/OutlinedButton';
import { useTheme } from '@react-navigation/native';

const VerifyIdentityScreen: React.FC<{ onContinue: () => void }> = ({
  onContinue,
}) => {
  const { colors} = useTheme()
  return (
    <Container>
      <StyledText color={colors.text}>Verify your identity</StyledText>
      {/* Replace this with your custom picker */}
      <InputContainer>
        <InputTitle color={colors.text}>Agreement Type</InputTitle>
        <Input placeholder='Enter the title here' />
      </InputContainer>
      <InputContainer>
        <InputTitle color={colors.text}>Identity Type</InputTitle>
        <Input placeholder='Enter the title here' />
      </InputContainer>
      <InputContainer>
        <InputTitle color={colors.text}>Identity Number</InputTitle>
        <Input placeholder='Enter Your ID Number' />
      </InputContainer>
      <OutlinedButton
        title='Continue'
        onPress={onContinue}
      />
    </Container>
  );
};

export default VerifyIdentityScreen;

const Container = styled.View`
  top: 100px;
  padding: 20px;
`;

const IdentityTypePicker = styled.View`
  border: 1px solid #ddd;
  padding: 10px;
  margin-bottom: 20px;
`;

const Input = styled.TextInput`
  border: 1px solid #ddd;
  padding: 10px;
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

const InputContainer = styled.View``;