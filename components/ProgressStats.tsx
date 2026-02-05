import { createSettingsStyles } from '@/assets/styles/settings.styles';
import { api } from '@/convex/_generated/api';
import useTheme from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import { useQuery } from 'convex/react';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Text, View } from 'react-native';

const ProgressStats = () => {
    const { colors } = useTheme();
    const settingsStyles = createSettingsStyles(colors);
    const tasks = useQuery(api.tasks.getTasks);
    const totalTasks = tasks ? tasks.length : 0;
    const completedTasks = tasks ? tasks.filter(task => task.isCompleted).length : 0;
    const activeTasks = totalTasks - completedTasks;

    return (
        <LinearGradient style={settingsStyles.section} colors={colors.gradients.surface}>
            <Text style={settingsStyles.sectionTitle}>Progress Stats</Text>

            <View style={settingsStyles.statsContainer}>
                <LinearGradient
                    colors={colors.gradients.background}
                    style={[settingsStyles.statCard, { borderLeftColor: colors.primary }]}>
                    <View style={settingsStyles.statIconContainer}>
                        <LinearGradient style={settingsStyles.statIcon} colors={colors.gradients.primary}>
                            <Ionicons name="list" size={20} color="#fff" />
                        </LinearGradient>
                    </View>

                    <View>
                        <Text style={settingsStyles.statNumber}>{totalTasks}</Text>
                        <Text style={settingsStyles.statLabel}>Total Tasks</Text>
                    </View>
                </LinearGradient>

                <LinearGradient
                    colors={colors.gradients.background}
                    style={[settingsStyles.statCard, { borderLeftColor: colors.success }]}>
                    <View style={settingsStyles.statIconContainer}>
                        <LinearGradient style={settingsStyles.statIcon} colors={colors.gradients.success}>
                            <Ionicons name="checkmark-circle" size={20} color="#fff" />
                        </LinearGradient>
                    </View>

                    <View>
                        <Text style={settingsStyles.statNumber}>{completedTasks}</Text>
                        <Text style={settingsStyles.statLabel}>Completed</Text>
                    </View>
                </LinearGradient>

                <LinearGradient
                    colors={colors.gradients.background}
                    style={[settingsStyles.statCard, { borderLeftColor: colors.warning }]}>
                    <View style={settingsStyles.statIconContainer}>
                        <LinearGradient style={settingsStyles.statIcon} colors={colors.gradients.warning}>
                            <Ionicons name="time" size={20} color="#fff" />
                        </LinearGradient>
                    </View>

                    <View>
                        <Text style={settingsStyles.statNumber}>{activeTasks}</Text>
                        <Text style={settingsStyles.statLabel}>Active</Text>
                    </View>
                </LinearGradient>
            </View>
        </LinearGradient>
    )
}

export default ProgressStats