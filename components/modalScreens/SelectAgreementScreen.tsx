import React, { useState } from 'react';
import styled from 'styled-components/native';
import { useTheme } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import DropDownPicker from 'react-native-dropdown-picker';
import CancelButton from '../CancelButton';
import ContinueButton from '../ContinueButton';

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
        style={{ flex: 1, borderRadius: 20, padding: 1 }} // Padding to create space for the border
      >
        <Container background={colors.background}>
          <StyledText color={colors.text}>
            Select the type of agreement you want to create
          </StyledText>
          {/* Replace this with your custom picker */}
          <AgreementTypeText color={colors.text}>
            Agreement Type
          </AgreementTypeText>

          <DropDownPickerWrapper
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
              style={{ backgroundColor: colors.background }}
              dropDownContainerStyle={{ backgroundColor: colors.background }}
              placeholderStyle={{
                color: `${colors.text}`,
                fontSize: 16,
              }}
              arrowIconStyle={{ tintColor: 'white' }}
            />
          </DropDownPickerWrapper>

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
      </LinearGradient>
    </OuterContainer>
  );
};

export default SelectAgreementScreen;

const OuterContainer = styled.View`
  margin-top: 100px;
  width: 170px;
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
