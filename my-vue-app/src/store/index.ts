import { createStore } from "vuex";

export interface Task {
  id: number;
  name: string;
  priority: string;
  category: string;
  completed: boolean;
  dueDate: string;
  user?: string;
}

interface State {
  tasks: Task[];
  currentUser: string | null;
}

export default createStore<State>({
  state: {
    tasks: [],
    currentUser: "defaultUser",
  },
  mutations: {
    SET_USER(state, username: string) {
      state.currentUser = username;
    },
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
  },
  actions: {
    setUser({ commit }, username: string) {
      commit("SET_USER", username);
    },
    addTask({ commit, state }, task: Omit<Task, "id" | "user">) {
      if (state.currentUser) {
        const newTask: Task = {
          ...task,
          id: Date.now(),
          user: state.currentUser,
        };
        commit("ADD_TASK", newTask);
      }
    },
    removeTask({ commit }, id: number) {
      commit("REMOVE_TASK", id);
    },
    toggleTask({ commit }, id: number) {
      commit("TOGGLE_TASK", id);
    },
  },
  getters: {
    completedTasks(state): Task[] {
      return state.tasks.filter((task) => task.completed);
    },
    pendingTasks(state): Task[] {
      return state.tasks.filter((task) => !task.completed);
    },
    userTasks(state): Task[] {
      return state.tasks.filter((task) => task.user === state.currentUser);
    },
    tasksByCategory:
      (state) =>
      (category: string): Task[] => {
        return state.tasks.filter((task) => task.category === category);
      },
    tasksDueSoon(state): Task[] {
      const today = new Date();
      const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
      return state.tasks.filter((task) => {
        const dueDate = new Date(task.dueDate);
        return (
          dueDate >= today &&
          dueDate <= tomorrow &&
          task.user === state.currentUser &&
          !task.completed
        );
      });
    },
  },
});
