import React, { useState } from 'react';
import styled from 'styled-components/native';
import { useTheme } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import DropDownPicker from 'react-native-dropdown-picker';
import CancelButton from '../CancelButton';
import ContinueButton from '../ContinueButton';
import { Text, TouchableOpacity, View } from 'react-native';
import GradientDropdown from '../dropdown/CustomDropDown';

const SelectAgreementScreen: React.FC<{ onContinue: () => void ,onCancel:()=>void}> = ({
  onContinue,
  onCancel
}) => {
  const [items, setItems] = useState([
    { label: 'Loan', value: 'loan' },
    { label: 'Mortgage', value: 'mortgage' },
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

export default SelectAgreementScreen;

const OuterContainer = styled.View`
  margin-top: 100px;
  width: 50%;
  height: 286px;
  align-items: center;
  justify-content: center;
`;

const Container = styled.View<{ background: string }>`
  background-color: ${(props) => props.background};
  border-radius: 20px;
  padding: 20px;
  width: 100%;
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
`;

const AgreementTypeText = styled.Text<{ color: string }>`
  margin-bottom: 10px;
  color: ${(props) => props.color};
  font-size: 20px;
`;

const ButtonsContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 5px;
  width: 100%;
  gap: 30px;
`;
