import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components/native';
import OutlinedButton from '@/components/OutlinedButton';
import { useTheme } from '@react-navigation/native';

const SelectAgreementScreen: React.FC<{ onContinue: () => void }> = ({
  onContinue,
}) => {
  const { colors } = useTheme();

  return (
    <Container background={colors.background}>
      <StyledText color={colors.text}>
        Select the type of agreement you want to create
      </StyledText>
      {/* Replace this with your custom picker */}
      <AgreementTypeText color={colors.text}>Agreement Type</AgreementTypeText>
      <AgreementTypePicker>
        <PickerText color={colors.text}>
          Collaborative Research Agreement
        </PickerText>
      </AgreementTypePicker>
      <OutlinedButton
        title='Continue'
        onPress={onContinue}
      />
    </Container>
  );
};

export default SelectAgreementScreen;

const Container = styled.View<{ background: string }>`
  top: 100px;
  padding: 20px;
  border: 2px solid;
  border-radius: 20px;
  background-color: '#FFFFFF';
  width: 100%;
  border-image-source: linear-gradient(90deg, #19b1d2 0%, #0094ff 100%);
`;
// background-color: ${(props) => props.background};

const AgreementTypePicker = styled.View`
  border: 1px solid #ddd;
  padding: 10px;
  margin-bottom: 20px;
`;

const PickerText = styled.Text<{ color: string }>`
  color: ${(props) => props.color};
  font-size: 16px;
`;

const StyledText = styled.Text<{ color: string }>`
  color: ${(props) => props.color};
  font-size: 24px;
`;

const AgreementTypeText = styled.Text<{ color: string }>`
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${(props) => props.color};
  font-size: 20px;
`;
