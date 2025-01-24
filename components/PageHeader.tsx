import { HeaderContainer } from "@/styles/base.ts";
import { ThemedText } from "@/components/ThemedText";
import { ProfileAvatar } from "@/components/ProfileAvatar";
import React, { ReactNode } from "react";
import { Colors } from "@/constants/Colors";

export const PageHeader = ({
  title,
  children,
}: {
  title: String;
  children?: ReactNode;
}) => {
  return (
    <HeaderContainer>
      <ThemedText
        type={"title"}
        darkColor={Colors.dark.text}
        style={{ fontSize: 24, fontWeight: 600 }}
      >
        {title}
      </ThemedText>
      {children}
      <ProfileAvatar />
    </HeaderContainer>
  );
};
