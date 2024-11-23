import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from "react-native";
import { RegularText } from "./StyledText";

interface StyledButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  variant?: "contained" | "outlined";
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const StyledButton = ({
  title,
  onPress,
  disabled = false,
  variant = "contained",
  style,
  textStyle,
}: StyledButtonProps) => {
  const getButtonStyle = () => {
    switch (variant) {
      case "outlined":
        return disabled
          ? [styles.outlinedButton, styles.disabledOutlinedButton]
          : styles.outlinedButton;
      case "contained":
      default:
        return disabled
          ? [styles.containedButton, styles.disabledContainedButton]
          : styles.containedButton;
    }
  };

  const getTextStyle = () => {
    switch (variant) {
      case "outlined":
        return disabled ? styles.disabledOutlinedText : styles.outlinedText;
      case "contained":
      default:
        return disabled ? styles.disabledContainedText : styles.containedText;
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.baseButton, getButtonStyle(), style]}
      disabled={disabled}
    >
      <RegularText style={[styles.baseText, getTextStyle(), textStyle]}>
        {title}
      </RegularText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  baseButton: {
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: "center",
  },

  containedButton: {
    backgroundColor: "#ff6347",
  },
  disabledContainedButton: {
    backgroundColor: "#ccc",
  },

  outlinedButton: {
    borderWidth: 2,
    borderColor: "#ff6347",
    backgroundColor: "transparent",
  },
  disabledOutlinedButton: {
    borderColor: "#ccc",
  },

  baseText: {
    fontSize: 16,
    fontWeight: "bold",
  },

  containedText: {
    color: "#fff",
  },
  disabledContainedText: {
    color: "#666",
  },

  outlinedText: {
    color: "#ff6347",
  },
  disabledOutlinedText: {
    color: "#ccc",
  },
});

export default StyledButton;
