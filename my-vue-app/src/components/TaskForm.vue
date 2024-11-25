<template>
  <form @submit.prevent="submitTask">
    <input v-model="taskName" placeholder="Enter task name" required />
    <select v-model="taskPriority" required>
      <option disabled value="">Select Priority</option>
      <option value="High">High</option>
      <option value="Medium">Medium</option>
      <option value="Low">Low</option>
    </select>
    <select v-model="taskCategory" required>
      <option disabled value="">Select Category</option>
      <option value="Work">Work</option>
      <option value="Personal">Personal</option>
      <option value="Shopping">Shopping</option>
    </select>
    <input type="date" v-model="taskDueDate" required />
    <button type="submit">Add Task</button>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "TaskForm",
  setup() {
    const store = useStore();
    const taskName = ref("");
    const taskPriority = ref("");
    const taskCategory = ref("");
    const taskDueDate = ref("");

    const submitTask = () => {
      if (
        taskName.value &&
        taskPriority.value &&
        taskCategory.value &&
        taskDueDate.value
      ) {
        store.dispatch("addTask", {
          name: taskName.value,
          priority: taskPriority.value,
          category: taskCategory.value,
          dueDate: taskDueDate.value,
          completed: false,
        });

        taskName.value = "";
        taskPriority.value = "";
        taskCategory.value = "";
        taskDueDate.value = "";
      } else {
        alert("Please fill out all fields.");
      }
    };

    return { taskName, taskPriority, taskCategory, taskDueDate, submitTask };
  },
});
</script>

<style scoped>
form {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
input,
select,
button {
  padding: 10px;
  font-size: 1rem;
}
button {
  cursor: pointer;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
}
button:hover {
  background-color: #0056b3;
}
</style>
