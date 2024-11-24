import { createStore } from "vuex";

interface Task {
  id: number;
  name: string;
  priority: string;
  dueDate: string;
  completed: boolean;
  category: string;
}

interface State {
  tasks: Task[];
}

export default createStore<State>({
  state: {
    tasks: [],
  },
  mutations: {
    ADD_TASK(state, task: Task) {
      state.tasks.push({
        ...task,
        id: Date.now(),
        completed: task.completed ?? false,
      });
    },
    REMOVE_TASK(state, id: number) {
      state.tasks = state.tasks.filter((task) => task.id !== id);
    },
    TOGGLE_TASK(state, id: number) {
      const task = state.tasks.find((task) => task.id === id);
      if (task) {
        task.completed = !task.completed;
      }
    },
    EDIT_TASK(state, updatedTask: Task) {
      const index = state.tasks.findIndex((task) => task.id === updatedTask.id);
      if (index !== -1) {
        state.tasks.splice(index, 1, updatedTask);
      }
    },
    SET_TASKS(state, tasks: Task[]) {
      state.tasks = tasks;
    },
  },
  actions: {
    addTask({ commit }, task: Task) {
      commit("ADD_TASK", task);
    },
    removeTask({ commit }, id: number) {
      commit("REMOVE_TASK", id);
    },
    toggleTask({ commit }, id: number) {
      commit("TOGGLE_TASK", id);
    },
    editTask({ commit }, updatedTask: Task) {
      commit("EDIT_TASK", updatedTask);
    },
    fetchTasksByCategory({ commit, state }, category: string) {
      const filteredTasks = state.tasks.filter(
        (task) => task.category === category
      );
      commit("SET_TASKS", filteredTasks);
    },
  },
  getters: {
    completedTasks(state): Task[] {
      return state.tasks.filter((task) => task.completed);
    },
    pendingTasks(state): Task[] {
      return state.tasks.filter((task) => !task.completed);
    },
    tasksByCategory:
      (state) =>
      (category: string): Task[] => {
        return state.tasks.filter((task) => task.category === category);
      },
  },
});
