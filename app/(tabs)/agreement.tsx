import React, { useState, useEffect } from "react";
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedView, ThemedText, PageHeader } from "@/components";
import ArrowLeft from "@/assets/svgs/arrowLeft.svg";
import {
  NoAgreementScreen,
  SelectAgreementScreen,
  VerifyIdentityScreen,
  AgreementContentScreen,
  SecondPartyWalletScreen,
  AgreementSuccessful,
  PrintAgreementScreen,
} from "@/components/modalScreens";
import Sidebar from "@/components/Sidebar";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FLOW_STEPS = [
  "NoAgreement",
  "SelectAgreement",
  "AgreementContent",
  "VerifyIdentity",
  "SecondParty",
  "AgreementSuccessful",
  "PrintAgreementScreen",
] as const;

const THEME_STORAGE_KEY = "theme";

type FlowStep = typeof FLOW_STEPS[number];

const Agreement = () => {
  const { width } = useWindowDimensions();
  const { colors } = useTheme();
  
  // Flow state
  const [currentStep, setCurrentStep] = useState<FlowStep>("NoAgreement");
  const [selectedAgreement, setSelectedAgreement] = useState<string>("");
  const [secondPartyAddress, setSecondPartyAddress] = useState<string>("");
  
  // UI state
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  // Navigation handlers
  const handleContinue = () => {
    const currentIndex = FLOW_STEPS.indexOf(currentStep);
    if (currentIndex < FLOW_STEPS.length - 1) {
      setCurrentStep(FLOW_STEPS[currentIndex + 1]);
    }
  };

  const handleBack = () => {
    const currentIndex = FLOW_STEPS.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(FLOW_STEPS[currentIndex - 1]);
    }
  };

  // Theme management
  useEffect(() => {
    const loadTheme = async () => {
      const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      setIsDarkMode(savedTheme === "dark");
    };
    loadTheme();
  }, []);

  const toggleTheme = async () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    await AsyncStorage.setItem(THEME_STORAGE_KEY, newTheme ? "dark" : "light");
  };

  // Responsive sidebar
  const handleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  // Wallet connection placeholder
  const connectWallet = () => {};

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <ImageBackground
          source={require("@/assets/images/background.png")}
          style={[styles.background, { backgroundColor: colors.background }]}
        >
          {/* Sidebar toggle (original Nav implementation) */}
          <TouchableOpacity
            style={styles.navButton}
            onPress={toggleSidebar}
          >
            <MenuIcon width={24} height={24} fill={colors.text} />
          </TouchableOpacity>

          <ThemedView style={styles.contentContainer}>
            <PageHeader title="Agreement Flow" />
            
            {/* Back button with theme-aware styling */}
            {currentStep !== "NoAgreement" && (
              <TouchableOpacity
                style={styles.backButton}
                onPress={handleBack}
              >
                <ArrowLeft width={24} height={24} fill={colors.text} />
                <ThemedText style={[styles.backText, { color: colors.text }]}>
                  Back
                </ThemedText>
              </TouchableOpacity>
            )}

            {/* Main flow container */}
            <ThemedView style={[
              styles.modalContainer,
              width < 768 && styles.mobileContainer
            ]}>
              {currentStep === "NoAgreement" && (
                <NoAgreementScreen onContinue={handleContinue} />
              )}

              {currentStep === "SelectAgreement" && (
                <SelectAgreementScreen
                  onContinue={handleContinue}
                  onSelectAgreement={setSelectedAgreement}
                  theme={isDarkMode ? "dark" : "light"}
                />
              )}

              {currentStep === "AgreementContent" && (
                <AgreementContentScreen
                  onContinue={handleContinue}
                  agreementTitle={selectedAgreement}
                  theme={isDarkMode ? "dark" : "light"}
                />
              )}

              {currentStep === "VerifyIdentity" && (
                <VerifyIdentityScreen 
                  onContinue={handleContinue}
                  theme={isDarkMode ? "dark" : "light"}
                />
              )}

              {currentStep === "SecondParty" && (
                <SecondPartyWalletScreen
                  onContinue={handleContinue}
                  onAddressChange={setSecondPartyAddress}
                  theme={isDarkMode ? "dark" : "light"}
                />
              )}

              {currentStep === "AgreementSuccessful" && (
                <AgreementSuccessful
                  onClose={() => setCurrentStep("PrintAgreementScreen")}
                  theme={isDarkMode ? "dark" : "light"}
                />
              )}

              {currentStep === "PrintAgreementScreen" && (
                <PrintAgreementScreen
                  onFinish={() => setCurrentStep("NoAgreement")}
                  theme={isDarkMode ? "dark" : "light"}
                />
              )}
            </ThemedView>
          </ThemedView>
        </ImageBackground>
      </ScrollView>

      {/* Collapsible sidebar */}
      {isSidebarVisible && (
        <Sidebar
          onClose={toggleSidebar}
          isCollapsed={isCollapsed}
          onCollapse={handleCollapse}
          connectWallet={connectWallet}
          theme={isDarkMode ? "dark" : "light"}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  contentContainer: {
    flex: 1,
    padding: 16,
  },
  navButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    zIndex: 100,
    padding: 8,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
    paddingHorizontal: 8,
  },
  backText: {
    marginLeft: 8,
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  mobileContainer: {
    padding: 10,
  },
});

export default Agreement;