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
        <th>
            ProjectId
        </th>
    </tr>
</thead>
<tbody>
    <tr v-for="cus in customers" :key="cus.CustomerId">
        <td>{{cus.CustomerId}}</td>
        <td>{{cus.CustomerName}}</td>
        <td>{{cus.CustomerCVRnumber}}</td>
        <td>{{cus.CustomerPhoneNumber}}</td>
        <td>{{cus.CustomerEmail}}</td>
        <td>{{cus.CustomerAddress}}</td>
        <td>{{cus.ProjectId}}</td>
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
    
<tbody>
    
    <tr v-for="serv in services" :key="serv">
        <td class="serviceId">Id <input type="text" v-model="serv.ServiceId"></td>
        <td class="serviceName">Name <input type="text" v-model="serv.ServiceName"></td>
        <td class="servicePrice">Price <input type="text" v-model="serv.ServicePrice"></td>
        <td class="serviceQty">Qty <input type="text" v-model="serv.ServiceQty"></td>
        <td class="serviceTotal">Total: {{ (serv.ServiceTotal = serv.ServiceQty * serv.ServicePrice) }}</td>
        <td class="deleteService"><button @click="deleteService(serv.ServiceId)">Delete</button></td>
        
    </tr>

    <button @click="addNewServices">Add</button>
    
</tbody>

</table>

    

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
            ServiceId:this.ServiceId,
            ServiceName:'',
            ServiceQty:'',
            ServicePrice:0,
            ServiceTotal:0,
        };
    },
    mounted() {
        axios.get("https://localhost:44326/api/customer/"+this.CustomerId)
        .then(response=> this.customers = response.data),
       
        axios.get("https://localhost:44326/api/services")
        .then(response=> this.services = response.data)
        
    },
    methods: {
        refreshCustomerData(){
            axios.get(API_URL+"services")
            .then((response) => {
                this.services = response.data;
            }); 
        },
        addNewServices() {
            this.services.push({
                ServiceId:this.ServiceId,
                ServiceName:'',
                ServiceQty:'',
                ServicePrice:0,
                ServiceTotal:0 
            })
            console.log(this.services)     
        },
        deleteService(ServiceId) {
            this.services = this.services.filter(serv => serv.ServiceId !== ServiceId)
        }
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