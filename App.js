

import { Alert, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import { CardTask } from "./components/CardTask/CardTask";
import Dialog from "react-native-dialog";
import { Header } from "./components/Header/Header";
import { TabBottomMenu } from "./components/TabBottomMenu/TabBottomMenu";
import { s } from "./App.style";
import { useEffect, useState } from "react";
import uuid from "react-native-uuid";
import AsyncStorage from '@react-native-async-storage/async-storage'


let firstRender = true
export default function App() {
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [selectedTabName, setSelectedTabName] = useState("all");
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    loadToDoList()
  }, [])

  useEffect(() => {
    !firstRender && saveTodoList()
  }, [todoList])

  const loadToDoList = async () => {
    try {
      const toDoListString = await AsyncStorage.getItem('@todoList')
      const parsedTodoList = JSON.parse(toDoListString)
      setTodoList(parsedTodoList || [])
    } catch(err) {
      alert(error)
    }
  }

  const saveTodoList = async () => {
    try {
      await AsyncStorage.setItem('@todoList', JSON.stringify(todoList))
    } catch(err) {
      alert(error)
    }
  }

  function onPressTodo(pressedTodo) {
    const udpatedTodo = {
      ...pressedTodo,
      isCompleted: !pressedTodo.isCompleted,
    };
    const index = todoList.findIndex((t) => t.id === pressedTodo.id);
    const updatedTodoList = [...todoList];
    updatedTodoList[index] = udpatedTodo;
    setTodoList(updatedTodoList);
  }
  function onLongPressTodo(longPressedTodo) {
    Alert.alert(
      "Delete Todo",
      "Are you sure you want to delete this todo ?",
      [
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            setTodoList(todoList.filter((t) => t.id !== longPressedTodo.id));
          },
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ]
    );
  }

  const filteredNoteList = getFilteredNoteList();
  function renderTasks() {
    return filteredNoteList.map((todo, i) => (
      <View key={todo + i} style={{ marginBottom: 20 }}>
        <CardTask
          todo={todo}
          onPress={onPressTodo}
          onLongPress={onLongPressTodo}
        />
      </View>
    ));
  }

  function getFilteredNoteList() {
    switch (selectedTabName) {
      case "all":
        return todoList;
      case "inProgress":
        return todoList.filter(({ isCompleted }) => !isCompleted);
      case "done":
        return todoList.filter(({ isCompleted }) => isCompleted);
    }
  }

  function createTodo() {
    if (inputValue.trim().length > 0) {
      setTodoList([
        ...todoList,
        { id: uuid.v4(), title: inputValue, isCompleted: false },
      ]);
    }
    setIsDialogVisible(false);
  }

  const buttonAdd = () => {
    return (
      <Pressable
        style={s.pressable}
        onPress={() => setIsDialogVisible(true)}
      >
        <Text
          style={s.text}
        >
          + New todo
        </Text>
      </Pressable>
    );
  };
  return (
    <SafeAreaProvider style={{ backgroundColor: "#F9F9F9" }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={s.root}>
          <View style={{ flex: 1 }}>
            <Header />
          </View>
          <View style={{ flex: 5 }}>
            <ScrollView>{renderTasks()}</ScrollView>
          </View>
        </View>
        {buttonAdd()}

        <Dialog.Container
          visible={isDialogVisible}
          onBackdropPress={() => setIsDialogVisible(false)}
        >
          <Dialog.Title>Add Todo</Dialog.Title>
          <Dialog.Description>
            Choose a name for your todo
          </Dialog.Description>
          <Dialog.Input onChangeText={setInputValue} />
          <Dialog.Button color='grey' label="Cancel" onPress={() => setIsDialogVisible(false)} />
          <Dialog.Button label="Save" onPress={createTodo} />
        </Dialog.Container>
      </SafeAreaView>
      <TabBottomMenu
        todoList={todoList}
        onPress={setSelectedTabName}
        selectedTabName={selectedTabName}
      />
    </SafeAreaProvider>
  );
}
