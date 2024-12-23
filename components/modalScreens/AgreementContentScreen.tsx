import React from 'react';
import styled from 'styled-components/native';
import {LinearGradient} from 'expo-linear-gradient';
import {TextInput} from 'react-native-paper';
import {ThemedView} from "@/components/ThemedView";
import {ThemedText} from "@/components/ThemedText";
import TransparentButton from "@/components/Buttons/TransparentButton";
import GradientButton from "@/components/Buttons/GradientButton";
import {Colors} from "@/constants/Colors";
import {useColorScheme} from "react-native";
import {childrenStyles} from "@/styles/agreementStyle";

const AgreementContentScreen: React.FC<{ onContinue: () => void }> = (
  {
    onContinue,
  }) => {
  const colorScheme = useColorScheme();

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
            Agreement Content
          </ThemedText>

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
                placeholder='Enter the title here'
                right={<TextInput.Affix text='/100'/>}
                placeholderTextColor={Colors[colorScheme ?? "light"].text}
                textColor={Colors[colorScheme ?? "light"].text}
              />
            </InputWrapper>
          </ThemedView>

          <ThemedView>
            <ThemedText type={"defaultSemiBold"}>
              Agreement Content
            </ThemedText>

            <GradientWrapper
              colors={['#BEBDBD', '#858585']}
              style={{borderRadius: 10, padding: 2}}
            >
              <TextInput
                mode='outlined'
                placeholder='Write or paste the content of your agreement here'
                right={<TextInput.Affix text='/100'/>}
                multiline
                placeholderTextColor={Colors[colorScheme ?? "light"].text}
                textColor={Colors[colorScheme ?? "light"].text}
                style={{height: 146}}
              />
            </GradientWrapper>
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

      {/*<Container background={colors.background}>
          <StyledText color={colors.text}>Agreement Content</StyledText>
          <AgreementTypeText color={colors.text}>
            Agreement Title
          </AgreementTypeText>
          <InputWrapper
            colors={['#19B1D2', '#0094FF']}
            style={{ borderRadius: 10, padding: 2 }}
          >
            <TextInput
              mode='outlined'
              placeholder='Enter the title here'
              right={<TextInput.Affix text='/100' />}
            />
          </InputWrapper>
          <InputTitle color={colors.text}>Agreement Content</InputTitle>
          <GradientWrapper
            colors={['#BEBDBD', '#858585']}
            style={{ borderRadius: 10, padding: 2 }}
          >
            <TextInput
              mode='outlined'
              placeholder='Write or paste the content of your agreement here'
              right={<TextInput.Affix text='/100' />}
              multiline
              style={{ height: 146 }}
            />
          </GradientWrapper>

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
        </Container>*/}
    </LinearGradient>
  );
};

export default AgreementContentScreen;

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
  start: {x: 0, y: 0},
  end: {x: 1, y: 0},
})`
    border-radius: 5px;
    overflow: hidden;
    height: 60px;
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
