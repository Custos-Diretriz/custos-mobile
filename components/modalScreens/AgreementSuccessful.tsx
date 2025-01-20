import React from "react";
import styled from "styled-components/native";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";
import { View, Text, Modal } from "react-native";
import { useTheme } from "@react-navigation/native";
import Done from "@/assets/svgs/done.svg";
import { LinearGradient } from "expo-linear-gradient";

export type AgreementSuccessfulProp = {
  isVisible: boolean;
  onClose: () => void;
};

const AgreementSuccessful: React.FC<AgreementSuccessfulProp> = ({
  isVisible,
  onClose,
}) => {
  const { colors } = useTheme();
  return (
    <Modal
      visible={isVisible}
      onRequestClose={onClose}
      animationType="slide"
      transparent={true}
    >
      <BlurredBackground intensity={50} tint="dark">
        <LinearGradientWrapper
          colors={["#19b1d2", "#0094ff"]}
          style={{ borderRadius: 20, padding: 2 }}
        >
          <ModalContainer>
            <Title color={colors.text}>Agreement Creation Successful</Title>
            <CloseButton onPress={onClose}>
              <Ionicons name="close" size={24} color="white" />
            </CloseButton>

            <SuccessIconContainer>
              <Done />
            </SuccessIconContainer>
          </ModalContainer>
        </LinearGradientWrapper>
      </BlurredBackground>
    </Modal>
  );
};

export default AgreementSuccessful;

const StyledModal = styled(Modal)`
  justify-content: center;
  align-items: center;
  margin: 0;
`;

const LinearGradientWrapper = styled(LinearGradient).attrs({
  start: { x: 0, y: 0 },
  end: { x: 1, y: 0 },
})`
  border-radius: 20px;
  overflow: hidden;
  height: auto;
`;

export const BlurredBackground = styled(BlurView)`
  flex: 1;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const ModalContainer = styled(View)`
  width: 80%;
  height: 320px;
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 20px;
  padding: 20px;
  align-items: center;
`;

export const CloseButton = styled.TouchableOpacity`
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 1;
`;

const Title = styled(Text)<{ color: string }>`
  position: absolute;
  font-size: 18px;
  color: ${(props) => props.color};
  margin-bottom: 20px;
  left: 20px;
  top: 20px;
`;

const SuccessIconContainer = styled(View)`
  margin-top: 50px;
`;

const SuccessIcon = styled(Ionicons)``;
