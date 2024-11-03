import React from 'react';
import { useTheme } from '@react-navigation/native';
import styled from 'styled-components/native';
import { Button } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { TouchableOpacity } from 'react-native';

export type ButtonProps = {
  onPress: () => void;
  title: string;
};

const OutlinedButton: React.FC<ButtonProps> = ({ onPress, title }) => {
  const { colors } = useTheme();

  return (
    <LinearGradientCont
      colors={['#00f', '#f0f']}
      style={{
        borderWidth: 1,
        borderColor: 'transparent',
        overflow: 'hidden',
        paddingVertical: 0,
      }}
    >
      <ButtonContainer>
        <ButtonContained
          mode='contained'
          onPress={onPress}
          labelStyle={{ color: `${colors.text}` }}
          contentStyle={{
            width: '100%',
            height: '100%',
            justifyContent: 'center',
          }}
          style={{
            borderRadius: 32,
            paddingVertical: 6,
            paddingHorizontal: 18,
          }}
        >
          {title}
        </ButtonContained>
      </ButtonContainer>
    </LinearGradientCont>
  );
};

export default OutlinedButton;

const ButtonContainer = styled(TouchableOpacity)`
  width: 100%;
  height: 100%;
  border-radius: 32px;
  align-items: center;
  justify-content: center;
`;

const ButtonContained = styled(Button)`
  width: 100%;
  height: 100%;
  border-radius: 50px;
`;

const LinearGradientCont = styled(LinearGradient).attrs({
  start: { x: 0, y: 0 },
  end: { x: 1, y: 1 },
})`
  width: 100%;
  height: 50px;
  border-radius: 32px;
`;
