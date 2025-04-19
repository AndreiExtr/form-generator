# Генератор форм

![img](/img/vuex.png)

## Общая структура компонента
```
<FormGenerator>
  ├── Props (входные данные):
  │    ├── schema: Object (описание полей формы)
  │    └── modelValue: Object (текущие значения формы)
  │
  ├── Данные:
  │    └── formData: Object (вычисляемое свойство, синхронизируется с Vuex)
  │
  ├── Events (события):
  │    ├── update:modelValue (обновление данных)
  │    └── submit (отправка формы)
  │
  ├── Methods:
  │    └── handleSubmit() → saveForm + emit('submit')
  │
  └── Template:
       ├── Форма (<form @submit.prevent>)
       │    ├── Динамические поля (v-for по schema)
       │    │    ├── input (текстовое поле)
       │    │    ├── textarea
       │    │    ├── select (выпадающий список)
       │    │    └── checkbox
       │    └── Кнопка отправки
       └── Привязка данных (v-model к formData)
```

## Поток данных

```
(1) Родительский компонент:
    │
    ├── Передает schema (структура формы).
    ├── Передает modelValue (начальные значения).
    │
(2) FormGenerator:
    │
    ├── Динамически рендерит поля на основе schema.
    ├── При изменении поля:
    │    ├── Обновляет formData (через v-model).
    │    └── Сохраняет в Vuex (saveForm).
    │
    └── При отправке формы:
         ├── Вызывает handleSubmit().
         ├── Сохраняет данные в Vuex.
         └── Отправляет событие submit родителю.
```

## Взаимодействие с Vuex

```
FormGenerator:
  ├── Получает данные: formData ← getFormData (из Vuex через mapGetters).
  ├── Сохраняет данные: saveForm → Vuex (через mapActions).
  └── Данные всегда синхронизированы с хранилищем.
```

## Пример объекта schema

```
schema: {
  email: {
    type: 'input',
    label: 'Email',
    attrs: { placeholder: 'user@example.com', type: 'email' }
  },
  message: {
    type: 'textarea',
    label: 'Сообщение',
    attrs: { rows: 5 }
  },
  country: {
    type: 'select',
    label: 'Страна',
    attrs: { options: ['Россия', 'Беларусь', 'Казахстан'] }
  },
  agree: {
    type: 'checkbox',
    label: 'Согласие на обработку данных'
  }
}
```