<template>
  <div>
    <TaskList />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TaskList from "../views/TaskList.vue";

export default defineComponent({
  name: "HomePage",
  components: { TaskList },
});
</script>
