import { createRouter, createWebHashHistory} from 'vue-router'

import Home from '../src/components/Home.vue'
import Customers from '../src/components/Customers.vue'
import Customer from '../src/components/Customer.vue'


const routes = [
    {
        path: '/',
        name: 'Home', 
        component: Home
    },
    {
        path: '/customers',
        name: 'Customers',
        component: Customers
    },
    {
        path: '/customer/:CustomerId',
        name: 'Customer',
        component: Customer
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router