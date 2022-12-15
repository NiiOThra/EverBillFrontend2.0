<template>
    <div id="customer">
        <h1>{{ $route.params.id}}</h1>
        <h2></h2>
    </div>
  
</template>

<script>
import axios from "axios"

export default {
    data() {
        return {
            id:this.$route.params.id,
            customer:{}
        }
    },
    created() {
        axios.get("https://localhost:44326/api/customer/" + this.id)
        .then(response=>{
           console.log(response);
           this.customer=response.data;
       });
    }
}
</script>

<style>

</style>