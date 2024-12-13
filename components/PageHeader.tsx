import {HeaderContainer} from "@/styles/base.ts";
import {ThemedText} from "@/components/ThemedText";
import {ProfileAvatar} from "@/components/ProfileAvatar";
import React, {ReactNode} from "react";

export const PageHeader = ({title, children}: { title: String, children?: ReactNode }) => {
  return (
    <HeaderContainer>
      <ThemedText type={"title"} style={{fontSize: 24}}>{title}</ThemedText>
      {children}
      <ProfileAvatar/>
    </HeaderContainer>
  )
}
