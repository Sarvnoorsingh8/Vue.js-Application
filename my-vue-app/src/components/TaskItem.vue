<template>
  <div
    class="task-item flex justify-between items-center mb-2 p-4 border rounded bg-gray-100"
  >
    <p
      class="text-sm"
      :class="{
        'text-green-600': task.completed,
        'text-red-600': !task.completed,
      }"
    >
      {{ task.name }}
    </p>
    <div>
      <button
        @click="toggleTask"
        class="mr-2 text-blue-500 border px-2 py-1 rounded"
      >
        Toggle
      </button>
      <button @click="removeTask" class="text-red-500 border px-2 py-1 rounded">
        Remove
      </button>
    </div>
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

    const removeTask = () => {
      store.dispatch("removeTask", props.task.id);
    };

    const toggleTask = () => {
      store.dispatch("toggleTask", props.task.id);
    };

    return { removeTask, toggleTask };
  },
});
</script>
