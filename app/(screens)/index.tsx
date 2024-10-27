import React, { useEffect, useState } from 'react';
import { useWindowDimensions, Text, GestureResponderEvent, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { useTheme } from '@react-navigation/native';
import { Link } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Nav from '@/components/Nav';
import ArrowLeft from '@/assets/svgs/arrowLeft.svg';
import NoAgreement from '@/assets/svgs/noAgreement.svg';
import OutlinedButton from '@/components/OutlinedButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import NoAgreementScreen from '@/components/modalScreens/NoAgreementScreen';
import SelectAgreementScreen from '@/components/modalScreens/SelectAgreementScreen';
import VerifyIdentityScreen from '@/components/modalScreens/VerifyIdentityScreen';
import AgreementContentScreen from '@/components/modalScreens/AgreementContentScreen';

const THEME_STORAGE_KEY = 'theme';

const Agreement: React.FC = () => {
  const { colors } = useTheme();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [currentModal, setCurrentModal] = useState('NoAgreement');
  const { width } = useWindowDimensions();

  const handleBack = () => {
    if (currentModal === 'VerifyIdentity') setCurrentModal('AgreementContent');
    else if (currentModal === 'AgreementContent')
      setCurrentModal('SelectAgreement');
    else if (currentModal === 'SelectAgreement') setCurrentModal('NoAgreement');
  };

  const handleContinue = () => {
    if (currentModal === 'NoAgreement') setCurrentModal('SelectAgreement');
    else if (currentModal === 'SelectAgreement')
      setCurrentModal('AgreementContent');
    else if (currentModal === 'AgreementContent')
      setCurrentModal('VerifyIdentity');
    else if (currentModal === 'VerifyIdentity') setCurrentModal(null); // TODO: create a done modal
  };

  // Collapse sidebar on mobile view (width < 768px)
  const handleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  useEffect(() => {
    const loadTheme = async () => {
      const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      if (savedTheme) {
        setIsDarkMode(savedTheme === 'dark');
      }
    };
    loadTheme();
  }, []);

  const toggleTheme = async () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    await AsyncStorage.setItem(THEME_STORAGE_KEY, newTheme ? 'dark' : 'light');
  };

  const handlePress = () => {
    // Navigate to agreement creation screen
    // Navigation.navigate('AgreementCreate');
  };

  return (
    <StyledView backgroundColor={colors.background}>
      <NavContainer>
        <Nav />
      </NavContainer>
      <BackButtonContainer onPress={handleBack}>
          <ArrowLeft />
          <StyledText color={colors.text}>Back</StyledText>
      </BackButtonContainer>
      <AgreementText color={colors.text}>Agreements</AgreementText>
      <NoAgreementContainer>
        {currentModal === 'NoAgreement' && (
          <NoAgreementScreen onContinue={handleContinue} />
        )}
        {/* Select Agreement Modal */}
        {currentModal === 'SelectAgreement' && (
          <SelectAgreementScreen onContinue={handleContinue} />
        )}
        {/* Agreement Content Modal */}
        {currentModal === 'AgreementContent' && (
          <AgreementContentScreen onContinue={handleContinue} />
        )}
        {/* Verify Identity Modal */}
        {currentModal === 'VerifyIdentity' && (
          <VerifyIdentityScreen onContinue={handleContinue} />
        )}
      </NoAgreementContainer>
    </StyledView>
  );
};

export default Agreement;

const StyledView = styled.View<{ backgroundColor: string }>`
  background-color: ${(props) => props.backgroundColor};
  flex-direction: column;
  justify-content: center;
  padding: 20px;
`;

const NavContainer = styled.View`
  padding-right: 20px;
`;

const BackButtonContainer = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 40px;
  padding-left: 10px;
  width: 75px;
`;

const StyledText = styled.Text<{ color: string }>`
  color: ${(props) => props.color};
  font-size: 16px;
`;

const AgreementText = styled.Text<{ color: string }>`
  color: ${(props) => props.color};
  font-size: 24px;
  font-weight: 600;
  padding-left: 10px;
  margin-top: 10px;
`;

const NoAgreementContainer = styled.View`
  justify-content: center;
  align-items: center;
`;

// // Sidebar with collapsible behavior
// interface SidebarProps {
//   isCollapsed: boolean;
// }

// const Sidebar = styled.View<SidebarProps>`
//   width: ${(props) => (props.isCollapsed ? '80px' : '250px')};
//   background-color: #111;
//   padding: 20px;
//   height: 100%;
//   transition: width 0.3s;
// `;

// // Header (top navigation)
// const Header = styled.View`
//   height: 60px;
//   background-color: #333;
//   padding: 10px;
//   flex-direction: row;
//   justify-content: space-between;
//   align-items: center;
// `;

// const Button = styled.TouchableOpacity`
//   background-color: #0066cc;
//   padding: 10px 15px;
//   border-radius: 5px;
//   margin-top: 10px;
// `;

// const CollapseButton = styled.TouchableOpacity`
//   background-color: transparent;
//   padding: 10px;
//   align-items: center;
// `;

// import ModeSwitch from '@/components/ModeSwitch';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useTheme } from '@react-navigation/native';
// import { useEffect, useState } from 'react';
// import { Switch } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import styled from 'styled-components/native';

// const THEME_STORAGE_KEY = 'theme';

// export default function Index() {
//   const { colors } = useTheme();
//   const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

//   useEffect(() => {
//     const loadTheme = async () => {
//       const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
//       if (savedTheme) {
//         setIsDarkMode(savedTheme === 'dark');
//       }
//     };
//     loadTheme();
//   }, []);

//   const toggleTheme = async () => {
//     const newTheme = !isDarkMode;
//     setIsDarkMode(newTheme);
//     await AsyncStorage.setItem(THEME_STORAGE_KEY, newTheme ? 'dark' : 'light');
//   };

//   return (
//     <SafeAreaView
//       style={{
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//       }}
//     >
//       <Container backgroundColor={colors.background}>
//         {/* <StyledText>Edit app/index.tsx to edit this screen.</StyledText> */}

//         {/* Switch for toggling the theme */}
//         <SwitchContainer>
//           {/* <StyledText color={colors.text}>
//             {isDarkMode ? 'Dark Mode' : 'Light Mode'}
//           </StyledText> */}
//           {/* <Switch
//             value={isDarkMode}
//             onValueChange={toggleTheme}
//           /> */}

//           {/* <ModeSwitch
//             isDarkMode={isDarkMode}
//             toggleTheme={toggleTheme}
//           /> */}
//         </SwitchContainer>
//       </Container>
//     </SafeAreaView>
//   );
// }

// // Styled components
// const Container = styled.View<{ backgroundColor: string }>`
//   flex: 1;
//   justify-content: center;
//   align-items: center;
//   background-color: ${(props) => props.backgroundColor};
// `;

// const StyledText = styled.Text<{ color: string }>`
//   color: ${(props) => props.color};
//   font-size: 16px;
// `;

// const SwitchContainer = styled.View`
//   flex-direction: row;
//   align-items: center;
//   margin-top: 20px;
// `;
