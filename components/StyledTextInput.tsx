import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  TextInputProps,
  Text,
  ViewStyle,
} from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { SmallText } from "./StyledText";

interface StyledTextInputProps extends TextInputProps {
  label?: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  isPassword?: boolean;
  errorMessage?: string;
  required?: boolean;
}

const StyledTextInput = ({
  label,
  icon,
  isPassword = false,
  errorMessage,
  required = false,
  style,
  ...props
}: StyledTextInputProps) => {
  const [inputBackgroundColor, setInputBackgroundColor] = useState("#fff");
  const [hidePassword, setHidePassword] = useState(isPassword);

  const handleFocus = () => {
    setInputBackgroundColor("#f0f0f0");
  };

  const handleBlur = () => {
    setInputBackgroundColor("#fff");
  };

  return (
    <View style={[styles.inputWrapper, style as ViewStyle]}>
      {label && (
        <SmallText style={styles.label}>
          {label} {required && <Text style={styles.asterisk}>*</Text>}
        </SmallText>
      )}
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons name={icon} size={24} color="#666" />
      </View>
      <TextInput
        {...props}
        style={[
          styles.inputField,
          { backgroundColor: inputBackgroundColor },
          { fontFamily: "SpaceMono" },
        ]}
        placeholderTextColor="#aaa"
        onFocus={handleFocus}
        onBlur={handleBlur}
        secureTextEntry={isPassword && hidePassword}
      />
      {isPassword && (
        <TouchableOpacity
          onPress={() => setHidePassword((prev) => !prev)}
          style={styles.passwordToggleIcon}
        >
          <MaterialCommunityIcons
            name={hidePassword ? "eye-off" : "eye"}
            size={24}
            color="#666"
          />
        </TouchableOpacity>
      )}
      {errorMessage && (
        <SmallText style={styles.error}>{errorMessage}</SmallText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputWrapper: {
    position: "relative",
    marginBottom: 20,
  },
  label: {
    marginBottom: 5,
    fontSize: 14,
  },
  asterisk: {
    color: "red",
  },
  inputField: {
    minWidth: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingLeft: 50,
    paddingRight: 50,
    fontSize: 16,
    fontFamily: "SpaceMono",
  },
  iconContainer: {
    position: "absolute",
    top: 37,
    left: 15,
    zIndex: 1,
  },
  passwordToggleIcon: {
    position: "absolute",
    top: 37,
    right: 15,
    zIndex: 1,
  },
  error: {
    marginTop: 5,
    color: "red",
    fontSize: 12,
  },
});

export default StyledTextInput;
