<template>
  <nav>
    <router-link to="/">Генератор формы</router-link> |
    <router-link to="/edit-user">Пример №1 Редактировать пользователя</router-link> |
    <router-link to="/profile-settings">Пример №2 Настройки профиля</router-link>
  </nav>
  <router-view />
</template>

<style scoped>
nav {
  padding: 1rem;
  background: #eee;
  text-align: center;
  a {
    margin: 0 10px;
  }
}
</style>
