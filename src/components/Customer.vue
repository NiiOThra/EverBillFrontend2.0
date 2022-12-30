<template>
    <h3 class="head3">Customer</h3>
    <div>
    <table class="table table-bordered" style="text-align: center;">
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
<h3 class="head3">Services</h3>
<div>
    
<table class="table table-bordered" style="text-align: center;">
    <thead>
        
    <tr>
        <th>
            Service id
        </th>
        <th>
            Service
        </th>
        <th>
            Price (DKK)
        </th>
        <th>
            Quantity
        </th>
        <th>
            Total price
        </th>
        <th>
            CustomerId
        </th>
        <th>
            Options
        </th>
    </tr>
</thead>
<tbody v-for="servcus in servicecustomer" :key="servcus.CustomerId" class="servicesTable">
    <tr class="serviceTr">
        <td>{{ servcus.ServiceId }}</td>
        <td>{{ servcus.ServiceName }}</td>
        <td>{{ servcus.ServicePrice }}</td>
        <td>{{ servcus.ServiceQty }}</td>
        <td>{{ servcus.ServiceTotal }}</td>
        <td>{{ servcus.CustomerId }}</td>
        <td>
            <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#serviceModal" @click="editClick(servcus)">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                </svg>
            </button>
            <button type="button" class="btn" @click="deleteClick(servcus.ServiceId)">
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                </svg>
            </button>

        </td>
    </tr>
    
</tbody>

    
</table>
<table class="table table-striped" style="text-align: center;">
        <tr>
            <td v-for="servsum in servicesum" :key="servsum" class="totalBill">
                Total bill price: {{ servsum.Total }}
            </td>
        </tr>
</table>


<form @submit.prevent="submitForm" class="form">
    <table class="table table-striped" style="text-align: center;">
    <td class="serviceName">Service name: <br><input v-model="ServiceName" type="text" /></td>
    <td class="servicePrice">Service price: <br><input type="text" v-model="ServicePrice"></td>
    <td class="serviceQty">Quantity: <br><input type="text" v-model="ServiceQty"></td>
    <td class="serviceTotal">Total: <br>{{ (ServiceTotal = ServiceQty * ServicePrice) }}</td> 
    <td><button type="submit" class="btn btn-primary">Submit</button></td>
    </table>
</form>


</div>

<div class="modal fade" id="serviceModal" tabindex="-1" aria-labelledby="serviceModalLabel" aria-hidden="true">
<div class="modal-dialog modal-lg modal-dialog-centered">
<div class="modal-content">
    <div class="modal-header">
        <h5 class="modal-title" id="serviceModalLabel">{{serviceModalTitle}}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>

    <div class="modal-body">

        <div class="input-group mb-3">
            <span class="input-group-text">Service name</span>
            <input type="text" class="form-control" v-model="EditServiceName">
        </div>
        <div class="input-group mb-3">
            <span class="input-group-text">Service price</span>
            <input type="text" class="form-control" v-model="EditServicePrice">
        </div>
        <div class="input-group mb-3">
            <span class="input-group-text">Quantity</span>
            <input type="text" class="form-control" v-model="EditServiceQty">
        </div>
        <div class="input-group mb-3">
            <span class="input-group-text">Total: {{ (EditServiceTotal = EditServiceQty * EditServicePrice) }} </span>
        </div>
        
        <button type="button" @click="updateClick()" v-if="ServiceId!=0" class="btn btn-primary">Update</button>
    </div>
</div>
</div>
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
            servicesum:[],
            ServiceId:this.ServiceId,
            ServiceName:'',
            ServiceQty:'',
            ServicePrice:'',
            EditServiceName:'',
            EditServiceQty:'',
            EditServicePrice:'',
            EditServiceTotal:0,
            ServiceTotal:0,
            actualTotal:0,
            serviceModalTitle:"",
        };
    },
    mounted() {
        axios.get(API_URL+"customer/"+this.CustomerId)
        .then(response=> this.customers = response.data),
       
        axios.get(API_URL+"services")
        .then(response=> this.services = response.data),
        
        axios.get(API_URL+"servicecustomer/"+this.CustomerId)
        .then(response=> this.servicecustomer = response.data),

        axios.get(API_URL+"servicesum/"+this.CustomerId)
        .then(response => this.servicesum = response.data)
        
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
            axios.get(API_URL+"servicesum/"+this.CustomerId)
            .then(response => this.servicesum = response.data)
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
    deleteClick(id){
        if(!confirm("Are you sure?")){
            return;
        }
        axios.delete(API_URL+"services/"+id)
        .then((response) => {
            this.refreshCustomerData();
            this.refreshServiceCustomerData();
            alert(response.data);
        });
    },
    editClick(serv){
        this.serviceModalTitle="Edit service";
        this.CustomerId=serv.CustomerId;
        this.EditServiceName=serv.ServiceName;
        this.EditServicePrice=serv.ServicePrice;
        this.EditServiceQty=serv.ServiceQty;
        this.EditServiceTotal=serv.ServiceTotal;
        this.ServiceId=serv.ServiceId;
    },
    updateClick(){
        axios.put(API_URL+"services",{
            CustomerId:this.CustomerId,
            ServiceName:this.EditServiceName,
            ServicePrice:this.EditServicePrice,
            ServiceQty:this.EditServiceQty,
            ServiceTotal:this.EditServiceTotal,
            ServiceId:this.ServiceId
        })
        .then((response) => {
            this.refreshCustomerData();
            this.refreshServiceCustomerData();
            alert(response.data);
        });
    }


    }
}

</script>

<style>
.container {
    width:100%;
    max-width:1150px;
    margin: 0 auto;
    padding:10px;
}
.btn-primary {
    margin-top: 12px;
}
.head3 {
    margin-left: auto;
    margin-right: auto;
    width: 8em
}
.servicesTable {
    margin-top: 30px;
}
</style>