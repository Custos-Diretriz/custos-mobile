import React from 'react';
import { View, TextInput, Text } from 'react-native';
import styled from 'styled-components/native';
import OutlinedButton from '@/components/OutlinedButton';

const SecondPartyWalletScreen: React.FC<{ onContinue: () => void }> = ({
  onContinue,
}) => {
  return (
    <Container>
      <Text>Second Party's Name</Text>
      <Input placeholder="Enter the second party's name" />
      <Text>Second Party's Wallet Address</Text>
      <Input placeholder='Enter valid wallet address' />
      <OutlinedButton
        title='Create Agreement'
        onPress={onContinue}
      />
    </Container>
  );
};

export default SecondPartyWalletScreen;

const Container = styled.View`
  padding: 20px;
`;

const Input = styled.TextInput`
  border: 1px solid #ddd;
  padding: 10px;
  margin-bottom: 20px;
`;
