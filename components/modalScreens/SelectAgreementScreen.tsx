import React, { useState } from "react";
import styled from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import DropDownPicker from "react-native-dropdown-picker";
import { useTheme } from "@react-navigation/native";
import CancelButton from "../CancelButton";
import ContinueButton from "../ContinueButton";

interface SelectAgreementScreenProps {
  onContinue: () => void;
}

const SelectAgreementScreen: React.FC<SelectAgreementScreenProps> = ({
  onContinue,
}) => {
  const { colors } = useTheme();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Loan", value: "loan" },
    { label: "Mortgage", value: "mortgage" },
  ]);

  return (
    <OuterContainer>
      <GradientBorder
        colors={["#19B1D2", "#0094FF"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <StyledBlurView intensity={20}>
          <BackgroundGradient
            colors={["#04080C", "#09131A"]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
          >
            <HeaderText>
              Select the type of agreement you want to create
            </HeaderText>

            <AgreementTypeText>Agreement Type</AgreementTypeText>

            <DropdownWrapper
              colors={["#19B1D2", "#0094FF"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <DropdownInner>
                <DropDownPicker
                  placeholder="Collaborative Research Agreement"
                  open={open}
                  value={value}
                  items={items}
                  setOpen={setOpen}
                  setValue={setValue}
                  setItems={setItems}
                  style={dropdownStyles.dropdown}
                  dropDownContainerStyle={dropdownStyles.dropdownContainer}
                  placeholderStyle={dropdownStyles.dropdownPlaceholder}
                  arrowIconStyle={{ tintColor: "white" }}
                />
              </DropdownInner>
            </DropdownWrapper>

            <ButtonContainer>
              <CancelButton onPress={onContinue} title="Cancel" />
              <ContinueButton onPress={onContinue} title="Continue" />
            </ButtonContainer>
          </BackgroundGradient>
        </StyledBlurView>
      </GradientBorder>
    </OuterContainer>
  );
};

const OuterContainer = styled.View`
  margin-top: 100px;
  width: 100%;
  height: 286px;
  align-items: center;
  justify-content: center;
`;

const GradientBorder = styled(LinearGradient)`
  width: 100%;
  height: 100%;
  padding: 0.2px;
  border-radius: 20px;
`;

const StyledBlurView = styled(BlurView)`
  flex: 1;
  border-radius: 20px;
  overflow: hidden;
`;

const BackgroundGradient = styled(LinearGradient)`
  flex: 1;
  border-radius: 20px;
  padding: 20px;
  background-color: transparent;
`;

const HeaderText = styled.Text`
  color: #ffffff;
  font-size: 16px;
  line-height: 20px;
  height: 85px;
  font-weight: 400;
`;

const AgreementTypeText = styled.Text`
  margin-bottom: 10px;
  color: #ffffff;
  font-size: 20px;
`;

const DropdownWrapper = styled(LinearGradient)`
  height: 54px;
  border-radius: 10px;
  padding: 1px;
  margin-bottom: 20px;
`;

const DropdownInner = styled.View`
  flex: 1;
  border-radius: 9px;
  overflow: hidden;
  background-color: #04080c;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 5px;
  width: 100%;
  gap: 30px;
`;

// DropDownPicker styles
const dropdownStyles = {
  dropdown: {
    backgroundColor: "transparent",
    borderWidth: 0,
    height: 52,
  },
  dropdownContainer: {
    backgroundColor: "#04080C",
    borderWidth: 0,
  },
  dropdownPlaceholder: {
    color: "#FFFFFF",
    fontSize: 16,
  },
};

export default SelectAgreementScreen;
