<template>
  <div>
    <form @submit.prevent="submitTask" class="mb-4">
      <input
        v-model="taskName"
        placeholder="Enter task name"
        class="task-input border rounded p-2 mr-2"
      />
      <button
        type="submit"
        class="btn-add bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Task
      </button>
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
    const store = useStore();

    const submitTask = () => {
      if (taskName.value.trim() !== "") {
        store.dispatch("addTask", { name: taskName.value });
        taskName.value = "";
      }
    };

    return { taskName, submitTask };
  },
});
</script>

<style scoped>
.task-input {
  padding: 0.5rem;
  margin-right: 0.5rem;
}
.btn-add {
  padding: 0.5rem;
}
</style>
