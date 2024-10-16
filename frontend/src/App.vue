<script setup>
import { ref } from 'vue';
import CommentSection from './components/CommentSection.vue';

const config = useRuntimeConfig()

const userId = ref('');
const users = ref(null);
const newEmail = ref('');
const BASE_URL = config.public.API_BASE_URL ?? "http://localhost:3000";
console.log('API_BASE_URL:', BASE_URL);

const getUser = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/user/${userId.value}`);
    users.value = await response.json();
  } catch (error) {
    console.error('Failed to fetch user:', error);
    alert('Could not retrieve user information. Please try again.');
  }
};

const changeEmail = async () => {
  if (!userId.value) {
    alert('Please enter a User ID');
    return;
  }
  const response = await fetch(`${BASE_URL}/api/user/${userId.value}/change-email`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email: newEmail.value }),
  });

  if (response.ok) {
    alert('Email updated successfully');
  } else {
    alert('Failed to update email');
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
