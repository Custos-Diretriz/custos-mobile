import React, { useState } from 'react';
import styled from 'styled-components/native';
import { useTheme } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { TextInput } from 'react-native-paper';
import CreateAgreementButton from '../CreateAgreementButton';

const SelectAgreementScreen: React.FC<{ onContinue: () => void }> = ({
  onContinue,
}) => {
  const { colors } = useTheme();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Loan', value: 'loan' },
    { label: 'Mortgage', value: 'mortgage' },
  ]);

  return (
    <OuterContainer>
      <LinearGradient
        colors={['#19b1d2', '#0094ff']}
        style={{ flex: 1, borderRadius: 20, padding: 2 }} // Padding to create space for the border
      >
        <Container background={colors.background}>
          <StyledText color={colors.text}>Second Party's Name</StyledText>

          <InputTitle color={colors.text}>Second Party's Name</InputTitle>
          <InputWrapper
            colors={['#19B1D2', '#0094FF']}
            style={{ borderRadius: 10, padding: 2 }}
          >
            <TextInput
              mode='outlined'
              placeholder='Enter the second party name'
              right={<TextInput.Affix text='/100' />}
            />
          </InputWrapper>

          <InputTitle color={colors.text}>
            Second Party's Wallet Address
          </InputTitle>
          <InputWrapper
            colors={['#19B1D2', '#0094FF']}
            style={{ borderRadius: 10, padding: 2 }}
          >
            <TextInput
              mode='outlined'
              placeholder='Enter valid wallet address'
              right={<TextInput.Affix text='/100' />}
            />
          </InputWrapper>

          <ButtonsContainer>
            <CreateAgreementButton
              onPress={onContinue}
              title='Create Agreement'
            />
          </ButtonsContainer>
        </Container>
      </LinearGradient>
    </OuterContainer>
  );
};

export default SelectAgreementScreen;

const OuterContainer = styled.View`
  margin-top: 70px;
  height: 361px;
  align-items: center;
  justify-content: center;
`;

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

const StyledText = styled.Text<{ color: string }>`
  color: ${(props) => props.color};
  font-size: 26px;
  line-height: 35px;
`;

const ButtonsContainer = styled.View`
  width: 250px;
  flex-direction: row;
  right: -105px;
  align-items: center;
  margin-top: 20px;
`;

const InputTitle = styled.Text<{ color: string }>`
  color: ${(props) => props.color};
  font-size: 18px;
  margin-top: 20px;
  margin-bottom: 10px;
`;
