import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styled from 'styled-components/native';
import CloseIcon from '@/assets/svgs/closeIcon.svg';
import OutlinedButton from './ContinueButton';
import GradientButton from './GradientButton';

type SidebarProps = {
    onClose: () => void;
    connectWallet: () => void;
};

 const handleConnect = async () => {
   
 };

const Sidebar: React.FC<SidebarProps> = ({ onClose, connectWallet }) => {
  return (
    <Container>
      <Overlay onPress={onClose} />
      <SidebarContainer>
        <CloseButton onPress={onClose}>
          <CloseIcon />
        </CloseButton>
        <SidebarItem>Home</SidebarItem>
        <SidebarItem>Company</SidebarItem>
        <SidebarItem>Agreement +</SidebarItem>
        <SidebarItem>Videos 🎥</SidebarItem>
        <ConnectButton>
          <GradientButton
            onPress={handleConnect}
            width={248}
          />
        </ConnectButton>
      </SidebarContainer>
    </Container>
  );
};

export default Sidebar;

const Container = styled.SafeAreaView`
  position: absolute;
  top: 50px;
  left: 0;
  width: 90%;
  height: 100%;
  z-index: 10;
  flex-direction: row;
`;

const Overlay = styled.TouchableOpacity`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
`;

const SidebarContainer = styled.View`
  position: relative;
  width: 110%;
  height: 100%;
  background-color: #222;
  padding: 20px;
  z-index: 11;
  justify-content: center;
`;

const CloseButton = styled(TouchableOpacity)`
  align-self: flex-end;
`;

const SidebarItem = styled.Text`
  color: #fff;
  font-size: 18px;
  margin-vertical: 15px;
`;

const ConnectButton = styled(TouchableOpacity)`
  margin-top: auto;
  padding: 10px;
  background-color: #1e1e1e;
  border-radius: 8px;
  align-items: center;
`;

const ButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
`;
