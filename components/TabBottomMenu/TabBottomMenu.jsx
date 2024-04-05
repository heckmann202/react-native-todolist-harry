import { Image, Text, View } from "react-native";

import { TouchableOpacity } from "react-native";
import { useState } from "react";

import { s } from "./TabBottomMenu.style";

export function TabBottomMenu({ onPress, todoList, selectedTabName }) {
  function getTextStyle(tabName) {
    return {
      fontWeight: "bold",
      color: tabName === selectedTabName ? "#2F76E5" : "black",
    };
  }

  const onPressTab = (selectedTabName) => () => {
    onPress(selectedTabName);
  };
  return (
    <View style={s.tabs}>
      <TouchableOpacity onPress={onPressTab("all")}>
        <Text style={getTextStyle("all")}>All ({todoList.length})</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onPressTab("inProgress")}>
        <Text style={getTextStyle("inProgress")}>
          In Progress (
          {todoList.filter(({ isCompleted }) => !isCompleted).length})
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onPressTab("done")}>
        <Text style={getTextStyle("done")}>
          Done ({todoList.filter(({ isCompleted }) => isCompleted).length})
        </Text>
      </TouchableOpacity>
    </View>
  );
}
