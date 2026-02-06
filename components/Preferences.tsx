import { createSettingsStyles } from '@/assets/styles/settings.styles';
import useTheme from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { Switch, Text, View } from 'react-native';

const Preferences = () => {
    const [isAutoSync, setIsAutoSync] = useState(true);
    const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);

    const { colors, isDarkMode, toggleDarkMode } = useTheme();

    const settingsStyles = createSettingsStyles(colors);

    return (
        <LinearGradient colors={colors.gradients.surface} style={settingsStyles.section}>
            <Text style={settingsStyles.sectionTitle}>Preferences</Text>

            <View style={settingsStyles.settingItem}>
                <View style={settingsStyles.settingLeft}>
                    <LinearGradient style={settingsStyles.settingIcon} colors={colors.gradients.primary}>
                        <Ionicons name="moon" size={18} color="#fff" />
                    </LinearGradient>
                    <Text style={settingsStyles.settingText}>Dark Mode</Text>
                </View>

                <Switch value={isDarkMode} onValueChange={toggleDarkMode} thumbColor={"#fff"} />
            </View>

            <View style={settingsStyles.settingItem}>
                <View style={settingsStyles.settingLeft}>
                    <LinearGradient style={settingsStyles.settingIcon} colors={colors.gradients.warning}>
                        <Ionicons name="notifications" size={18} color="#fff" />
                    </LinearGradient>
                    <Text style={settingsStyles.settingText}>Notifications</Text>
                </View>

                <Switch value={isNotificationsEnabled} onValueChange={() => setIsNotificationsEnabled(!isNotificationsEnabled)} thumbColor={"#fff"} />
            </View>

            <View style={settingsStyles.settingItem}>
                <View style={settingsStyles.settingLeft}>
                    <LinearGradient style={settingsStyles.settingIcon} colors={colors.gradients.success}>
                        <Ionicons name="notifications" size={18} color="#fff" />
                    </LinearGradient>
                    <Text style={settingsStyles.settingText}>Auto Sync</Text>
                </View>

                <Switch value={isAutoSync} onValueChange={() => setIsAutoSync(!isAutoSync)} thumbColor={"#fff"} />
            </View>
        </LinearGradient>
    )
}

export default Preferences