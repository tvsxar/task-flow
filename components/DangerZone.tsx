import { createSettingsStyles } from '@/assets/styles/settings.styles';
import { api } from '@/convex/_generated/api';
import useTheme from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import { useMutation } from 'convex/react';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';

const DangerZone = () => {
    const { colors } = useTheme();

    const settingsStyles = createSettingsStyles(colors);

    const clearAllTasks = useMutation(api.tasks.deleteAllTasks);
    const handleResetApp = async () => {
        Alert.alert(
            "Reset App",
            "This will delete ALL yout tasks permanently. This action cannot be undone.",
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: "Delete All",
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            const result = await clearAllTasks();
                            Alert.alert(
                                "App Reset",
                                `Succesfully deleted ${result.deletedCount} task${result.deletedCount === 1 ? "" : "s"}. Your app has been reset.`
                            )
                        } catch (err) {
                            console.log("Error deleting all tasks", err);
                            Alert.alert("Error", "Failed to reset app");
                        }
                    }
                }
            ]
        )
    }
    return (
        <LinearGradient colors={colors.gradients.surface} style={settingsStyles.section}>
            <Text style={settingsStyles.sectionTitleDanger}>DangerZone</Text>

            <TouchableOpacity
                style={[settingsStyles.actionButton, { borderBottomWidth: 0 }]}
                onPress={handleResetApp}
                activeOpacity={0.7}>

                <View style={settingsStyles.actionLeft}>
                    <LinearGradient colors={colors.gradients.danger} style={settingsStyles.actionIcon}>
                        <Ionicons name="trash" size={18} color="#fff" />
                    </LinearGradient>

                    <Text style={settingsStyles.actionTextDanger}>Reset App</Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
            </TouchableOpacity>
        </LinearGradient>
    )
}

export default DangerZone