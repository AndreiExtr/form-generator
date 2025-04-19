<template>
  <div class="page">
    <h1>Генератор форм</h1>
    <FormGenerator
      :schema="formSchema"
      v-model="formData"
      @submit="handleSave"
    />
  </div>
</template>

<script>
import FormGenerator from '../components/FormGenerator.vue'
import { mapActions } from 'vuex'

export default {
  name: 'FormPage',
  components: {
    FormGenerator
  },
  data () {
    return {
      formSchema: {
        name: {
          label: 'Имя',
          type: 'input',
          attrs: { placeholder: 'Введите имя' }
        },
        bio: {
          label: 'О себе',
          type: 'textarea',
          attrs: { rows: 5 }
        },
        role: {
          label: 'Роль',
          type: 'select',
          attrs: { options: ['Админ', 'Пользователь', 'Гость'] }
        },
        agree: {
          label: 'Согласие',
          type: 'checkbox',
          attrs: {}
        }
      },
      formData: {
        name: '',
        bio: '',
        role: '',
        agree: false
      }
    }
  },
  methods: {
    ...mapActions(['saveForm']),
    handleSave (data) {
      this.saveForm(data)
      alert('Форма сохранена!')
    }
  }
}
</script>

<style lang="scss">
.page {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 600px;
  margin: 2rem auto;
  padding: 1rem;
  border: 1px solid #aaaaaa;
  background-color: rgb(255, 255, 255);

  h1{
    font-weight: 700;
    font-size: 24px;
  }
}
</style>
