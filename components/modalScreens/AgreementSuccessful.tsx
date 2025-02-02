import React from "react";
import styled from "styled-components/native";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";
import { View, Text, Modal, TouchableOpacity } from "react-native";
import Done from "@/assets/svgs/done.svg";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";

export type AgreementSuccessfulProp = {
  isVisible: boolean;
  onClose: () => void;
};

const AgreementSuccessful: React.FC<AgreementSuccessfulProp> = ({
  isVisible,
  onClose,
}) => {
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
          style={{ borderRadius: 20, padding: 2, borderWidth: 0.15 }}
        >
          <ModalContainer>
            <View style={{
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between"
            }}>
              <MaskedView maskElement={<TitleText>Agreement Creation Successful</TitleText>}>
                <GradientTitle colors={["#EAF9FF", "#8E9A9A"]}>
                  <TitleText style={{ opacity: 0 }}>Agreement Creation Successful</TitleText>
                </GradientTitle>
              </MaskedView>

              <TouchableOpacity onPress={onClose}>
                <Ionicons name="close" size={24} color="white" />
              </TouchableOpacity>

            </View>
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

// Styled Components
const LinearGradientWrapper = styled(LinearGradient).attrs({
  start: { x: 0, y: 0 },
  end: { x: 1, y: 0 },
})`
  border-radius: 20px;
  overflow: hidden;
  height: auto;
  padding:1px
`;

export const BlurredBackground = styled(BlurView)`
  flex: 1;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const ModalContainer = styled(View)`
  width: 90%;
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

const MaskedTitle = styled(MaskedView)`
  align-self: center;
`;

const GradientTitle = styled(LinearGradient).attrs({
  start: { x: 0, y: 0 },
  end: { x: 1, y: 0 },
})`
  padding: 0px;
`;

const TitleText = styled(Text)`
  font-size: 16px;
  font-weight: bold;
  text-align:left;
  color: black;
`;
const SuccessIconContainer = styled(View)`
  margin-top: 50px;
`;
