<template>
  <div>
    <form @submit.prevent="submitTask">
      <input
        v-model="taskName"
        placeholder="Enter task name"
        class="task-input"
      />
      <select v-model="taskPriority" class="priority-select">
        <option disabled value="">Select Priority</option>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
      <button type="submit" class="btn-add">Add Task</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "TaskForm",
  setup() {
    const taskName = ref("");
    const taskPriority = ref("");

    const store = useStore();

    const submitTask = () => {
      if (taskName.value.trim() && taskPriority.value) {
        store.dispatch("addTask", {
          name: taskName.value,
          priority: taskPriority.value,
        });
        taskName.value = "";
        taskPriority.value = "";
      }
    };

    return { taskName, taskPriority, submitTask };
  },
});
</script>

<style scoped>
.task-input {
  padding: 0.5rem;
  margin-right: 0.5rem;
}
.priority-select {
  margin-right: 0.5rem;
  padding: 0.5rem;
}
.btn-add {
  padding: 0.5rem;
}
</style>
