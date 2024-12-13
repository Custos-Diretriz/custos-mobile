import { Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import styled from 'styled-components/native';
import { useTheme } from '@react-navigation/native';
import MenuButton from '@/assets/svgs/menuOutline.svg';

type NavProps = {
  toggleSidebar: () => void;
};
export default function Nav({ toggleSidebar }: NavProps) {
  const { colors } = useTheme();

  return (
    <Container backgroundColor={colors.background}>
      <StyledView backgroundColor={colors.background}>
        <TouchableOpacity>
          <Image source={require('../assets/images/custosLogo.png')} />
          <Text>Available</Text>
        </TouchableOpacity>
        <MenuButtonContainer onPress={toggleSidebar}>
          <MenuButton />
        </MenuButtonContainer>
      </StyledView>
    </Container>
  );
}

const Container = styled.View<{ backgroundColor: string }>`
  flex: 1;
  background-color: ${(props) => props.backgroundColor};
`;

const MenuButtonContainer = styled.TouchableOpacity`
  position: absolute;
  right: 0;
`;

const StyledView = styled.View<{ backgroundColor: string }>`
  flex: 1;
  background-color: ${(props) => props.backgroundColor};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
