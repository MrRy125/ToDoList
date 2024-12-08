// src/components/TaskItem.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { theme } from '../theme';
import { Ionicons } from '@expo/vector-icons';

const TaskItem = ({ task, onEdit, onDelete, onToggleComplete }) => {
  return (
    <View style={[
      styles.container, 
      task.completed && styles.completedTask
    ]}>
      <TouchableOpacity 
        onPress={() => onToggleComplete(task.id)} 
        style={styles.checkboxContainer}
      >
        {task.completed ? (
          <Ionicons 
            name="checkmark-circle" 
            size={24} 
            color={theme.colors.accent} 
          />
        ) : (
          <Ionicons 
            name="ellipse-outline" 
            size={24} 
            color={theme.colors.gray} 
          />
        )}
      </TouchableOpacity>

      <View style={styles.textContainer}>
        <Text 
          style={[
            styles.taskTitle, 
            task.completed && styles.completedText
          ]}
        >
          {task.title}
        </Text>
        {task.description && (
          <Text 
            style={[
              styles.taskDescription, 
              task.completed && styles.completedText
            ]}
          >
            {task.description}
          </Text>
        )}
      </View>

      <View style={styles.actionContainer}>
        <TouchableOpacity 
          onPress={() => onEdit(task)} 
          style={styles.editButton}
        >
          <Ionicons 
            name="pencil" 
            size={20} 
            color={theme.colors.primary} 
          />
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => onDelete(task.id)} 
          style={styles.deleteButton}
        >
          <Ionicons 
            name="trash" 
            size={20} 
            color={theme.colors.danger} 
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    padding: theme.spacing.md,
    marginVertical: theme.spacing.xs,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  completedTask: {
    opacity: 0.5
  },
  checkboxContainer: {
    marginRight: theme.spacing.md
  },
  textContainer: {
    flex: 1,
    marginRight: theme.spacing.md
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.text
  },
  taskDescription: {
    fontSize: 14,
    color: theme.colors.gray
  },
  completedText: {
    textDecorationLine: 'line-through'
  },
  actionContainer: {
    flexDirection: 'row'
  },
  editButton: {
    marginRight: theme.spacing.sm
  }
});

export default TaskItem;