<script setup>
import { ref } from 'vue';
import validator from 'validator'; // Import DOMPurify

const comment = ref('');
const comments = ref('');

// Function to submit the comment
const submitComment = () => {
  // Sanitize the comment before adding it to the comments
  const sanitizedComment = validator.escape(comment.value);
  comments.value += `<p>${sanitizedComment}</p>`;
  comment.value = '';
};
</script>

<template>
  <div>
    <h3>Comments</h3>
    <input v-model="comment" placeholder="Leave a comment" />
    <button @click="submitComment">Submit</button>
    <div v-html="comments"></div>
  </div>
</template>
