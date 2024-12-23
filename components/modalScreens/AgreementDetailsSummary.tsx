import React, {ReactNode} from 'react';
import {ScrollView} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {useTheme} from '@react-navigation/native';
import Edit from '@/assets/svgs/edit.svg';
import {ThemedView} from "@/components/ThemedView";
import {childrenStyles} from "@/app/(tabs)/agreement";
import {ThemedText} from "@/components/ThemedText";
import {Colors} from "@/constants/Colors";
import TransparentButton from "@/components/Buttons/TransparentButton";
import {useColorScheme} from "@/hooks/useColorScheme";
import OutlinedButton from "@/components/Buttons/OutlinedButton";

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

const AgreementDetailsSummary: React.FC<{ onContinue: () => void }> = (
  {
    onContinue,
  }) => {
  const {colors} = useTheme();
  const colorScheme = useColorScheme();

  return (
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
        </ThemedView>

        <ThemedView style={[childrenStyles.buttonContainer, {flexDirection: 'column', minWidth: '100%'}]}>
          <OutlinedButton text={"Print Agreement"} onPress={onContinue} icon={""} customStyles={{width: '100%'}}/>

          <TransparentButton text={"Validate Agreement"} onPress={onContinue} customStyles={{width: '100%'}}>
            <ThemedText>Validate Agreement</ThemedText>
          </TransparentButton>
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
};

export default AgreementDetailsSummary;
