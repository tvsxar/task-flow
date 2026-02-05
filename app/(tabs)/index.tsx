import { createHomeStyles } from "@/assets/styles/home.styles";
import EmptyState from "@/components/EmptyState";
import Header from "@/components/Header";
import LoadingSpinner from "@/components/LoadingSpinner";
import TaskInput from "@/components/TaskInput";
import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import useTheme from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { useMutation, useQuery } from "convex/react";
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from "react";
import { Alert, FlatList, StatusBar, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Task = Doc<"tasks">;

export default function Index() {
  const { colors } = useTheme();
  const [editingId, setEditingId] = useState<Id<"tasks"> | null>(null);
  const [editText, setEditText] = useState("");

  const homeStyles = createHomeStyles(colors);

  const tasks = useQuery(api.tasks.getTasks);
  const toggleTask = useMutation(api.tasks.toggleTask);
  const deleteTask = useMutation(api.tasks.deleteTask);
  const updateTask = useMutation(api.tasks.updateTask);

  const isLoading = tasks === undefined;

  const handleToggleTask = async (id: Id<"tasks">) => {
    try {
      await toggleTask({ id });
    } catch (error) {
      console.log("Error toggling task", error);
      Alert.alert("Error", "Failed to toggle task");
    }
  }

  const handleDeleteTask = async (id: Id<"tasks">) => {
    Alert.alert("Delete Task", "Are you sure you want to delete this task?", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: () => deleteTask({ id }) },
    ])
  }

  const handleEditTask = (task: Task) => {
    setEditText(task.text);
    setEditingId(task._id);
  }
  const handleSaveEdit = async () => {
    if (editingId) {
      try {
        await updateTask({ id: editingId, text: editText.trim() });
        setEditText("");
        setEditingId(null);
      } catch (error) {
        console.log("Error updating task", error);
        Alert.alert("Error", "Failed to update task");
      }
    }
  }
  const handleCancelEdit = () => {
    setEditText("");
    setEditingId(null);
  }

  const renderTaskItem = ({ item }: { item: Task }) => {
    const isEditing = editingId === item._id;

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

          {isEditing ? (
            <View style={homeStyles.editContainer}>
              <TextInput
                style={homeStyles.editInput}
                value={editText}
                onChangeText={setEditText}
                autoFocus
                multiline
                placeholder="Edit your task..."
                placeholderTextColor={colors.textMuted}
              />

              <View style={homeStyles.editButtons}>
                <TouchableOpacity onPress={handleSaveEdit} activeOpacity={0.8}>
                  <LinearGradient colors={colors.gradients.success} style={homeStyles.editButton}>
                    <Ionicons name="checkmark" size={16} color="#fff" />
                    <Text style={homeStyles.editButtonText}>Save</Text>
                  </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleCancelEdit} activeOpacity={0.8}>
                  <LinearGradient colors={colors.gradients.muted} style={homeStyles.editButton}>
                    <Ionicons name="close" size={16} color="#fff" />
                    <Text style={homeStyles.editButtonText}>Cancel</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
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
                <TouchableOpacity onPress={() => handleEditTask(item)} activeOpacity={0.8}>
                  <LinearGradient colors={colors.gradients.warning} style={homeStyles.actionButton}>
                    <Ionicons name="pencil" size={14} color="#fff" />
                  </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => handleDeleteTask(item._id)} activeOpacity={0.8}>
                  <LinearGradient colors={colors.gradients.danger} style={homeStyles.actionButton}>
                    <Ionicons name="trash" size={14} color="#fff" />
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          )}

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
          ListEmptyComponent={<EmptyState />}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </LinearGradient>
  );
}
