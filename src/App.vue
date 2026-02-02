<template>
  <router-view />
</template>

<script setup lang="ts">
console.log('My API URL is:', process.env.VITE_APP_BASE_URL);
</script>
