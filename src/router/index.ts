import { createRouter, createWebHistory } from 'vue-router';
import OverviewView from '../views/OverviewView.vue';
import AnalyticsView from '../views/AnalyticsView.vue';
import UsersView from '../views/UsersView.vue';
import RevenueView from '../views/RevenueView.vue';
import ReportsView from '../views/ReportsView.vue';
import SettingsView from '../views/SettingsView.vue';
import OrdersView from '../views/OrdersView.vue';
import ChatView from '../views/ChatView.vue';
import EmailView from '../views/EmailView.vue';
import IntegrationsView from '../views/IntegrationsView.vue';
import MembersView from '../views/MembersView.vue';
import AccountView from '../views/AccountView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/overview'
    },
    {
      path: '/overview',
      name: 'overview',
      component: OverviewView,
      meta: { title: 'Overview' }
    },
    {
      path: '/analytics',
      name: 'analytics',
      component: AnalyticsView,
      meta: { title: 'Analytics' }
    },
    {
      path: '/users',
      name: 'users',
      component: UsersView,
      meta: { title: 'Users' }
    },
    {
      path: '/revenue',
      name: 'revenue',
      component: RevenueView,
      meta: { title: 'Revenue' }
    },
    {
      path: '/reports',
      name: 'reports',
      component: ReportsView,
      meta: { title: 'Reports' }
    },
    {
      path: '/settings',
      name: 'settings',
      component: SettingsView,
      meta: { title: 'Settings' }
    },
    {
      path: '/orders',
      name: 'orders',
      component: OrdersView,
      meta: { title: 'Orders' }
    },
    {
      path: '/chat',
      name: 'chat',
      component: ChatView,
      meta: { title: 'Chat' }
    },
    {
      path: '/email',
      name: 'email',
      component: EmailView,
      meta: { title: 'Email' }
    },
    {
      path: '/integrations',
      name: 'integrations',
      component: IntegrationsView,
      meta: { title: 'Integrations' }
    },
    {
      path: '/members',
      name: 'members',
      component: MembersView,
      meta: { title: 'Members' }
    },
    {
      path: '/account',
      name: 'account',
      component: AccountView,
      meta: { title: 'Account' }
    }
  ]
});

export default router;
