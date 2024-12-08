import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StorageService } from '../services/StorageService';
import { theme } from '../theme';

const TaskFormScreen = ({ navigation, route }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [taskId, setTaskId] = useState(null);

  useEffect(() => {
    if (route.params?.task) {
      const { task } = route.params;
      setTitle(task.title);
      setDescription(task.description || '');
      setIsEditing(true);
      setTaskId(task.id);
    }
  }, [route.params]);

  const handleSaveTask = async () => {
    if (!title.trim()) return;

    const taskData = {
      title: title.trim(),
      description: description.trim(),
      completed: false,
      id: isEditing ? taskId : Date.now()
    };

    try {
      if (isEditing) {
        await StorageService.updateTask(taskData);
      } else {
        await StorageService.addTask(taskData);
      }
      navigation.goBack();
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardContainer}
      >
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons 
              name="chevron-back" 
              size={24} 
              color={theme.colors.white} 
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>
            {isEditing ? 'Edit Task' : 'Add Task'}
          </Text>
        </View>

        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Task Title"
            value={title}
            onChangeText={setTitle}
            placeholderTextColor={theme.colors.gray}
          />

          <TextInput
            style={[styles.input, styles.multilineInput]}
            placeholder="Description (Optional)"
            value={description}
            onChangeText={setDescription}
            multiline
            placeholderTextColor={theme.colors.gray}
          />

          <TouchableOpacity 
            style={styles.saveButton}
            onPress={handleSaveTask}
            disabled={!title.trim()}
          >
            <Text style={styles.saveButtonText}>
              {isEditing ? 'Update Task' : 'Save Task'}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    marginTop: 40
  },
  keyboardContainer: {
    flex: 1
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg
  },
  backButton: {
    marginRight: theme.spacing.md
  },
  headerTitle: {
    color: theme.colors.white,
    fontSize: 20,
    fontWeight: 'bold'
  },
  formContainer: {
    flex: 1,
    padding: theme.spacing.lg
  },
  input: {
    backgroundColor: theme.colors.white,
    borderRadius: 10,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    fontSize: 16,
    color: theme.colors.text
  },
  multilineInput: {
    height: 120,
    textAlignVertical: 'top'
  },
  saveButton: {
    backgroundColor: theme.colors.accent,
    borderRadius: 10,
    padding: theme.spacing.md,
    alignItems: 'center',
    marginTop: theme.spacing.lg
  },
  saveButtonText: {
    color: theme.colors.white,
    fontSize: 16,
    fontWeight: 'bold'
  }
});

export default TaskFormScreen;