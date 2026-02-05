import { createHomeStyles } from '@/assets/styles/home.styles';
import { api } from '@/convex/_generated/api';
import useTheme from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import { useMutation } from 'convex/react';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { Alert, TextInput, TouchableOpacity, View } from 'react-native';

const TaskInput = () => {
    const { colors } = useTheme();
    const homeStyles = createHomeStyles(colors);
    const addTask = useMutation(api.tasks.addTask);
    const [newTask, setNewTask] = useState("");

    const handleAddTask = async () => {
        if (newTask.trim()) {
            try {
                await addTask({ text: newTask.trim() });
                setNewTask("");
            } catch (error) {
                console.log('Error adding a task', error)
                Alert.alert("Error", "Failed to add task");
            }
        }
    }

    return (
        <View style={homeStyles.inputSection}>
            <View style={homeStyles.inputWrapper}>
                <TextInput
                    style={homeStyles.input}
                    placeholder='What needs to be done?'
                    value={newTask}
                    onChangeText={setNewTask}
                    onSubmitEditing={handleAddTask}
                    multiline
                    placeholderTextColor={colors.textMuted} />

                <TouchableOpacity onPress={handleAddTask} activeOpacity={0.8} disabled={!newTask.trim()}>
                    <LinearGradient
                        colors={newTask.trim() ? colors.gradients.primary : colors.gradients.muted}
                        style={[homeStyles.addButton, !newTask.trim() && homeStyles.addButtonDisabled]}
                    >
                        <Ionicons name="add" size={24} color="#fff" />
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default TaskInput