import React, {ReactNode} from 'react';
import styled from 'styled-components/native';
import {ScrollView} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import Edit from '@/assets/svgs/edit.svg';
import {ThemedView} from "@/components/ThemedView";
import {ThemedText} from "@/components/ThemedText";
import {Colors} from "@/constants/Colors";
import TransparentButton from "@/components/Buttons/TransparentButton";
import OutlinedButton from "@/components/Buttons/OutlinedButton";
import {childrenStyles} from "@/styles/agreementStyle";

const GradientContainer = ({styles, children}: { styles?: any, children: ReactNode }) => {
  return (
    <LinearGradient
      colors={['#0094FF', '#A02294']}
      style={[{
        position: 'relative',
        width: '100%',
        borderRadius: 100,
        padding: 1,
        gap: 8,
        flexGrow: 1,
        flexShrink: 1,
      }, styles]} // Padding to create space for the border
    >{children}</LinearGradient>
  )
}

const PrintAgreementScreen: React.FC<{ onContinue: () => void }> = (
  {
    onContinue,
  }) => {
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
        <ThemedView style={[childrenStyles.agreementInnerContainer, {}]}>
          <ThemedView style={{gap: 16}}>
            <ThemedView style={{flexDirection: "row", justifyContent: "space-between", width: '100%'}}>
              <GradientContainer styles={{width: '70%'}}>
                <ThemedView
                  darkColor={Colors.dark.background}
                  lightColor={Colors.light.background}
                  style={{paddingHorizontal: 16, paddingVertical: 8, borderRadius: 100}}
                >
                  <ThemedText style={{color: "#19b1d2"}}>Non Disclosure Agreement</ThemedText>
                </ThemedView>
              </GradientContainer>
              <ThemedView style={{width: '30%', justifyContent: 'center', alignItems: 'flex-end'}}>
                <Edit/>
              </ThemedView>
            </ThemedView>

            <GradientContainer>
              <ThemedView
                darkColor={Colors.dark.background}
                lightColor={Colors.light.background}
                style={{paddingHorizontal: 16, paddingVertical: 8, borderRadius: 100}}
              >
                <ThemedText style={{fontSize: 14}}>Second Party Address: 0xder25xeffthbac57uh</ThemedText>
              </ThemedView>
            </GradientContainer>
            {/*<Header>
                <TitleContainer>
                  <GradientWrapper
                    colors={['#19b1d2', '#0094ff']}
                    style={{ borderRadius: 20, padding: 1 }}
                  >
                    <TitleWrapper background={colors.background}>
                      <Title>Non Disclosure Agreement</Title>
                    </TitleWrapper>
                  </GradientWrapper>

                  <IconContainer>
                    <Edit />
                  </IconContainer>
                </TitleContainer>
                <GradientWrapper
                  colors={['#19b1d2', '#0094ff']}
                  style={{ borderRadius: 20, padding: 1 }}
                >
                  <TitleWrapper background={colors.background}>
                    <Address>Second Party Address: 0xder25xeffthbac57uh</Address>
                  </TitleWrapper>
                </GradientWrapper>
              </Header>*/}
            <TimestampContainer>
              <TimestampLabel>Time Stamp:</TimestampLabel>
              <TimestampValue>
                Tuesday, 24th January 2024, 10:39:21 a.m.
              </TimestampValue>
            </TimestampContainer>
            <ScrollView>
              <AgreementText>
                This Non-Disclosure Agreement (hereinafter the "Agreement") is
                made and entered into on 2024-06-01 by and between Custos
                Diretiz...
              </AgreementText>
            </ScrollView>
          </ThemedView>

          <ThemedView style={[childrenStyles.buttonContainer, {flexDirection: 'column', minWidth: '100%'}]}>
            <OutlinedButton text={"Print Agreement"} onPress={onContinue} icon={""} customStyles={{width: '100%'}}/>

            <TransparentButton text={"Validate Agreement"} onPress={onContinue} customStyles={{width: '100%'}}>
              <ThemedText>Validate Agreement</ThemedText>
            </TransparentButton>
          </ThemedView>
        </ThemedView>
      </ThemedView>

      {/*<Container>
        <ContentContainer colors={['#19b1d2', '#0094ff']}>
          <ContentContainerWrapper background={colors.background}>
            <Header>
              <TitleContainer>
                <GradientWrapper
                  colors={['#19b1d2', '#0094ff']}
                  style={{ borderRadius: 20, padding: 1 }}
                >
                  <TitleWrapper background={colors.background}>
                    <Title>Non Disclosure Agreement</Title>
                  </TitleWrapper>
                </GradientWrapper>

                <IconContainer>
                  <Edit />
                </IconContainer>
              </TitleContainer>
              <GradientWrapper
                colors={['#19b1d2', '#0094ff']}
                style={{ borderRadius: 20, padding: 1 }}
              >
                <TitleWrapper background={colors.background}>
                  <Address>Second Party Address: 0xder25xeffthbac57uh</Address>
                </TitleWrapper>
              </GradientWrapper>
            </Header>
            <TimestampContainer>
              <TimestampLabel>Time Stamp:</TimestampLabel>
              <TimestampValue>
                Tuesday, 24th January 2024, 10:39:21 a.m.
              </TimestampValue>
            </TimestampContainer>
            <ScrollView>
              <AgreementText>
                This Non-Disclosure Agreement (hereinafter the "Agreement") is
                made and entered into on 2024-06-01 by and between Custos
                Diretiz...
              </AgreementText>
            </ScrollView>
          </ContentContainerWrapper>
        </ContentContainer>

        <ButtonContainer>
          <CancelButton
            onPress={onContinue}
            title='Print Agreement'
          />
          <ContinueButton
            onPress={onContinue}
            title='Validate Agreement'
          />
        </ButtonContainer>
      </Container>*/}
    </LinearGradient>
  );
};

