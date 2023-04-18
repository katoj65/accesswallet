import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue';
import RegisterPage from '../views/RegisterPage.vue';
import LoginPage from '../views/LoginPage.vue';
import Tab4Page from '../views/Tab4Page.vue';
import ForexPage from '../views/ForexPage.vue';
import DependentPage from '../views/DependentPage.vue';
import ProfilePage from '../views/ProfilePage.vue';
import NotificationPage from '../views/NotificationPage.vue';
import SendMoneyPage from '../views/SendMoneyPage.vue';
import CulculatorPage from '../views/CulculatorPage.vue';
import ExchangeRatePage from '../views/ExchangeRatePage.vue';
import SettingsPage from '../views/SettingsPage.vue';
import EditProfilePage from '../views/EditProfilePage.vue';
import ShowDependentPage from '../views/ShowDependentPage.vue';
import CreateDependentPage from '../views/CreateDependentPage.vue';
import SendToDependentPage from '../views/SendToDependentPage.vue';
import DependentWalletPage from '../views/DependentWalletPage.vue';
import DependentSchedulePage from '../views/DependentSchedulePage.vue';
import SearchPage from '../views/SearchPage.vue';





// redirect:'/tabs/tab1'
const routes: Array<RouteRecordRaw> = [
{
path:'/',
redirect:'/tabs/tab1'
}
,
{
path: '/tabs/',
component: TabsPage,
children: [
{
path: '',
redirect: '/tabs/tab1'
},
{
path: 'tab1',
component: () => import('@/views/Tab1Page.vue')
},
{
path: 'tab2',
component: () => import('@/views/Tab2Page.vue')
},
{
path: 'tab3',
component: () => import('@/views/Tab3Page.vue')
},
{
path: 'tab4',
component: Tab4Page
},



]
},

{
path:'/register',
component:RegisterPage
},
{
path:'/login',
component:LoginPage
},
{
path:'/send-money',
component:SendMoneyPage
},
{
path:'/culiculator',
component:CulculatorPage

},
{
path:'/profile',
component:ProfilePage
},
{
path:'/settings',
component:SettingsPage
},
{
path: '/trade-forex',
component: ForexPage
},
{
path:'/notifications',
component:NotificationPage
},
{
path:'/dependents',
component:DependentPage

},
{
path:'/exchange-rates',
component:ExchangeRatePage
},
{
path:'/edit-profile',
component:EditProfilePage
},
{
path:'/dependent/:id',
component:ShowDependentPage
},
{
path:'/dependent/create',
component:CreateDependentPage
},

{
path:'/dependent-send/:id',
component:SendToDependentPage
},
{
path:'/dependent-wallet/:id',
component:DependentWalletPage
},

{
path:'/dependent-schedule/:id',
component:DependentSchedulePage
},
{
path:'/search',
component:SearchPage
}

]

const router = createRouter({
history: createWebHistory(process.env.BASE_URL),
routes
})

export default router
