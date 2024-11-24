<template>
  <div>
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

    const filteredTasks = computed(() => {
      return store.state.tasks.filter((task: { completed: boolean }) => {
        if (filter.value === "completed") return task.completed;
        if (filter.value === "pending") return !task.completed;
        return true;
      });
    });

    return { filteredTasks, setFilter, filter };
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
</style>
