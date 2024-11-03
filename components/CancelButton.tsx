import React from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity, Text } from 'react-native';

export type CancelButtonProp = {
  title: string;
  onPress: () => void;
};

const CancelButton: React.FC<CancelButtonProp> = ({ onPress, title }) => {
  return (
    <ButtonContainer onPress={onPress}>
      <ButtonText>{title}</ButtonText>
    </ButtonContainer>
  );
};

const ButtonContainer = styled(TouchableOpacity)`  
  width: 100%;  
  height: 50px;  
  border-radius: 32px;  
  border: 0.5px solid #9b9292;
  background-color: #274962; 
  align-items: center;  
  justify-content: center;  
  shadow-color: #848181;  
  shadow-offset: 0px 0px;  
  shadow-opacity: 0.21;  
  shadow-radius: 6.0;  
  elevation: 3; 
`;

const ButtonText = styled(Text)`
  color: #9b9292;
`;

export default CancelButton;
