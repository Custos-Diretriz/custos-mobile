import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, useWindowDimensions} from 'react-native';
import styled from 'styled-components/native';
import {useTheme} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ArrowLeft from '@/assets/svgs/arrowLeft.svg';
import NoAgreementScreen from '@/components/modalScreens/NoAgreementScreen';
import SelectAgreementScreen from '@/components/modalScreens/SelectAgreementScreen';
import VerifyIdentityScreen from '@/components/modalScreens/VerifyIdentityScreen';
import AgreementContentScreen from '@/components/modalScreens/AgreementContentScreen';
import SecondPartyWalletScreen from '@/components/modalScreens/SecondPartyWalletScreen';
import AgreementSuccessful from '@/components/modalScreens/AgreementSuccessful';
import PrintAgreementScreen from '@/components/modalScreens/PrintAgreementScreen';
import Sidebar from '@/components/Sidebar';
import {SafeAreaView} from "react-native-safe-area-context";
import {ThemedView} from "@/components/ThemedView";
import {PageHeader} from "@/components/PageHeader";

const THEME_STORAGE_KEY = 'theme';

const Agreement = () => {
  const {colors} = useTheme();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [currentModal, setCurrentModal] = useState('NoAgreement');
  const [isPrintScreenVisible, setIsPrintScreenVisible] =
    useState<boolean>(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const {width} = useWindowDimensions();

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
    else if (currentModal === 'VerifyIdentity') setCurrentModal('SecondParty');
    else if (currentModal === 'SecondParty') {
      setCurrentModal('AgreementSuccessful');
      setIsPrintScreenVisible(true);
    }
  };

  const handleCloseModal = () => {
    setIsPrintScreenVisible(false);
    setCurrentModal('PrintAgreementScreen');
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

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const connectWallet = () => {
  };

  return (
    <SafeAreaView style={styles.container}>
      {/*<StyledView backgroundColor={colors.background}>*/}
      {/* Conditionally render Sidebar */}
      {/* <NavContainer>
        <Nav toggleSidebar={toggleSidebar} />
      </NavContainer> */}
      {/*<ScrollView contentContainerStyle={{flexGrow: 1}}>*/}
        <ThemedView style={{flexGrow: 1}}>
          <PageHeader title={"Agreement"} />
          {/*<AgreementText color={colors.text}>Agreements</AgreementText>*/}
          <BackButtonContainer onPress={handleBack}>
            <ArrowLeft/>
            <StyledText color={colors.text}>Back</StyledText>
          </BackButtonContainer>
          <NoAgreementContainer>
            {currentModal === 'NoAgreement' && (
              <NoAgreementScreen onContinue={handleContinue}/>
            )}
            {/* Select Agreement Modal */}
            {currentModal === 'SelectAgreement' && (
              <SelectAgreementScreen onContinue={handleContinue}/>
            )}
            {/* Agreement Content Modal */}
            {currentModal === 'AgreementContent' && (
              <AgreementContentScreen onContinue={handleContinue}/>
            )}
            {/* Verify Identity Modal */}
            {currentModal === 'VerifyIdentity' && (
              <VerifyIdentityScreen onContinue={handleContinue}/>
            )}
            {/* Second Party Modal */}
            {currentModal === 'SecondParty' && (
              <SecondPartyWalletScreen onContinue={handleContinue}/>
            )}
            {currentModal === 'AgreementSuccessful' && (
              <AgreementSuccessful
                isVisible={isPrintScreenVisible}
                onClose={handleCloseModal}
              />
            )}
            {/* Print Agreement Modal */}
            {currentModal === 'PrintAgreementScreen' && (
              <PrintAgreementScreen onContinue={handleContinue}/>
            )}
          </NoAgreementContainer>
          {/* <Footer /> */}
        </ThemedView>
      {/*</ScrollView>*/}
      {isSidebarVisible && <Sidebar onClose={toggleSidebar} connectWallet={function (): void {
        throw new Error('Function not implemented.');
      }}/>}
      {/*</StyledView>*/}
    </SafeAreaView>
  );
};

export default Agreement;

const StyledView = styled.SafeAreaView<{ backgroundColor: string }>`
    flex: 1;
    background-color: ${(props) => props.backgroundColor};
    //flex-direction: column;
    //justify-content: center;
`;

const NavContainer = styled.View`
    padding: 20px;
`;

const BackButtonContainer = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    //margin-top: 40px;
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

const NoAgreementContainer = styled(ThemedView)`
    margin-top: 40px;
    justify-content: center;
    align-items: center;
`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#000',
  },
});
