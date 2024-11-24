<template>
  <div>
    <h3>Tasks Due Soon</h3>
    <div v-if="dueSoonTasks.length === 0">No upcoming tasks.</div>
    <ul v-else>
      <li v-for="task in dueSoonTasks" :key="task.id" class="due-task">
        {{ task.name }} - Due: {{ task.dueDate }}
      </li>
    </ul>

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
    <div v-if="filteredTasks.length === 0">No tasks available.</div>
    <div v-else>
      <TaskItem v-for="task in filteredTasks" :key="task.id" :task="task" />
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

    const setFilter = (newFilter: string) => {
      filter.value = newFilter;
    };

    // Filter tasks based on the selected filter
    const filteredTasks = computed(() => {
      return store.state.tasks.filter((task: { completed: boolean }) => {
        if (filter.value === "completed") return task.completed;
        if (filter.value === "pending") return !task.completed;
        return true;
      });
    });

    // Compute tasks due within the next day
    const dueSoonTasks = computed(() => {
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);

      return store.state.tasks.filter(
        (task: { dueDate: string; completed: boolean }) => {
          const dueDate = new Date(task.dueDate);
          return dueDate >= today && dueDate <= tomorrow && !task.completed;
        }
      );
    });

    return { filteredTasks, dueSoonTasks, setFilter, filter };
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
.due-task {
  color: red;
  font-weight: bold;
  list-style: none;
  margin-bottom: 5px;
}
</style>
