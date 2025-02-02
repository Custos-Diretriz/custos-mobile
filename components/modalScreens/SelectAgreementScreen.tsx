import React, { useState } from 'react';
import styled from 'styled-components/native';
import { useTheme } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import DropDownPicker from 'react-native-dropdown-picker';
import CancelButton from '../CancelButton';
import ContinueButton from '../ContinueButton';
import { Text, TouchableOpacity, View } from 'react-native';
import GradientDropdown from '../dropdown/CustomDropDown';
import { BlurView } from 'expo-blur';



interface SelectAgreementScreenProps {
  onContinue: () => void;
  onCancel: () => void;
}

const SelectAgreementScreen: React.FC<SelectAgreementScreenProps> = ({
  onContinue,
  onCancel
}) => {
  const { colors } = useTheme();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Loan", value: "loan" },
    { label: "Mortgage", value: "mortgage" },
  ]);
  const handleSelect = (value: string) => {
    console.log("Selected:", value);
  };

  return (
    <>

      <View style={{
        width: "100%",
        padding: 16,
        borderRadius: 16,
        backgroundColor: "#09131A"
      }} >
        <View style={{
          width: "100%"
        }}>
          <Text style={{
            color: "#EAFBFF",
            fontSize: 16,
            fontFamily: "Outfit-Regular"
          }} >Select the type of agreement you{"\n"}want to create</Text>
        </View>
        <View>
          <View style={{
            width: "100%",
            marginTop: 24
          }} >
            <Text style={{
              width: "100%",
              color: "#EAFBFF",
              fontSize: 14,
              fontFamily: "Outfit-Regular"
            }} >Agreement Type</Text>
          </View>
          <View style={{
            width: "100%",
            marginBottom: 20,
            marginTop: 8
          }}>
            <GradientDropdown

              placeholder='Collaborative Research Agreement'
              items={[
                { label: "Loan", value: "loan" },
                { label: "Mortgage", value: "mortgage" },
                { label: "Insurance", value: "insurance" },
              ]}
              onSelect={handleSelect}
            />
          </View>
          <View style={{
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 16,
            gap: 33,
          }} >
            <TouchableOpacity onPress={onCancel} style={{
              width: "45%",
              backgroundColor: "#2D485C",
              paddingVertical: 16,
              borderRadius: 32,
              borderWidth: 1,
              borderColor: "#9B9292"
            }}>
              <Text style={{
                textAlign: "center",
                color: "#9B9292",
                fontSize: 14,
              }}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onContinue} style={{
              width: "45%",
              backgroundColor: "#0094FF",
              paddingVertical: 16,
              borderRadius: 32,
              borderWidth: 1,
              borderColor: "#A02294"
            }}>
              <Text style={{
                textAlign: "center",
                color: "#FFFF",
                fontSize: 14,
              }}>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

    </>
  );
};

const OuterContainer = styled.View`
  margin-top: 100px;
  width: 50%;
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

const DropDownPickerWrapper = styled(LinearGradient).attrs({
  start: { x: 0, y: 0 },
  end: { x: 1, y: 0 },
})`
  height: 54px;
  border-radius: 10px;
  overflow: hidden;
  margin-top:8px;
  margin-bottom: 20px;
`;

const StyledText = styled.Text<{ color: string }>`
  color: ${(props) => props.color};
  font-size: 16px;
  line-height: 20.16px;
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
