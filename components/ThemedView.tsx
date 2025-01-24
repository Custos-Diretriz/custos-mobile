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
  useImageBackground?: boolean;
  noBackground?: boolean;
};

export function ThemedView({
  style,
  lightColor,
  darkColor,
  useImageBackground,
  noBackground,
  ...otherProps
}: ThemedViewProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  if (useImageBackground) {
    return (
      <ImageBackground
        source={require("@/assets/images/background.png")}
        style={[styles.background, style]}
        {...otherProps}
      >
        <View style={style} {...otherProps} />
      </ImageBackground>
    );
  }

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
