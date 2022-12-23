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
            Options
        </th>
        <!--<th>
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
        </th>-->
    </tr>
</thead>
<tbody>
    <tr v-for="cus in customers" :key="cus.id" class="customer">
        <td>{{cus.CustomerId}}</td>
        <td>
            <div>
                <router-link class="btn btn-outline-primary" :to="'/customer/'+cus.CustomerId">{{cus.CustomerName}}</router-link>
            </div>
        </td>
        <td>{{cus.CustomerCVRnumber}}</td>
        <!--<td>{{cus.CustomerPhoneNumber}}</td>
        <td>{{cus.CustomerEmail}}</td> 
        <td>{{cus.CustomerAddress}}</td>
        <td>{{cus.ProjectId}}</td>-->
        <td>
            <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#exampleModal" @click="editClick(cus)">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                </svg>
            </button>

            <button type="button" class="btn" @click="deleteClick(cus.CustomerId)">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                </svg>
            </button>
            
        </td>
    </tr>
</tbody>
</table>


<button type="button" 
class="btn btn-primary m-2 fload-end"
data-bs-toggle="modal"
data-bs-target="#exampleModal"
@click="addClick()">Add Customer</button>

<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
<div class="modal-dialog modal-lg modal-dialog-centered">
<div class="modal-content">
    <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">{{customerModalTitle}}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>

    <div class="modal-body">

        <div class="input-group mb-3">
            <span class="input-group-text">Name</span>
            <input type="text" class="form-control" v-model="CustomerName">
        </div>
        <div class="input-group mb-3">
            <span class="input-group-text">CVR-number</span>
            <input type="text" class="form-control" v-model="CustomerCVRnumber">
        </div>
        <div class="input-group mb-3">
            <span class="input-group-text">Phone Number</span>
            <input type="text" class="form-control" v-model="CustomerPhoneNumber">
        </div>
        <div class="input-group mb-3">
            <span class="input-group-text">Email</span>
            <input type="text" class="form-control" v-model="CustomerEmail">
        </div>
        <div class="input-group mb-3">
            <span class="input-group-text">Customer Address</span>
            <input type="text" class="form-control" v-model="CustomerAddress">
        </div>

        <button type="button" @click="createClick()" v-if="CustomerId==0" class="btn btn-primary">Create</button>
        <button type="button" @click="updateClick()" v-if="CustomerId!=0" class="btn btn-primary">Update</button>

    </div>

</div>
</div>
</div>

</div>

</template>

<script>
import axios from "axios"

const API_URL = "https://localhost:44326/api/";

export default {
    data() {
        return {
            customers:[],
            customerModalTitle:"",
            serviceModalTitle:"",
            CustomerId:this.CustomerId,
            CustomerName:"",
            CustomerCVRnumber:"",
            CustomerPhoneNumber:"",
            CustomerEmail:"",
            CustomerAddress:"",
            ServiceId:0,
            ServiceName:""
        }
        
    },
    methods: {
        refreshCustomerData(){
            axios.get(API_URL+"customer")
            .then((response) => {
                this.customers = response.data;
            }); 
        },
    addClick(){
        this.customerModalTitle="Add customer";
        this.CustomerId=0;
        this.CustomerName="";
        this.CustomerCVRnumber="";
        this.CustomerPhoneNumber="";
        this.CustomerEmail="";
        this.CustomerAddress="";
    },
    editClick(cus){
        this.customerModalTitle="Edit customer";
        this.CustomerId=cus.CustomerId;
        this.CustomerName=cus.CustomerName;
        this.CustomerCVRnumber=cus.CustomerCVRnumber;
        this.CustomerPhoneNumber=cus.CustomerPhoneNumber;
        this.CustomerEmail=cus.CustomerEmail;
        this.CustomerAddress=cus.CustomerAddress;
    },
    createClick(){
        axios.post(API_URL+"customer",{
            CustomerName:this.CustomerName,
            CustomerCVRnumber:this.CustomerCVRnumber,
            CustomerPhoneNumber:this.CustomerPhoneNumber,
            CustomerEmail:this.CustomerEmail,
            CustomerAddress:this.CustomerAddress,
        })
        .then((response) => {
            this.refreshCustomerData();
            alert(response.data);
        });
    },
    createServiceClick(){
        axios.post(API_URL+"services",{
            ServiceName:this.ServiceName   
        })
        .then((response) => {
            this.refreshCustomerData();
            alert(response.data);
        });
    },
    updateClick(){
        axios.put(API_URL+"customer",{
            CustomerId:this.CustomerId,
            CustomerName:this.CustomerName,
            CustomerCVRnumber:this.CustomerCVRnumber,
            CustomerPhoneNumber:this.CustomerPhoneNumber,
            CustomerEmail:this.CustomerEmail,
            CustomerAddress:this.CustomerAddress,
        })
        .then((response) => {
            this.refreshCustomerData();
            alert(response.data);
        });
    },
    deleteClick(id){
        if(!confirm("Are you sure?")){
            return;
        }
        axios.delete(API_URL+"customer/"+id)
        .then((response) => {
            this.refreshCustomerData();
            alert(response.data);
        });
    },
    getProfile(id){
        axios.get(API_URL+"customer/"+id)
        .then((response) => {
            this.customers = response.data;
        });
    }
},
mounted:function() {
        this.refreshCustomerData();
    }
}
</script>

<style>
#table {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  align-self: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>