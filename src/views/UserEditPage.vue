<template>
  <div class="page">
    <h1>Редактирование пользователя</h1>
    <FormGenerator
      :schema="editUserSchema"
      @save="handleEditSave"
      @cancel="handleEditCancel"
    />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import FormGenerator from '../components/FormGenerator.vue'

export default {
  name: 'UserEditPage',
  components: {
    FormGenerator
  },
  data () {
    return {
      editUserSchema: {
        login: {
          label: 'Логин',
          type: 'input',
          attrs: { placeholder: 'Введите логин' }
        },
        email: {
          label: 'Email',
          type: 'input',
          attrs: { type: 'email', placeholder: 'Введите email' }
        }
      }
    }
  },
  methods: {
    ...mapActions(['saveForm']),
    handleEditSave (data) {
      this.saveForm(data)
      alert('Пользователь сохранён!')
    },
    handleEditCancel () {
      alert('Редактирование отменено!')
    }
  }
}
</script>
