<script setup>
</script>

<template>
  <nav class="navbar">
    <router-link to="/">Inicio</router-link>
    <router-link to="/estudiantes">Estudiantes</router-link>
    <router-link to="/asistencias">Asistencias</router-link>
  </nav>
  <router-view />
</template>

<style>
.navbar {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: #333;
}
.navbar a {
  color: white;
  text-decoration: none;
}
.navbar a:hover {
  color: #42b983;
}
</style>