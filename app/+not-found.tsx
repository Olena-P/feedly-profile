import { Link, Stack } from "expo-router";
import { StyleSheet } from "react-native";

import { View } from "@/components/Themed";
import { BigText, RegularText } from "@/components/StyledText";
import { useTheme } from "@/contexts/ThemeContext";

export default function NotFoundScreen() {
  const { theme } = useTheme();

  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <View
        style={[styles.container, { backgroundColor: theme.colors.background }]}
      >
        <BigText style={{ textAlign: "center" }}>
          This screen doesn't exist.
        </BigText>

        <Link href="/" style={styles.link}>
          <RegularText style={{ color: theme.colors.primary }}>
            Go to home screen!
          </RegularText>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },

  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
