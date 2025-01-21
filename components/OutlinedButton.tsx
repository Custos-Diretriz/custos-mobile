import React from "react";
import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "@react-navigation/native";
import Plus from "@/assets/svgs/plus.svg";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";

export type BottonProps = {
  title: string;
  onPress: () => void;
};

const GradientButton: React.FC<BottonProps> = ({ title, onPress }) => {
  const { colors } = useTheme();

  return (
    <ButtonContainer background={colors.background} onPress={onPress}>
      <GradientBorder colors={["#0094FF", "#A02294"]}>
        <ButtonView>
          <ButtonText color={colors.text}>{title}</ButtonText>
          <PlusIconContainer>
            <Plus fill={colors.text} />
          </PlusIconContainer>
        </ButtonView>
      </GradientBorder>
    </ButtonContainer>
  );
};

export default GradientButton;

const GradientBorder = styled(LinearGradient).attrs({
  start: { x: 0, y: 0 },
  end: { x: 1, y: 0 },
})`
  padding: 3px;
  border-radius: 100px 100px;
  width: 292px;
`;

const ButtonContainer = styled(TouchableOpacity)<{ background: string }>`
  background-color: ${(props) => props.background};
  border-radius: 100px;
  margin: 15px 20px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

const PlusIconContainer = styled(TouchableOpacity)`
  margin-left: 10px;
`;

const ButtonView = styled(ThemedView)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  //background-color: #000;
  border-radius: 30px;
  padding: 16px 0;
`;

const ButtonText = styled(ThemedText)<{ color: string }>`
  color: ${(props) => props.color};
  font-size: 16px;
`;

// import React from 'react';
// import { useTheme } from '@react-navigation/native';
// import styled from 'styled-components/native';
// import Plus from '@/assets/svgs/plus.svg';
// import { Button } from 'react-native-paper';
// import { LinearGradient } from 'expo-linear-gradient'; // Make sure to install expo-linear-gradient

// export type ButtonProps = {
//   onPress: () => void;
//   title: string;
// };

// const OutlinedButton: React.FC<ButtonProps> = ({ onPress, title }) => {
//   const { colors } = useTheme();

//   return (
//     // <GradientBorder>
//     //   <LinearGradient
//     //     colors={['#00f', '#f0f']}
//     //     start={{ x: 0, y: 0 }}
//     //     end={{ x: 1, y: 1 }}
//     //     style={{ borderRadius: 25 }}
//     //   >
//     //     <Button
//     //       icon={Plus}
//     //       mode='outlined'
//     //       onPress={onPress}
//     //       contentStyle={{ flexDirection: 'row-reverse' }}
//     //       labelStyle={{ marginRight: 25, color: 'white' }}
//     //       style={{
//     //         borderColor: 'transparent', // Hide the default border
//     //         borderWidth: 0, // Hide the default border
//     //         borderRadius: 25, // Match the border radius
//     //         paddingVertical: 10, // Adjust padding for better appearance
//     //       }}
//     //     >
//     //       {title}
//     //     </Button>
//     //   </LinearGradient>
//     // </GradientBorder>
//     <>
//       {/* <LinearGradient
//         colors={['#00f', '#f0f']} // Adjust colors for your desired gradient
//         style={{
//           borderWidth: 2, // Border width for the gradient
//           borderColor: 'transparent', // Hide the default border
//           borderRadius: 50, // Set border radius
//           overflow: 'hidden', // Prevent overflow
//           paddingVertical: 0, // Space within the button, was 5
//         }}
//       >
//         <Button
//           icon={Plus}
//           mode='contained'
//           onPress={onPress}
//           contentStyle={{ flexDirection: 'row-reverse' }} // Icon positioning
//           labelStyle={{ marginRight: 25, color: 'white' }} // Change text color
//           style={{
//             borderColor: '#ccc', // Hide the default border
//             borderWidth: 2, // Hide the default border width
//             borderRadius: 50, // Match the border radius
//             paddingVertical: 10, // Adjust padding
//           }}
//         >
//           {title}
//         </Button>
//       </LinearGradient> */}

//       <Button
//         icon={Plus}
//         mode='outlined'
//         onPress={onPress}
//         contentStyle={{ flexDirection: 'row-reverse' }} // Icon positioning
//         labelStyle={{ marginRight: 25, color: 'white' }} // Change text color
//         style={{
//           borderColor: 'transparent', // Hide the default border
//           borderWidth: 0, // Hide the default border width
//           borderRadius: 50, // Match the border radius
//           paddingVertical: 0, // Adjust padding
//         }}
//       >
//         {title}
//       </Button>
//       <LinearGradient
//         colors={['#00f', '#f0f']} // Adjust colors for your desired gradient
//         style={{
//           borderWidth: 3,
//           borderColor: 'transparent', // Hide the default border
//           borderRadius: 50, // Set border radius
//           overflow: 'hidden', // Prevent overflow
//           paddingVertical: 0, // Space within the button, was 5
//         }}
//       >
//         <Button
//           icon={Plus}
//           mode='contained'
//           onPress={onPress}
//           contentStyle={{ flexDirection: 'row-reverse' }} // Icon positioning
//           labelStyle={{ marginRight: 25, color: 'white' }} // Change text color
//           style={{
//             borderColor: 'transparent', // Hide the default border
//             borderWidth: 0, // Hide the default border width
//             borderRadius: 50, // Match the border radius
//             paddingVertical: 0, // Adjust padding
//           }}
//         >
//           {title}
//         </Button>
//       </LinearGradient>
//     </>
//   );
// };

// export default OutlinedButton;

// // <GradientOutlinedButton
// //   activeOpacity={0.8}
// //       color={colors.text}
// //       onPress={onPress}
// // >
// //       <ButtonText color={colors.text}>{title}</ButtonText>
// //   <PlusIcon fill={colors.text} />
// // </GradientOutlinedButton>
