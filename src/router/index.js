import { createRouter, createWebHistory } from 'vue-router'
import FormPage from '../views/FormPage.vue'
import UserEditPage from '../views/UserEditPage.vue'
import ProfileSettingsPage from '../views/ProfileSettingsPage.vue'

const routes = [
  {
    path: '/',
    name: 'FormPage',
    component: FormPage
  },
  {
    path: '/edit-user',
    name: 'UserEditPage',
    component: UserEditPage
  },
  {
    path: '/profile-settings',
    name: 'ProfileSettings',
    component: ProfileSettingsPage
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
