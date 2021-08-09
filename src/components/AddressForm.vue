<template>
      <div class="form-container col-lg-3 col-md-3 col-sm-12">
      <!-- For testing -->
      <button id="validAdd" type="button" @click.prevent ="validTestAddress()" class="btn btn-primary">
          Test a valid address
      </button>
      
      <form id="address-form" >
          <label for="street">Street:</label>
          <input type="text" id="street" v-model='address.street'><br>
          <label for="city">City:</label>
          <input type="text" v-model='address.city' id="city"><br>
          <label for="state">State:</label>
          <input type="text" v-model='address.state' maxlength="2"><br>
          <label for="zip">ZIP code:</label>
          <input type="number" v-model='address.zip' id="zip">
          <button  id="submit" class="btn btn-primary" @click.prevent="checkDistance()">Check</button>
          <button class="btn btn-primary" @click.prevent="resetForm()">Reset</button>
      </form>
    </div>
</template>

<script>
export default {
    name: "AddressForm",
}
</script>

<style>

</style>