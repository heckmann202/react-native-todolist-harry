import { Image, Text, View } from "react-native";

import { TouchableOpacity } from "react-native";
import { s } from "./CardTask.style";

export function CardTask({ todo, onPress, onLongPress }) {
  return (
    <TouchableOpacity
      style={s.card}
      onPress={() => onPress(todo)}
      onLongPress={() => onLongPress(todo)}
    >
      <Text
        style={[
          { fontSize: 25 },
          todo.isCompleted && { textDecorationLine: "line-through" },
        ]}
      >
        {todo.title}
      </Text>
      {todo.isCompleted && (
        <Image
          source={require("../../assets/check.png")}
          style={{
            height: 25,
            width: 25,
          }}
          resizeMode="contain"
        />
      )}
    </TouchableOpacity>
  );
}
