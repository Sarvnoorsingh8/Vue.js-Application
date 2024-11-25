<template>
  <div>
    <h1>Task Manager</h1>

    <h3>Tasks Due Soon</h3>
    <div v-if="tasksDueSoon.length === 0">No tasks are due soon.</div>
    <ul v-else>
      <li v-for="task in tasksDueSoon" :key="task.id">
        {{ task.name }} - Due: {{ task.dueDate }}
      </li>
    </ul>

    <h3>Task Categories</h3>
    <div>
      <label for="categoryFilter">Filter by Category:</label>
      <select id="categoryFilter" v-model="selectedCategory">
        <option value="All">All</option>
        <option
          v-for="category in uniqueCategories"
          :key="category"
          :value="category"
        >
          {{ category }}
        </option>
      </select>
    </div>

    <h3>Task Progress</h3>
    <div class="progress-bar-container">
      <div
        class="progress-bar"
        :style="{ width: `${progressPercentage}%` }"
      ></div>
    </div>
    <p>{{ progressPercentage.toFixed(1) }}% of tasks completed</p>

    <TaskForm />

    <h3>Task List</h3>
    <div v-if="filteredTasksByCategory.length === 0">No tasks available.</div>
    <div v-else>
      <div v-for="(tasks, category) in groupedTasksByCategory" :key="category">
        <h4>{{ category }}</h4>
        <TaskItem v-for="task in tasks" :key="task.id" :task="task" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import { useStore } from "vuex";
import TaskForm from "@/components/TaskForm.vue";
import TaskItem from "@/components/TaskItem.vue";
import { Task } from "@/store"; // Import the Task interface

export default defineComponent({
  name: "TaskList",
  components: { TaskForm, TaskItem },
  setup() {
    const store = useStore();
    const filter = ref<string>("all");
    const selectedCategory = ref<string>("All");

    const tasksDueSoon = computed<Task[]>(() => store.getters.tasksDueSoon);

    const setFilter = (newFilter: string) => {
      filter.value = newFilter;
    };

    const uniqueCategories = computed<string[]>(() => {
      return Array.from(
        new Set(store.getters.userTasks.map((task: Task) => task.category))
      );
    });

    const filteredTasksByCategory = computed<Task[]>(() => {
      return store.getters.userTasks.filter((task: Task) => {
        const matchesCategory =
          selectedCategory.value === "All" ||
          task.category === selectedCategory.value;

        if (filter.value === "completed")
          return task.completed && matchesCategory;
        if (filter.value === "pending")
          return !task.completed && matchesCategory;
        return matchesCategory;
      });
    });

    const groupedTasksByCategory = computed(() =>
      filteredTasksByCategory.value.reduce<Record<string, Task[]>>(
        (groups, task: Task) => {
          if (!groups[task.category]) groups[task.category] = [];
          groups[task.category].push(task);
          return groups;
        },
        {}
      )
    );

    const progressPercentage = computed<number>(() => {
      const totalTasks = store.getters.userTasks.length;
      const completedTasks = store.getters.userTasks.filter(
        (task: Task) => task.completed
      ).length;
      return totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;
    });

    return {
      tasksDueSoon,
      uniqueCategories,
      filteredTasksByCategory,
      groupedTasksByCategory,
      progressPercentage,
      setFilter,
      filter,
      selectedCategory,
    };
  },
});
</script>

<style scoped>
button {
  margin: 5px;
  padding: 5px 10px;
}
button.active {
  background-color: blue;
  color: white;
}
.progress-bar-container {
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  height: 20px;
  width: 100%;
  margin-bottom: 10px;
  border-radius: 5px;
}
.progress-bar {
  height: 100%;
  background-color: #4caf50;
  border-radius: 5px;
  transition: width 0.3s ease;
}
</style>
