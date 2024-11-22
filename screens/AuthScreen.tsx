import React, { useState } from "react";
import {
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useDispatch } from "react-redux";
import { login } from "../store/slices/authSlice";
import { useRouter } from "expo-router";
import * as Yup from "yup";
import StyledTextInput from "@/components/StyledTextInput";
import StyledButton from "@/components/StyledButton";
import { BigText, RegularText } from "@/components/StyledText";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email format"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
  name: Yup.string(),
});

const AuthScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    name?: string;
  }>({});
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogin = async () => {
    try {
      setErrors({});

      await validationSchema.validate(
        { email, password, name },
        { abortEarly: false }
      );

      if (email === "authfeedprofile@rn.ua" && password === "jg9385df") {
        dispatch(login({ email, name }));
        router.replace("/");
      } else {
        setErrors({ password: "Invalid credentials" });
      }
    } catch (validationError) {
      if (validationError instanceof Yup.ValidationError) {
        const validationErrors: {
          email?: string;
          password?: string;
          name?: string;
        } = {};
        validationError.inner.forEach((err) => {
          if (err.path && ["email", "password", "name"].includes(err.path)) {
            validationErrors[err.path as keyof typeof validationErrors] =
              err.message;
          }
        });
        setErrors(validationErrors);
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <BigText>Welcome Back!</BigText>
        <RegularText style={{ textAlign: "center", marginBottom: 40 }}>
          Log in to your account to continue exploring.
        </RegularText>
        <StyledTextInput
          label="Name"
          icon="account"
          value={name}
          onChangeText={setName}
          placeholder="Olena Vasylchuk"
          errorMessage={errors.name}
        />

        <StyledTextInput
          label="Email Address"
          icon="email"
          value={email}
          onChangeText={setEmail}
          placeholder="feeds@rn.ua"
          keyboardType="email-address"
          required
          errorMessage={errors.email}
        />

        <StyledTextInput
          label="Password"
          icon="lock"
          value={password}
          onChangeText={setPassword}
          placeholder="********"
          isPassword={true}
          required
          errorMessage={errors.password}
        />

        <StyledButton
          title="Login"
          onPress={handleLogin}
          variant="contained"
          disabled={isLoading}
          style={{ marginTop: 40, width: "100%" }}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1,
  },
});

export default AuthScreen;