export default PrintAgreementScreen;

const LinearGradientWrapper = styled(LinearGradient).attrs({
  start: {x: 0, y: 0},
  end: {x: 1, y: 0},
})`
    margin-top: 60px;
    border-radius: 20px;
    overflow: hidden;
    height: auto;
    padding: 1px
`;

const ContentContainer = styled(LinearGradient).attrs({
  start: {x: 0, y: 0},
  end: {x: 1, y: 0},
})`
    border-radius: 8px;
    overflow: hidden;
    height: auto;
    max-height: 250px;
    padding: 1px;
`;

const ContentContainerWrapper = styled.View<{ background: string }>`
    background-color: ${(props) => props.background};
    padding: 12px;
    border-radius: 8px;
`;

const GradientWrapper = styled(LinearGradient).attrs({
  start: {x: 0, y: 0},
  end: {x: 1, y: 0},
})`
    border-radius: 20px;
    overflow: hidden;
    height: auto;
`;

const Container = styled.View`
    padding: 20px;
    background-color: #121212;
    border-radius: 20px;
    height: auto;
`;

const Header = styled.View`
    margin-bottom: 16px;
`;

const TitleContainer = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    height: 33px;
    margin-top: 5px;
    margin-bottom: 15px;
`;

const TitleWrapper = styled.View<{ background: string }>`
    background-color: ${(props) => props.background};
    padding: 4px;
    border-radius: 32px;
`;

const Title = styled.Text`
    color: #19b1d2;
    padding: 8px 16px;
    font-weight: bold;
    height: 27px;
`;

const IconContainer = styled.View`
    background-color: #1f1f1f;
    padding: 4px;
    border-radius: 8px;
`;

const Address = styled.Text`
    color: #9b9292;
    font-size: 12px;
    padding: 8px 4px;
`;

const TimestampContainer = styled.View`
    margin-bottom: 15px;
`;

const TimestampLabel = styled.Text`
    color: #c1c1c1;
    font-size: 14px;
`;

const TimestampValue = styled.Text`
    color: #19b1d2;
    font-size: 14px;
    font-weight: 400;
    margin-top: 15px;
`;

const AgreementText = styled.Text`
    color: #c1c1c1;
    font-size: 13px;
    line-height: 20px
`;

const ButtonContainer = styled.View`
    flex-direction: column;
    justify-content: space-between;
    margin-top: 25px;
    gap: 25px;
`;

const ButtonText = styled.Text`
    color: #c1c1c1;
    font-size: 14px;
    font-weight: bold;
`;
