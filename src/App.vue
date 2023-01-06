<template>
  <div id="app" class="container">
        <h3 class="d-flex justify-content-center">
            <img src="./assets/everbill_logo.png" alt="">
        </h3>

        <nav class="navbar navbar-expand-sm justify-content-center" style="margin-bottom: 20px;">
            <ul class="navbar-nav">
                <li class="nav-item m-1">
                    <router-link class="btn btn-outline-primary" to="/">Customers</router-link>
                </li>
                <li class="nav-item m-1">
                    <router-link class="btn btn-outline-primary" to="/charts">Charts</router-link>
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
import Charts from './components/Charts.vue'
import Services from './components/Services.vue'
import Customers from './components/Customers.vue'
import SingleCustomerPage from './components/SingleCustomerPage.vue'

export default {
  name: 'App',
  components: {
    Charts,
    Services,
    Customers,
    SingleCustomerPage    
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
  margin-top: 50px;
}

.rl {
  align-content: left;
}

img {
  width: 500px;
}
</style>
