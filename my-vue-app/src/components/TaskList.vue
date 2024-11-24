<template>
  <div>
    <h3 class="text-xl mb-4">Task List</h3>
    <TaskForm />
    <div class="mb-4">
      <button
        @click="setFilter('all')"
        class="p-2"
        :class="{ 'bg-blue-500 text-white': filter === 'all' }"
      >
        All
      </button>
      <button
        @click="setFilter('completed')"
        class="p-2"
        :class="{ 'bg-blue-500 text-white': filter === 'completed' }"
      >
        Completed
      </button>
      <button
        @click="setFilter('pending')"
        class="p-2"
        :class="{ 'bg-blue-500 text-white': filter === 'pending' }"
      >
        Pending
      </button>
    </div>
    <div v-if="filteredTasks.length === 0">No tasks available.</div>
    <div v-else>
      <TaskItem v-for="task in filteredTasks" :key="task.id" :task="task" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { useStore } from "vuex";
import TaskForm from "./TaskForm.vue";
import TaskItem from "./TaskItem.vue";

export default defineComponent({
  name: "TaskList",
  components: { TaskForm, TaskItem },
  setup() {
    const store = useStore();
    const filter = ref("all");

    const tasks = computed(() => store.state.tasks);

    const filteredTasks = computed(() => {
      if (filter.value === "completed") {
        return tasks.value.filter(
          (task: { completed: boolean }) => task.completed
        );
      }
      if (filter.value === "pending") {
        return tasks.value.filter(
          (task: { completed: boolean }) => !task.completed
        );
      }
      return tasks.value;
    });

    const setFilter = (newFilter: string) => {
      filter.value = newFilter;
    };

    return { tasks, filteredTasks, filter, setFilter };
  },
});
</script>

<style scoped>
button {
  margin-right: 0.5rem;
}
</style>
