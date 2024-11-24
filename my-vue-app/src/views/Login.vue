<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="submitLogin">
      <div>
        <label for="username">Username:</label>
        <input
          id="username"
          v-model="username"
          placeholder="Enter your username"
        />
      </div>
      <div>
        <label for="password">Password:</label>
        <input
          id="password"
          type="password"
          v-model="password"
          placeholder="Enter your password"
        />
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "UserLogin", // Changed from "Login" to "UserLogin"
  setup() {
    const username = ref("");
    const password = ref("");

    const submitLogin = () => {
      console.log("Login submitted", {
        username: username.value,
        password: password.value,
      });
    };

    return { username, password, submitLogin };
  },
});
</script>

<style scoped>
/* Add your styles here */
form {
  margin: 20px;
}
label {
  display: block;
  margin-bottom: 5px;
}
input {
  margin-bottom: 15px;
  padding: 5px;
}
button {
  padding: 10px 15px;
  background-color: blue;
  color: white;
  border: none;
  cursor: pointer;
}
button:hover {
  background-color: darkblue;
}
</style>
