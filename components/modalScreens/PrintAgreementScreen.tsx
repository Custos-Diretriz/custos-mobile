import React from 'react';
import styled from 'styled-components/native';
import { Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Edit from '@/assets/svgs/edit.svg';

const PrintAgreementScreen: React.FC<{ onContinue: () => void }> = ({
  onContinue,
}) => {
  // const { colors } = useTheme();
  return (
    <LinearGradientWrapper colors={['#19b1d2', '#0094ff']}>
      <Container >
        <ContentContainer colors={['#19b1d2', '#0094ff']} >
          <ContentContainerWrapper background={"#050A0F"} >
            <Header>
              <TitleContainer>
                <GradientWrapper
                  colors={['#0094FF', '#A02294']}
                  style={{ borderRadius: 20, padding: 0.4 }}
                >
                  <TitleWrapper background={"#050A0F"} style={{
                    height: 40
                  }} >
                    <Title style={{
                      fontSize: 12
                    }} >Non Disclosure Agreement</Title>
                  </TitleWrapper>
                </GradientWrapper>

                <IconContainer>
                  <Edit />
                </IconContainer>
              </TitleContainer>
              <GradientWrapper
                colors={['#19b1d2', '#0094ff']}
                style={{ borderRadius: 20, padding: 1, marginTop: 12 }}
              >
                <TitleWrapper background={"#050A0F"}>
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
            <View style={{
              paddingBottom: 18,
              width: "100%"
            }} >
              <AgreementText>
                This Non-Disclosure Agreement (hereinafter the "Agreement") is
                made and entered into on 2024-06-01 by and between Custos
                Diretiz...
              </AgreementText>
            </View>
          </ContentContainerWrapper>
        </ContentContainer>

        <ButtonContainer>
          <LinearGradient start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }} colors={["#0094FF", "#A02294"]} style={{
              width: "100%",
              borderRadius: 30,
              padding: 2
            }} >
            <TouchableOpacity style={{
              backgroundColor: "#274962",
              borderWidth: 0,
              borderRadius: 30,
              paddingVertical: 16,
              alignItems: "center"
            }} >
              <Text style={{
                fontSize: 14,
                color: "#EAFBFF",
                fontFamily: "Outfit-Regular"
              }} >Print Agreement</Text>
            </TouchableOpacity>
          </LinearGradient>
          <LinearGradient start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }} colors={["#9B9292", "#9B9292"]} style={{
              width: "100%",
              borderRadius: 30,
              padding: 2,
              marginTop: 1
            }} >
            <TouchableOpacity onPress={onContinue} style={{
              backgroundColor: "#04080C",
              borderWidth: 0,
              borderRadius: 30,
              paddingVertical: 16,
              alignItems: "center"
            }} >
              <Text style={{
                fontSize: 14,
                color: "#EAFBFF",
                fontFamily: "Outfit-Regular"
              }} >Validate Agreement</Text>
            </TouchableOpacity>
          </LinearGradient>
        </ButtonContainer>
      </Container>
    </LinearGradientWrapper>
  );
};

export default PrintAgreementScreen;

const LinearGradientWrapper = styled(LinearGradient).attrs({
  start: { x: 0, y: 0 },
  end: { x: 1, y: 0 },
})`
  border-radius: 20px;
  width:361px;
  align-self:center;
  overflow: hidden;
  height: auto;
  padding: 1px
`;

const ContentContainer = styled(LinearGradient).attrs({
  start: { x: 0, y: 0 },
  end: { x: 1, y: 0 },
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
  start: { x: 0, y: 0 },
  end: { x: 1, y: 0 },
})`
  border-radius: 20px;
  overflow: hidden;
  height: auto;
`;

const Container = styled.View`
  padding: 20px;
  background-color: #09131A;
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
  margin-top: 12px;
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
`;

const IconContainer = styled.View`
  background-color: #1f1f1f;
  padding: 4px;
  border-radius: 8px;
`;

const Address = styled.Text`
  color: #9b9292;
  font-size: 10px;
  text-align:center;
  padding:8px 16px;
`;

const TimestampContainer = styled.View`
  margin-bottom: 15px;
`;

const TimestampLabel = styled.Text`
  color: #c1c1c1;
  font-size: 12px;
`;

const TimestampValue = styled.Text`
  color: #19b1d2;
  font-size:12px;
  font-weight: 400;
  margin-top: 15px;
`;

const AgreementText = styled.Text`
  color: #c1c1c1;
  font-size: 12px;
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
