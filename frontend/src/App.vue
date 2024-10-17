<script setup>
import { ref } from 'vue';
import CommentSection from './components/CommentSection.vue';
import validator from 'validator';

const userId = ref('');
const users = ref(null);
const newEmail = ref('');
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const getUser = async () => {
  try {
    const response = await fetch(`/api/user/${userId.value}`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    users.value = await response.json();
  } catch (error) {
    logError(error);
    alert('Could not retrieve user information. Please try again.'); // User-friendly message
  }
};

const changeEmail = async () => {
  if (!userId.value) {
    alert('Please enter a User ID');
    return;
  }

  if (!validator.isEmail(newEmail.value)) {
    alert('Invalid email format');
    return;
  }

  try {
    const response = await fetch(`/api/user/${userId.value}/change-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: newEmail.value }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    alert('Email updated successfully');
  } catch (error) {
    logError(error);
    alert('Failed to update email. Please try again.'); // User-friendly message
  }
};
</script>

<template>
  <div id="app">
    <h1>User Dashboard</h1>
    <div>
      <input v-model="userId" placeholder="Enter User ID" />
      <button @click="getUser">Get User Info</button>
    </div>
    <div v-if="users">
      <template v-for="user in users">
        <h2>{{ user.name }}</h2>
        <p>Email: {{ user.email }}</p>
        <hr />
      </template>
    </div>
    <CommentSection />
    <form @submit.prevent="changeEmail">
      <h3>Change Email</h3>
      <input v-model="newEmail" placeholder="New Email" />
      <button type="submit">Submit</button>
    </form>
  </div>
</template>
