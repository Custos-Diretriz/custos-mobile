import React, { useState } from 'react';
import styled from 'styled-components/native';
import { useTheme } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import DropDownPicker from 'react-native-dropdown-picker';
import CancelButton from '../CancelButton';
import ContinueButton from '../ContinueButton';
import { TextInput } from 'react-native-paper';
import { TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native';

const SelectAgreementScreen: React.FC<{ onContinue: () => void, onCancel: () => void }> = ({
  onContinue,
  onCancel
}) => {
  const { colors } = useTheme();

  return (
    <>
      <View style={{
        width: "100%",
        padding: 16,
        borderRadius: 16,
        backgroundColor: "#09131A"
      }} >
        <View>
          <View style={{
            width: "100%"
          }} >
            <Text
              style={{
                width: "100%",
                color: "#EAFBFF",
                fontSize: 20,
                fontFamily: "Outfit-Regular"
              }} >Agreement Content</Text>
          </View>

          <View style={{
            width: "100%",
            marginTop: 24
          }}>
            <Text style={{
              width: "100%",
              color: "#EAFBFF",
              fontSize: 16,
              fontFamily: "Outfit-Regular"
            }}>Agreement Title</Text>
            <LinearGradient
              colors={["#19B1D2", "#0094FF"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{
                borderRadius: 10,
                borderWidth: 1,
                padding: 2,
                marginTop: 8
              }}
            >
              <TextInput style={{
                backgroundColor: "#09131A",
                borderWidth: 0,
                fontSize: 14,
              }} placeholder='Enter the title of your agreement here' placeholderTextColor={"#EAF9FF"} />
            </LinearGradient>
          </View>

          <View style={{
            width: "100%",
            marginTop: 16
          }}>
            <Text style={{
              width: "100%",
              color: "#EAFBFF",
              fontSize: 16,
              fontFamily: "Outfit-Regular"
            }}>Agreement Content</Text>
            <LinearGradient
              colors={["#BEBDBD", "#858585"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{
                borderRadius: 10,
                borderWidth: .3,
                padding: 2,
                marginTop: 8
              }}
            >
              <TextInput style={{
                backgroundColor: "#09131A",
                height: 161,
                width: "100%",
                lineHeight: 17.64,
                textAlign: "left",
                borderWidth: 0,
                fontSize: 14,
              }} placeholder={"Write or paste the content of your\nagreement here"} placeholderTextColor={"#EAF9FF"} />
            </LinearGradient>
          </View>
          <View style={{
            width: "100%",
            marginBottom: 16,
            marginTop: 32
          }}>

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
      </View>
    </>
  );
};

export default SelectAgreementScreen;

// Outer container to ensure correct border appearance
const OuterContainer = styled.View`
  margin-top: 70px;
  width: 170px;
  height: 501.5px;
  align-items: center;
  justify-content: center;
`;

// This container is for the content only
const Container = styled.View<{ background: string }>`
  background-color: ${(props) => props.background};
  border-radius: 20px;
  padding: 20px;
  width: 100%;
`;

const InputWrapper = styled(LinearGradient).attrs({
  start: { x: 0, y: 0 },
  end: { x: 1, y: 0 },
})`
  border-radius: 5px;
  overflow: hidden;
  height: 60px;
`;

const GradientWrapper = styled(LinearGradient).attrs({
  start: { x: 0, y: 0 },
  end: { x: 1, y: 0 },
})`
  border-radius: 5px;
  overflow: hidden;
  margin-bottom: 20px;
  height: 150px;
`;

const StyledText = styled.Text<{ color: string }>`
  color: ${(props) => props.color};
  font-size: 26px;
  line-height: 35px;
`;

const AgreementTypeText = styled.Text<{ color: string }>`
  margin-top: 20px;
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

const InputTitle = styled.Text<{ color: string }>`
  color: ${(props) => props.color};
  font-size: 18px;
  margin-top: 20px;
  margin-bottom: 10px;
`;
