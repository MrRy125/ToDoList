import AsyncStorage from '@react-native-async-storage/async-storage';

export const StorageService = {
  // Create/Add Task
  async addTask(task) {
    try {
      const existingTasks = await this.getTasks();
      const newTasks = [...existingTasks, { ...task, id: Date.now() }];
      await AsyncStorage.setItem('tasks', JSON.stringify(newTasks));
      return newTasks;
    } catch (error) {
      console.error('Error adding task:', error);
      return [];
    }
  },

  // Read Tasks
  async getTasks() {
    try {
      const tasksJson = await AsyncStorage.getItem('tasks');
      return tasksJson ? JSON.parse(tasksJson) : [];
    } catch (error) {
      console.error('Error getting tasks:', error);
      return [];
    }
  },

  // Update Task
  async updateTask(updatedTask) {
    try {
      const existingTasks = await this.getTasks();
      const updatedTasks = existingTasks.map(task => 
        task.id === updatedTask.id ? updatedTask : task
      );
      await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
      return updatedTasks;
    } catch (error) {
      console.error('Error updating task:', error);
      return [];
    }
  },

  // Delete Task
  async deleteTask(taskId) {
    try {
      const existingTasks = await this.getTasks();
      const updatedTasks = existingTasks.filter(task => task.id !== taskId);
      await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
      return updatedTasks;
    } catch (error) {
      console.error('Error deleting task:', error);
      return [];
    }
  }
};