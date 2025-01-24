import styled from "styled-components/native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";

export const HeaderContainer = styled(ThemedView)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px 8px;
  background: transparent;
`;

export const HeaderText = styled(ThemedText)<{ color?: string }>`
  //color: ${(props) => props.color};
  font-size: 24px;
  font-weight: 600;
  padding-left: 10px;
  //margin-top: 10px;
`;
