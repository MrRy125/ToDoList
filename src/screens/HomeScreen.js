import React, { useState, useCallback } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import TaskItem from '../components/TaskItem';
import { StorageService } from '../services/StorageService';
import { useFocusEffect } from '@react-navigation/native';
import { theme } from '../theme';

const HomeScreen = ({ navigation }) => {
  const [tasks, setTasks] = useState([]);

  useFocusEffect(
    useCallback(() => {
      loadTasks();
    }, [])
  );

  const loadTasks = async () => {
    const loadedTasks = await StorageService.getTasks();
    setTasks(loadedTasks);
  };

  const handleDeleteTask = async (taskId) => {
    const updatedTasks = await StorageService.deleteTask(taskId);
    setTasks(updatedTasks);
  };

  const handleToggleComplete = async (taskId) => {
    const taskToUpdate = tasks.find(task => task.id === taskId);
    const updatedTask = { 
      ...taskToUpdate, 
      completed: !taskToUpdate.completed 
    };
    const updatedTasks = await StorageService.updateTask(updatedTask);
    setTasks(updatedTasks);
  };

  const handleEditTask = (task) => {
    navigation.navigate('TaskForm', { task });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Todo List</Text>
        <TouchableOpacity 
          onPress={() => navigation.navigate('TaskForm')}
          style={styles.addButton}
        >
          <Ionicons 
            name="add" 
            size={24} 
            color={theme.colors.white} 
          />
        </TouchableOpacity>
      </View>

      {tasks.length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons 
            name="list-outline" 
            size={64} 
            color={theme.colors.gray} 
          />
          <Text style={styles.emptyStateText}>
            No tasks yet. Add a new task!
          </Text>
        </View>
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TaskItem
              task={item}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
              onToggleComplete={handleToggleComplete}
            />
          )}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    marginTop: 40
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.primary
  },
  headerTitle: {
    color: theme.colors.white,
    fontSize: 24,
    fontWeight: 'bold'
  },
  addButton: {
    backgroundColor: theme.colors.accent,
    borderRadius: 30,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  listContainer: {
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.md
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyStateText: {
    marginTop: theme.spacing.md,
    color: theme.colors.gray,
    fontSize: 16
  }
});

export default HomeScreen;