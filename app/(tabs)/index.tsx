import { createHomeStyles } from "@/assets/styles/home.styles";
import Header from "@/components/Header";
import LoadingSpinner from "@/components/LoadingSpinner";
import TaskInput from "@/components/TaskInput";
import { api } from "@/convex/_generated/api";
import useTheme from "@/hooks/useTheme";
import { useQuery } from "convex/react";
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { toggleDarkMode, colors } = useTheme();

  const homeStyles = createHomeStyles(colors);

  const tasks = useQuery(api.tasks.getTasks);

  const isLoading = tasks === undefined;

  if (isLoading) return <LoadingSpinner />

  return (
    <LinearGradient colors={colors.gradients.background} style={homeStyles.container}>
      <StatusBar barStyle={colors.statusBarStyle} />
      <SafeAreaView
        style={homeStyles.safeArea}
      >
        <Header />

        <TaskInput />

        {tasks?.map(task => (
          <Text key={task._id}>{task.text}</Text>
        ))}
      </SafeAreaView>
    </LinearGradient>
  );
}
