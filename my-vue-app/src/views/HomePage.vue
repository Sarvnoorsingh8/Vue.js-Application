<template>
  <div>
    <h1 class="text-2xl mb-4">Task Manager</h1>
    <TaskList />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TaskList from "../components/TaskList.vue";

export default defineComponent({
  name: "HomePage",
  components: { TaskList },
});
</script>
