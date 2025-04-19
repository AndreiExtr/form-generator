<template>
  <form @submit.prevent="handleSubmit">
    <div v-for="(field, name) in schema" :key="name" class="field">
      <label :for="name">{{ field.label }}</label>

      <!-- Поле ввода для типа 'input' -->
      <input
        v-if="field.type === 'input'"
        :id="name"
        v-model="formData[name]"
        v-bind="field.attrs"
      />

      <!-- Текстовое поле для типа 'textarea' -->
      <textarea
        v-else-if="field.type === 'textarea'"
        :id="name"
        v-model="formData[name]"
        v-bind="field.attrs"
      />

      <!-- Выпадающий список для типа 'select' -->
      <select
        v-else-if="field.type === 'select'"
        :id="name"
        v-model="formData[name]"
      >
        <option v-for="option in field.attrs.options" :key="option" :value="option">
          {{ option }}
        </option>
      </select>

      <input
        v-else-if="field.type === 'checkbox'"
        type="checkbox"
        :id="name"
        v-model="formData[name]"
      />
    </div>

    <button type="submit">Сохранить</button>
  </form>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'FormGenerator',
  props: {
    // Схема, описывающая поля формы
    schema: {
      type: Object,
      required: true
    },
    // Модель данных для формы
    modelValue: {
      type: Object,
      required: true
    }
  },
  emits: ['update:modelValue', 'submit'], // События, которые компоненты могут излучать
  methods: {
    // Обработчик отправки формы
    ...mapActions(['saveForm']),
    handleSubmit () {
      console.log('Данные перед отправкой:', this.formData)
      this.saveForm(this.formData)
      this.$emit('submit', this.formData) // Отправка данных формы на родительский компонент
    }
  },
  computed: {
    ...mapGetters(['getFormData']),
    formData: {
      get () {
        return this.getFormData
      },
      set (val) {
        this.saveForm(val)
      }
    }
  }
}
</script>

<style scoped lang="scss">
form{
  display: flex;
  flex-direction: column;
}
.field {
  margin-bottom: 20px;

  label {
    display: block;
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 5px;
  }

  input,
  textarea,
  select {
    width: 100%;
    padding: 10px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
}

button {
  padding: 10px 20px;
  background-color: #cccccc;
  color: rgb(0, 0, 0);
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
    color: #ffffff;
  }
}
</style>
