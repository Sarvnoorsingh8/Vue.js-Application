<template>
  <div :class="theme">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
      <router-link to="/login">Login</router-link>
      <button @click="toggleTheme" class="theme-toggle">
        {{ theme === "light" ? "Dark Mode" : "Light Mode" }}
      </button>
    </nav>
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";

export default defineComponent({
  name: "App",
  setup() {
    const theme = ref("light");

    // Load theme from localStorage
    onMounted(() => {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) {
        theme.value = savedTheme;
      }
    });

    const toggleTheme = () => {
      theme.value = theme.value === "light" ? "dark" : "light";
      localStorage.setItem("theme", theme.value); // Save preference
    };

    return { theme, toggleTheme };
  },
});
</script>

<style>
/* Light Theme */
.light {
  --background-color: #ffffff;
  --text-color: #000000;
  --button-bg-color: #f0f0f0;
  --button-text-color: #000000;
}

/* Dark Theme */
.dark {
  --background-color: #1e1e1e;
  --text-color: #ffffff;
  --button-bg-color: #444444;
  --button-text-color: #ffffff;
}

/* Common Styles */
body,
html {
  margin: 0;
  padding: 0;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

#app {
  background-color: var(--background-color);
  color: var(--text-color);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

nav {
  padding: 1rem;
  background-color: var(--button-bg-color);
  color: var(--button-text-color);
  width: 100%;
  display: flex;
  justify-content: space-between;
}

nav a {
  color: var(--text-color);
  text-decoration: none;
  margin: 0 1rem;
}

nav a.router-link-exact-active {
  font-weight: bold;
}

.theme-toggle {
  background-color: var(--button-bg-color);
  color: var(--button-text-color);
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-radius: 5px;
}
</style>
