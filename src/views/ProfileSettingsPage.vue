<template>
  <div class="page">
    <h1>Настройки профиля</h1>

    <FormGenerator
      v-if="schema && model"
      :schema="schema"
      v-model="model"
      @save="handleSave"
      @cancel="handleCancel"
    />
    <div v-else>Загрузка формы...</div>
  </div>
</template>

<script>
import FormGenerator from '../components/FormGenerator.vue'

export default {
  name: 'ProfileSettingsPage',
  components: {
    FormGenerator
  },
  data () {
    return {
      schema: null,
      model: null
    }
  },
  created () {
    this.fetchForm()
  },
  methods: {
    async fetchForm () {
      // Симуляция API-запроса
      setTimeout(() => {
        this.schema = {
          username: {
            label: 'Имя пользователя',
            type: 'input',
            attrs: { placeholder: 'Введите имя пользователя' }
          },
          description: {
            label: 'Описание',
            type: 'textarea',
            attrs: { rows: 4 }
          },
          plan: {
            label: 'План подписки',
            type: 'select',
            attrs: { options: ['Free', 'Pro', 'Enterprise'] }
          },
          notifications: {
            label: 'Получать уведомления',
            type: 'checkbox',
            attrs: {}
          }
        }

        this.model = {
          username: 'qwerty',
          description: 'Люблю писать код.',
          plan: 'Pro',
          notifications: true
        }
      }, 1000) // имитация задержки ответа сервера
    },

    handleSave (data) {
      console.log('Сохраняем на сервер:', data)
      alert('Профиль обновлён!')
    },
    handleCancel () {
      alert('Изменения отменены.')
    }
  }
}
</script>
