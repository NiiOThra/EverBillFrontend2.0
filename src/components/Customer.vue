<template>
    <div>
    <table class="table table-striped" style="text-align: center;">
    <thead>
    <tr>
        <th>
            Customer id
        </th>
        <th>
            Customer name
        </th>
        <th>
            Customer CVR-number
        </th>
        <th>
            Customer phonenumber
        </th>
        <th>
            Customer email
        </th>
        <th>
            Customer address
        </th>
    </tr>
</thead>
<tbody>
    <tr v-for="cus in customers" :key="cus">
        <td>{{cus.CustomerId}}</td>
        <td>{{cus.CustomerName}}</td>
        <td>{{cus.CustomerCVRnumber}}</td>
        <td>{{cus.CustomerPhoneNumber}}</td>
        <td>{{cus.CustomerEmail}}</td>
        <td>{{cus.CustomerAddress}}</td>
    </tr>
</tbody>
</table>
</div>

<br>
<div>
    <th style="text-align: center;">
        Tasks
    </th>
<table class="table table-striped" style="text-align: center;">
    <thead>
    <tr>
        <th>
            Service id
        </th>
        <th>
            Service name
        </th>
        <th>
            Service Price
        </th>
        <th>
            Service Qty
        </th>
        <th>
            Service total
        </th>
        <th>
            CustomerId
        </th>
    </tr>
</thead>
<tbody v-for="servcus in servicecustomer" :key="servcus.CustomerId">
    <tr>
        <td>{{ servcus.ServiceId }}</td>
        <td>{{ servcus.ServiceName }}</td>
        <td>{{ servcus.ServicePrice }}</td>
        <td>{{ servcus.ServiceQty }}</td>
        <td>{{ servcus.ServiceTotal }}</td>
        <td>{{ servcus.CustomerId }}</td>
    </tr>
</tbody>

</table>


<form @submit.prevent="submitForm">
    <td class="serviceName">Name:<input v-model="ServiceName" type="text" /></td>
    <td class="servicePrice">Price: <input type="text" v-model="ServicePrice"></td>
    <td class="serviceQty">Qty: <input type="text" v-model="ServiceQty"></td>
    <td class="customerId">CustomerId: <input type="text" v-model="CustomerId"></td>
    <td class="serviceTotal">Total: {{ (ServiceTotal = ServiceQty * ServicePrice) }} <button type="submit">Submit</button></td>
    
</form>

    

</div>


</template>

<script>
import axios from "axios"

const API_URL = "https://localhost:44326/api/"

export default {
    data() {
        return {
            CustomerId:this.$route.params.CustomerId,
            customers:[],
            services:[],
            servicecustomer:[],
            ServiceId:this.ServiceId,
            ServiceName:'',
            ServiceQty:'',
            ServicePrice:'',
            ServiceTotal:0,
            actualTotal:0
        };
    },
    mounted() {
        axios.get(API_URL+"customer/"+this.CustomerId)
        .then(response=> this.customers = response.data),
       
        axios.get(API_URL+"services")
        .then(response=> this.services = response.data)
        
        axios.get(API_URL+"servicecustomer/"+this.CustomerId)
        .then(response=> this.servicecustomer = response.data)
        
    },
    methods: {
        refreshCustomerData(){
            axios.get(API_URL+"services")
            .then((response) => {
                this.services = response.data;
            }); 
        },
        refreshServiceCustomerData(){
            axios.get(API_URL+"servicecustomer/"+this.CustomerId)
            .then((response) => {
                this.servicecustomer = response.data;
            }); 
        },
        async submitForm() {
            const data = {
                ServiceName: this.ServiceName,
                ServiceQty:this.ServiceQty,
                ServicePrice:this.ServicePrice,
                ServiceTotal:this.ServiceTotal,
                CustomerId:this.CustomerId
        };
        try {
            const response = await axios.post(API_URL+"services", data);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
        this.refreshCustomerData();
        this.refreshServiceCustomerData();
        this.ServiceName = ''
        this.ServiceQty = ''
        this.ServicePrice = ''
        this.ServiceTotal = 0
    },
        deleteService(ServiceId) {
            this.services = this.services.filter(serv => serv.ServiceId !== ServiceId)
    },

    }
}

</script>

<style>
.container {
    width:100%;
    max-width:1150px;
    border:2px solid black;
    margin: 0 auto;
    padding:10px;
}
.row {
    height:100px; /*set height*/
    border:2px solid black;
    width:auto;
    margin-bottom:10px;
    padding:15px;
}
.col3 {
    border:1.8px solid black;
    width:256.6px;
    float:left;
    height:100%;
    margin-right:2%;    
}
.col3:last-child {margin-right:0;  }
</style>