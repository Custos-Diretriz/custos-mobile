import { HeaderContainer } from "@/styles/base.ts";
import { ThemedText } from "@/components/ThemedText";
import { ProfileAvatar } from "@/components/ProfileAvatar";
import React, { ReactNode } from "react";
import { Colors } from "@/constants/Colors";
import { Text } from "react-native";

export const PageHeader = ({ title, children }: { title: String, children?: ReactNode }) => {
  return (
    <HeaderContainer style={{
      backgroundColor: Colors.transparentBg
    }}>
      <Text style={{ fontSize: 24, color: Colors.dark.text, fontFamily: "Outfit-SemiBold" }}>{title}</Text>
      {children}
      <ProfileAvatar />
    </HeaderContainer>
  )
}
