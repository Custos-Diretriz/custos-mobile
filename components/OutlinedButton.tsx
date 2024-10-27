// import React from 'react';
// import styled from 'styled-components/native';
// import { TouchableOpacity, Text } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
// import Plus from '@/assets/svgs/Plus.svg';
// import { useTheme } from '@react-navigation/native';

// export type ButtonProps = {
//   onPress: () => void;
//   title: string;
// };

// const OutlinedButton: React.FC<ButtonProps> = ({ onPress, title }) => {
//   const { colors } = useTheme();

//   return (
//     <ButtonWrapper onPress={onPress}>
//       <GradientBorder colors={['#00f', '#00e8ff']}>
//         <ButtonContent>
//           <ButtonText color={colors.text}>{title}</ButtonText>
//           <PlusIcon fill={colors.text} />
//         </ButtonContent>
//       </GradientBorder>
//     </ButtonWrapper>
//   );
// };

// export default OutlinedButton;

// const ButtonWrapper = styled(TouchableOpacity)`
//   width: 248px;
//   height: 64px;
//   border-radius: 40px;
//   overflow: hidden;
// `;

// const GradientBorder = styled(LinearGradient)`
//   flex: 1;
//   border-radius: 40px;
//   justify-content: center;
//   align-items: center;
//   padding: 2px;
// `;

// const ButtonContent = styled(TouchableOpacity)`
//   flex: 1;
//   justify-content: center;
//   align-items: center;
//   border-radius: 40px;
//   background-color: transparent;
// `;

// const ButtonText = styled(Text)<{ color: string }>`
//   font-size: 16px;
//   color: ${(props) => props.color};
//   margin-right: 8px;
// `;

// const PlusIcon = styled(Plus)<{ fill: string }>`
//   width: 16px;
//   height: 16px;
//   fill: ${(props) => props.fill};
// `;

import React from 'react';
import { useTheme } from '@react-navigation/native';
import styled from 'styled-components/native';
import Plus from '@/assets/svgs/plus.svg';

export type ButtonProps = {
    onPress: () => void;
    title: string;
  };

const OutlinedButton: React.FC<ButtonProps> = ({ onPress, title }) => {
  const { colors } = useTheme();

  return (
    <GradientOutlinedButton
      activeOpacity={0.8}
          color={colors.text}
          onPress={onPress}
    >
          <ButtonText color={colors.text}>{title}</ButtonText>
      <PlusIcon fill={colors.text} />
    </GradientOutlinedButton>
  );
};

export default OutlinedButton;

// Styled components for React Native
const GradientOutlinedButton = styled.TouchableOpacity<{ color: string }>`
  width: 248px;
  height: 64px;
  border-radius: 40px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: 2px solid;
  background: transparent;
  border-image-slice: 1;
  border-image-source: linear-gradient(90deg, #0094ff, #a02294);

  &:hover {
    background: linear-gradient(90deg, #0094ff, #a02294);
  }
`;

const ButtonText = styled.Text<{ color: string }>`
  font-size: 16px;
  color: ${(props) => props.color};
  margin-right: 8px;
`;

// Styling for the Plus SVG
const PlusIcon = styled(Plus)<{ fill: string }>`
  width: 16px;
  height: 16px;
  fill: ${(props) => props.fill};
`;
