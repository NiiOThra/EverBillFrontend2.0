<template>
  <div id="app" class="container">
        <h3 class="d-flex justify-content-center" style="margin-top: 45px;">
            EverBill - Vue
        </h3>
        <h5 class="d-flex justify-content-center" style="margin-bottom: 10px;">
            Billing Portal
        </h5>

        <nav class="navbar navbar-expand-sm justify-content-center" style="margin-bottom: 20px;">
            <ul class="navbar-nav">
                <li class="nav-item m-1">
                    <router-link class="btn btn-outline-primary" to="/">Home</router-link>
                </li>
                <li class="nav-item m-1">
                    <router-link class="btn btn-outline-primary" to="/customers">Customers</router-link>
                </li>
                <!--<li class="nav-item m-1">
                    <router-link class="btn btn-outline-primary" to="/services">Services</router-link>
                </li>
                <li class="nav-item m-1">
                    <router-link class="btn btn-outline-primary" to="/customer/:CustomerId">Calculate bill</router-link>
                </li>-->
            </ul>
        </nav>
        <router-view></router-view>
    </div>
</template>

<script>
import axios from "axios"
import HelloWorld from './components/HelloWorld.vue'
import Home from './components/Home.vue'
import Services from './components/Services.vue'
import Customers from './components/Customers.vue'
import Customer from './components/Customer.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
    Home,
    Services,
    Customers,
    Customer    
  },
  data() {
    return {
      title: 'EverBill',
      subTitle: 'Billing Portal'
    }
  },
  async mounted() {
    await axios.get("https://localhost:44326/api/"+"customer/")
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.rl {
  align-content: left;
}
</style>
