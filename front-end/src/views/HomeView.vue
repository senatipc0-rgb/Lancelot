<template>
  <div class="home">
    <h1>Sistema de Gestión de Asistencias</h1>
    <p>Bienvenido al sistema de gestión de asistencias estudiantiles</p>
    <nav>
      <router-link to="/estudiantes">Gestión de Estudiantes</router-link>
      <router-link to="/asistencias">Registro de Asistencias</router-link>
    </nav>
  </div>
</template>

<script setup>
</script>

<style scoped>
.home {
  text-align: center;
  padding: 2rem;
}
nav {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
}
nav a {
  background: #42b983;
  color: white;
  padding: 1rem 2rem;
  border-radius: 4px;
  text-decoration: none;
}
nav a:hover {
  background: #3aa876;
}
</style>