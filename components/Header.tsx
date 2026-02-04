import { createHomeStyles } from '@/assets/styles/home.styles';
import { api } from '@/convex/_generated/api';
import useTheme from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import { useQuery } from 'convex/react';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Text, View } from 'react-native';

const Header = () => {
    const { colors } = useTheme();

    const homeStyles = createHomeStyles(colors);

    const tasks = useQuery(api.tasks.getTasks);

    const completedCount = tasks ? tasks.filter(task => task.isCompleted).length : 0;
    const totalCount = tasks ? tasks.length : 0;

    const progressPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

    return (
        <View style={homeStyles.header}>
            <View style={homeStyles.titleContainer}>
                <LinearGradient colors={colors.gradients.primary} style={homeStyles.iconContainer}>
                    <Ionicons name='flash-outline' size={28} color='#ffffff' />
                </LinearGradient>

                <View style={homeStyles.titleTextContainer}>
                    <Text style={homeStyles.title}>Today&apos;s Tasks 👀</Text>
                    <Text style={homeStyles.subtitle}>
                        {completedCount} of {totalCount} completed
                    </Text>
                </View>
            </View>

            {totalCount > 0 && (
                <View style={homeStyles.progressContainer}>
                    <View style={homeStyles.progressBarContainer}>
                        <View style={homeStyles.progressBar}>
                            <LinearGradient
                            colors={colors.gradients.success}
                            style={[homeStyles.progressFill, { width: `${progressPercentage}%`}]} />
                        </View>

                        <Text style={homeStyles.progressText}>
                            {Math.round(progressPercentage)}%
                        </Text>
                    </View>
                </View>
            )}
        </View>
    )
}

export default Header