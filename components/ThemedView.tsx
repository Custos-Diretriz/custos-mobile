import {
  ImageBackground,
  View,
  type ViewProps,
  StyleSheet,
} from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  noBackground?: boolean;
};

export function ThemedView({
  style,
  lightColor,
  darkColor,
  noBackground,
  ...otherProps
}: ThemedViewProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  if (noBackground) {
    return <View style={style} {...otherProps} />;
  }

  return (
    <View
      style={[
        {
          backgroundColor,
        },
        style,
      ]}
      {...otherProps}
    />
  );
}
const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
});
