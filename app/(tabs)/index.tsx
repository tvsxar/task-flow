import { createHomeStyles } from "@/assets/styles/home.styles";
import Header from "@/components/Header";
import LoadingSpinner from "@/components/LoadingSpinner";
import TaskInput from "@/components/TaskInput";
import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import useTheme from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { useMutation, useQuery } from "convex/react";
import { LinearGradient } from 'expo-linear-gradient';
import { Alert, FlatList, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Task = Doc<"tasks">;

export default function Index() {
  const { toggleDarkMode, colors } = useTheme();

  const homeStyles = createHomeStyles(colors);

  const tasks = useQuery(api.tasks.getTasks);
  const toggleTask = useMutation(api.tasks.toggleTask);

  const isLoading = tasks === undefined;

  const handleToggleTask = async (id: Id<"tasks">) => {
    try {
      await toggleTask({ id });
    } catch (error) {
      console.log("Error toggling task", error);
      Alert.alert("Error", "Failed to toggle task");
    }
  }

  const renderTaskItem = ({ item }: { item: Task }) => {
    return (
      <View style={homeStyles.todoItemWrapper}>
        <LinearGradient
          colors={colors.gradients.surface}
          style={homeStyles.todoItem}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}>

          <TouchableOpacity
            style={homeStyles.checkbox}
            activeOpacity={0.7}
            onPress={() => handleToggleTask(item._id)}>
            <LinearGradient
              colors={item.isCompleted ? colors.gradients.success : colors.gradients.muted}
              style={[homeStyles.checkboxInner,
              { borderColor: item.isCompleted ? "transparent" : colors.border }]}>
              {item.isCompleted && <Ionicons name="checkmark" size={18} color="#fff" />}
            </LinearGradient>
          </TouchableOpacity>

          <View style={homeStyles.todoTextContainer}>
            <Text style={[
              homeStyles.todoText,
              item.isCompleted && {
                textDecorationLine: 'line-through',
                color: colors.textMuted,
                opacity: 0.6
              }
            ]}>
              {item.text}
            </Text>

            <View style={homeStyles.todoActions}>
              <TouchableOpacity onPress={() => {}} activeOpacity={0.8}>
                <LinearGradient colors={colors.gradients.warning} style={homeStyles.actionButton}>
                  <Ionicons name="pencil" size={14} color="#fff" />
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => {}} activeOpacity={0.8}>
                <LinearGradient colors={colors.gradients.danger} style={homeStyles.actionButton}>
                  <Ionicons name="trash" size={14} color="#fff" />
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>

        </LinearGradient>
      </View>
    )
  }

  if (isLoading) return <LoadingSpinner />

  return (
    <LinearGradient colors={colors.gradients.background} style={homeStyles.container}>
      <StatusBar barStyle={colors.statusBarStyle} />
      <SafeAreaView
        style={homeStyles.safeArea}
      >
        <Header />

        <TaskInput />

        <FlatList
          data={tasks}
          renderItem={renderTaskItem}
          keyExtractor={(item) => item._id}
          style={homeStyles.todoList}
          contentContainerStyle={homeStyles.todoListContent}
        />
      </SafeAreaView>
    </LinearGradient>
  );
}
