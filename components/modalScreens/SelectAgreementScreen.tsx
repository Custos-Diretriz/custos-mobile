import React, {useState} from 'react';
import styled from 'styled-components/native';
import {useTheme} from '@react-navigation/native';
import {LinearGradient} from 'expo-linear-gradient';
import DropDownPicker from 'react-native-dropdown-picker';
import {ThemedText} from "@/components/ThemedText";
import {ThemedView} from "@/components/ThemedView";
import {StyleSheet} from "react-native";
import TransparentButton from "@/components/Buttons/TransparentButton";
import GradientButton from "@/components/Buttons/GradientButton";
import {Colors} from "@/constants/Colors";
import {childrenStyles} from "@/styles/agreementStyle";

const SelectAgreementScreen: React.FC<{ onContinue: () => void }> = (
  {
    onContinue,
  }) => {
  const {colors} = useTheme();

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Loan', value: 'loan'},
    {label: 'Mortgage', value: 'mortgage'},
  ]);

  return (
    <LinearGradient
      colors={['#19b1d2', '#0094ff']}
      style={{
        position: 'relative',
        width: '96%',
        borderRadius: 20,
        padding: 2
      }} // Padding to create space for the border
    >
      <ThemedView style={childrenStyles.agreementContainer}>
        <ThemedView style={childrenStyles.agreementInnerContainer}>
          {/*<OuterContainer>*/}
          {/*<Container background={colors.background}>*/}
          {/*<StyledText color={colors.text}>*/}
          {/*  Select the type of agreement you want to create*/}
          {/*</StyledText>*/}
          <ThemedText type={"subtitle"}>
            Select the type of agreement you want to create
          </ThemedText>
          {/* Replace this with your custom picker */}
          {/*<AgreementTypeText color={colors.text}>
                Agreement Type
              </AgreementTypeText>*/}

          <ThemedView>
            <ThemedText type={"defaultSemiBold"}>
              Agreement Type
            </ThemedText>
            <DropDownPickerWrapper
              colors={['#19B1D2', '#0094FF']}
              style={{borderRadius: 10, padding: 2}}
            >
              <DropDownPicker
                placeholder='Collaborative Research Agreement'
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                style={{backgroundColor: colors.background}}
                dropDownContainerStyle={{backgroundColor: colors.background}}
                placeholderStyle={{
                  color: `${colors.text}`,
                  fontSize: 16,
                }}
                arrowIconStyle={{tintColor: 'white'}}
              />
            </DropDownPickerWrapper>
          </ThemedView>

          <ThemedView style={childrenStyles.buttonContainer}>
            {/*<CancelButton
                  onPress={onContinue}
                  title='Cancel'
                />*/}
            <TransparentButton text={"Cancel"} onPress={onContinue}>
              <ThemedText>Cancel</ThemedText>
            </TransparentButton>
            {/*<ContinueButton
                  onPress={onContinue}
                  title='Continue'
                />*/}
            <GradientButton text={"Continue"} onPress={onContinue}>
              <ThemedText type={"defaultSemiBold"} style={{color: Colors.dark.text}}>Continue</ThemedText>
            </GradientButton>
          </ThemedView>
          {/*</Container>*/}
          {/*</OuterContainer>*/}
        </ThemedView>
      </ThemedView>
    </LinearGradient>
  );
};

export default SelectAgreementScreen;

const styles = StyleSheet.create({
  selectAgreementContainer: {
    position: 'relative',
    width: '100%',
    padding: 16,
    borderRadius: 20
  },
  selectAgreementInnerContainer: {
    flexDirection: 'column',
    gap: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    gap: 30,
  }
})

const OuterContainer = styled.View`
    margin-top: 100px;
    width: 170px;
    //height: 286px;
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
  start: {x: 0, y: 0},
  end: {x: 1, y: 0},
})`
    height: 54px;
    border-radius: 10px;
    overflow: hidden;
    margin-bottom: 20px;
`;

const StyledText = styled.Text<{ color: string }>`
    color: ${(props) => props.color};
    font-size: 26px;
    line-height: 35px;
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
