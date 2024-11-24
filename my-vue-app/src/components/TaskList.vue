<template>
  <div>
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

    <h3>Task List</h3>
    <TaskForm />
    <div>
      <button @click="setFilter('all')" :class="{ active: filter === 'all' }">
        All
      </button>
      <button
        @click="setFilter('completed')"
        :class="{ active: filter === 'completed' }"
      >
        Completed
      </button>
      <button
        @click="setFilter('pending')"
        :class="{ active: filter === 'pending' }"
      >
        Pending
      </button>
    </div>

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
import TaskForm from "./TaskForm.vue";
import TaskItem from "./TaskItem.vue";

export default defineComponent({
  name: "TaskList",
  components: { TaskForm, TaskItem },
  setup() {
    const store = useStore();
    const filter = ref("all");
    const selectedCategory = ref("All");

    const setFilter = (newFilter: string) => {
      filter.value = newFilter;
    };

    const uniqueCategories = computed(() => {
      const categories = store.state.tasks.map(
        (task: { category: string }) => task.category
      );
      return Array.from(new Set(categories));
    });

    const filteredTasksByCategory = computed(() => {
      return store.state.tasks.filter(
        (task: { completed: boolean; category: string }) => {
          const matchesCategory =
            selectedCategory.value === "All" ||
            task.category === selectedCategory.value;
          if (filter.value === "completed")
            return task.completed && matchesCategory;
          if (filter.value === "pending")
            return !task.completed && matchesCategory;
          return matchesCategory;
        }
      );
    });

    const groupedTasksByCategory = computed(() => {
      return filteredTasksByCategory.value.reduce(
        (groups: Record<string, any[]>, task: { category: string }) => {
          if (!groups[task.category]) groups[task.category] = [];
          groups[task.category].push(task);
          return groups;
        },
        {}
      );
    });

    // Progress bar calculation
    const progressPercentage = computed(() => {
      const totalTasks = store.state.tasks.length;
      const completedTasks = store.state.tasks.filter(
        (task: { completed: boolean }) => task.completed
      ).length;
      return totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;
    });

    return {
      groupedTasksByCategory,
      uniqueCategories,
      filteredTasksByCategory,
      setFilter,
      filter,
      selectedCategory,
      progressPercentage,
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
