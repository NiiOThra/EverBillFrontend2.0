import { createRouter, createWebHashHistory} from 'vue-router'

import Customers from '../src/components/Customers.vue'
import SingleCustomerPage from '../src/components/SingleCustomerPage.vue'
import Charts from '../src/components/Charts.vue'


const routes = [
    {
        path: '/',
        name: 'Customers',
        component: Customers
    },
    {
        path: '/customer/:CustomerId',
        name: 'Customer',
        component: SingleCustomerPage
    },
    {
        path: '/charts',
        name: 'Charts',
        component: Charts
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router