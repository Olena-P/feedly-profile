import React from "react";
import { Text as RNText, TextProps, StyleSheet } from "react-native";
import { useTheme } from "@/contexts/ThemeContext";

export const BigText = ({ style, ...props }: TextProps) => {
  const { theme } = useTheme();
  return (
    <RNText
      {...props}
      style={[styles.bigText, { color: theme.textColor }, style]}
    />
  );
};

export const RegularText = ({ style, ...props }: TextProps) => {
  const { theme } = useTheme();
  return (
    <RNText
      {...props}
      style={[styles.regularText, { color: theme.textColor }, style]}
    />
  );
};

export const SmallText = ({ style, ...props }: TextProps) => {
  const { theme } = useTheme();
  return (
    <RNText
      {...props}
      style={[styles.smallText, { color: theme.textColor }, style]}
    />
  );
};

const styles = StyleSheet.create({
  bigText: {
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "SpaceMono",
  },
  regularText: {
    fontSize: 16,
    fontFamily: "SpaceMono",
  },
  smallText: {
    fontSize: 12,
    fontFamily: "SpaceMono",
  },
});
