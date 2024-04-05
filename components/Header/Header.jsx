import { Image, Text, View } from "react-native";

export function Header(p) {
  return (
    <View>
      <Image
        source={require("../../assets/logo.png")}
        style={{ width: 170 }}
        resizeMode="contain"
      />
      <Text style={{ marginTop: -20, color: "#ABABAB", fontSize: 20 }}>
        You probably have something to do
      </Text>
    </View>
  );
}
