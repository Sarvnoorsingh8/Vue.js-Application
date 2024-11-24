<template>
  <div>
    <p>
      <input type="checkbox" :checked="task.completed" @change="toggleTask" />
      {{ task.name }} - Priority: {{ task.priority }}
    </p>
    <button @click="removeTask">Remove</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "TaskItem",
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();

    const toggleTask = () => {
      store.dispatch("toggleTask", props.task.id);
    };

    const removeTask = () => {
      store.dispatch("removeTask", props.task.id);
    };

    return { toggleTask, removeTask };
  },
});
</script>

<style scoped>
button {
  margin-left: 10px;
  color: red;
}
</style>
