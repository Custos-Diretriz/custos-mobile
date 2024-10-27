import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import styled from 'styled-components/native';
import { useTheme } from '@react-navigation/native';
import MenuButton from '@/assets/svgs/menuOutline.svg';

export default function Nav() {
  const { colors } = useTheme();

  return (
    <Container backgroundColor={colors.background}>
      <StyledView backgroundColor={colors.background}>
        <TouchableOpacity>
          <Image source={require('../assets/images/custosLogo.png')} />
        </TouchableOpacity>
        <TouchableOpacity>
          <MenuButton />
        </TouchableOpacity>
      </StyledView>
    </Container>
  );
}

const Container = styled.View<{ backgroundColor: string }>`
  flex: 1;
  background-color: ${(props) => props.backgroundColor};
`;

const StyledView = styled.View<{ backgroundColor: string }>`
  flex: 1;
  background-color: ${(props) => props.backgroundColor};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const StyledText = styled.Text<{ color: string }>`
  color: ${(props) => props.color};
  font-size: 16px;
`;
