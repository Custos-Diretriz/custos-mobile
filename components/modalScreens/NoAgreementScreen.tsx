// NoAgreementScreen.tsx
import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components/native';
import OutlinedButton from '@/components/OutlinedButton';
import NoAgreement from '@/assets/svgs/noAgreement.svg';
import { useTheme } from '@react-navigation/native';

const NoAgreementScreen: React.FC<{ onContinue: () => void }> = ({
  onContinue,
}) => {
  const { colors } = useTheme();

  return (
    <>
      <NoAgreement />
      <NoAgreementText color={colors.text}>
        You have not created any agreement yet. You can start creating one from
        here.
      </NoAgreementText>
      <OutlinedButton
        title='Create New Agreement'
        onPress={onContinue}
      />
    </>
  );
};

export default NoAgreementScreen;



const NoAgreementText = styled.Text<{ color: string }>`
  color: ${(props) => props.color};
  font-size: 14px;
  text-align: center;
  width: 300px;
  margin-bottom: 30px;
`;
