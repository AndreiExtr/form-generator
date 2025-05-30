# Генератор форм

Динамический компонент, который автоматически создает HTML-форму на основе переданной схемы (schema). Он поддерживает разные типы полей (текст, выбор, чекбоксы и т.д.), синхронизирует данные с хранилищем (Vuex) и родительским компонентом, а также обрабатывает отправку формы.

Ключевые особенности:
- Гибкость
  - Форма генерируется автоматически на основе конфигурации (schema), без жесткого HTML.
  - Поддерживаются основные типы полей: input, textarea, select, checkbox.

- Интеграция с Vuex
  - Данные формы хранятся и управляются через хранилище (getters/actions).
  - Изменения полей сразу сохраняются в Vuex.

- Двусторонняя связь
  - Использует v-model для синхронизации данных с родительским компонентом.
  - Отправляет событие submit с готовыми данными при сохранении.

- Простота расширения
  - Можно добавить новые типы полей (например, radio, datepicker).
  - Легко подключить валидацию или условный рендеринг полей.

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