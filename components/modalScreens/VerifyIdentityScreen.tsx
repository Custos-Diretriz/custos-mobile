import React, {useState} from 'react';
import styled from 'styled-components/native';
import {useTheme} from '@react-navigation/native';
import {LinearGradient} from 'expo-linear-gradient';
import DropDownPicker from 'react-native-dropdown-picker';
import {TextInput} from 'react-native-paper';
import {ThemedView} from "@/components/ThemedView";
import {ThemedText} from "@/components/ThemedText";
import {Colors} from "@/constants/Colors";
import TransparentButton from "@/components/Buttons/TransparentButton";
import GradientButton from "@/components/Buttons/GradientButton";
import {useColorScheme} from "react-native";
import {childrenStyles} from "@/styles/agreementStyle";

const SelectAgreementScreen: React.FC<{ onContinue: () => void }> = (
  {
    onContinue,
  }) => {
  const {colors} = useTheme();
  const colorScheme = useColorScheme();
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
          <ThemedText type={"subtitle"}>
            Verify your Identity
          </ThemedText>

          <ThemedView>
            <ThemedText type={"defaultSemiBold"}>
              Agreement Type
            </ThemedText>
            <DropdownWrapper
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
                zIndex={10}
                style={{backgroundColor: colors.background}}
                dropDownContainerStyle={{backgroundColor: colors.background}}
                placeholderStyle={{
                  color: `${colors.text}`,
                  fontSize: 16,
                }}
                arrowIconStyle={{tintColor: 'white'}}
              />
            </DropdownWrapper>
          </ThemedView>

          <ThemedView>
            <ThemedText type={"defaultSemiBold"}>
              Identity Type
            </ThemedText>
            <DropdownWrapper
              colors={['#19B1D2', '#0094FF']}
              style={{borderRadius: 10, padding: 2}}
            >
              <DropDownPicker
                placeholder='Select ID Type'
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                zIndex={10}
                style={{backgroundColor: colors.background}}
                dropDownContainerStyle={{backgroundColor: colors.background}}
                placeholderStyle={{
                  color: `${colors.text}`,
                  fontSize: 16,
                }}
                arrowIconStyle={{tintColor: 'white'}}
              />
            </DropdownWrapper>
          </ThemedView>

          <ThemedView>
            <ThemedText type={"defaultSemiBold"}>
              Agreement Type
            </ThemedText>
            <InputWrapper
              colors={['#19B1D2', '#0094FF']}
              style={{borderRadius: 10, padding: 2}}
            >
              <TextInput
                mode='outlined'
                placeholder='Enter your ID number'
                right={<TextInput.Affix text='/100'/>}
                placeholderTextColor={Colors[colorScheme ?? "light"].text}
                textColor={Colors[colorScheme ?? "light"].text}
              />
            </InputWrapper>
          </ThemedView>

          <ThemedView style={childrenStyles.buttonContainer}>
            <TransparentButton text={"Cancel"} onPress={onContinue}>
              <ThemedText>Cancel</ThemedText>
            </TransparentButton>

            <GradientButton text={"Continue"} onPress={onContinue}>
              <ThemedText type={"defaultSemiBold"} style={{color: Colors.dark.text}}>Continue</ThemedText>
            </GradientButton>
          </ThemedView>
        </ThemedView>
      </ThemedView>

      {/*<LinearGradient
          colors={['#19b1d2', '#0094ff']}
          style={{ flex: 1, borderRadius: 20, padding: 2 }} // Padding to create space for the border
        >
          <Container background={colors.background}>
            <StyledText color={colors.text}>Verify Your Identity</StyledText>
            <AgreementTypeText color={colors.text}>
              Agreement Type
            </AgreementTypeText>
            <DropdownWrapper
              colors={['#19B1D2', '#0094FF']}
              style={{ borderRadius: 10, padding: 2 }}
            >
              <DropDownPicker
                placeholder='Collaborative Research Agreement'
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                zIndex={10}
                style={{ backgroundColor: colors.background }}
                dropDownContainerStyle={{ backgroundColor: colors.background }}
                placeholderStyle={{
                  color: `${colors.text}`,
                  fontSize: 16,
                }}
                arrowIconStyle={{ tintColor: 'white' }}
              />
            </DropdownWrapper>
            <InputTitle color={colors.text}>Identity Type</InputTitle>
            <DropdownWrapper
              colors={['#19B1D2', '#0094FF']}
              style={{ borderRadius: 10, padding: 2 }}
            >
              <DropDownPicker
                placeholder='Select ID Type'
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                zIndex={10}
                style={{ backgroundColor: colors.background }}
                dropDownContainerStyle={{ backgroundColor: colors.background }}
                placeholderStyle={{
                  color: `${colors.text}`,
                  fontSize: 16,
                }}
                arrowIconStyle={{ tintColor: 'white' }}
              />
            </DropdownWrapper>

            <InputTitle color={colors.text}>Identity Number</InputTitle>
            <InputWrapper
              colors={['#19B1D2', '#0094FF']}
              style={{ borderRadius: 10, padding: 2 }}
            >
              <TextInput
                mode='outlined'
                placeholder='Enter Your ID Number'
                right={<TextInput.Affix text='/100' />}
              />
            </InputWrapper>

            <ButtonsContainer>
              <CancelButton
                onPress={onContinue}
                title='Cancel'
              />
              <ContinueButton
                onPress={onContinue}
                title='Continue'
              />
            </ButtonsContainer>
          </Container>
        </LinearGradient>*/}
    </LinearGradient>
  );
};

export default SelectAgreementScreen;

// Outer container to ensure correct border appearance
const OuterContainer = styled.View`
    margin-top: 70px;
    width: 170px;
    height: 485px;
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

const DropdownWrapper = styled(LinearGradient).attrs({
  start: {x: 0, y: 0},
  end: {x: 1, y: 0},
})`
    border-radius: 8px;
    overflow: hidden;
    height: 54px;
`;

const GradientWrapper = styled(LinearGradient).attrs({
  start: {x: 0, y: 0},
  end: {x: 1, y: 0},
})`
    border-radius: 5px;
    overflow: hidden;
    margin-bottom: 20px;
    height: 150px;
`;

const InputWrapper = styled(LinearGradient).attrs({
  start: {x: 0, y: 0},
  end: {x: 1, y: 0},
})`
    border-radius: 5px;
    overflow: hidden;
    height: 60px;
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
    margin-top: 20px;
    width: 100%;
    gap: 30px;
`;

const Input = styled.TextInput`
    border: 1px solid #ddd;
    padding: 10px;
    margin-bottom: 20px;
`;

const ContentInput = styled.TextInput`
    border: 1px solid #ddd;
    padding: 10px;
    height: 100px;
    margin-bottom: 20px;
`;

const InputTitle = styled.Text<{ color: string }>`
    color: ${(props) => props.color};
    font-size: 18px;
    margin-top: 20px;
    margin-bottom: 10px;
`;
