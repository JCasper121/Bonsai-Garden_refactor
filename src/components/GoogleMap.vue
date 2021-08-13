<template>
  <div id="map-container">
        <div>
            <span id="checkSuccess" class="checkResult succ-text"></span>
            <span id="checkFail" class="checkResult fail-text"></span>
        </div>
        <div class="flex-container">

            <div class="form-container">
                <!-- For testing -->
                <button id="validAdd" type="button" @click.prevent ="validTestAddress" class="btn btn-primary">
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
                    <br>
                    <button  id="submit" class="submit-button" @click.prevent="checkDistance">Check</button>
                    <button class="reset-button" @click.prevent="resetForm">Reset</button>
                </form>

            </div>
            <div class="map-wrapper">
                <div id="GoogleMap"/>
            </div>

        </div>
    </div>
</template>

<script>

import {Loader} from 'google-maps';
// TODO: Import shared helper file for API calls

// Initialized in mounted()
var google = null;
var map = null;
var directionsService = null;
var directionsRenderer = null;


export default {
  name: 'GoogleMap',
  data() {
    return {
      address: {
      street: '',
      city: '',
      state: '',
      zip: '',
      },
      restaurant: "1650 w state st boise, id",
      coordinates : {
        lat: 43.624403,
         lng: -116.209083
      },
      deliveryAddress: null
    }
  },

  async created() {
    if(google == null && map == null ) {
      try {
          const loader = new Loader(process.env.VUE_APP_GOOGLE_MAPS_API_KEY);
          google = await loader.load();
          map = new google.maps.Map(document.getElementById("GoogleMap"), {
            center: this.coordinates,
            zoom: 10
          });
          // Add Restaurant's location to the map
          new google.maps.Marker({
            position: this.coordinates,
            map: map,
            title: "Bonsai Garden"
          });

          directionsService = new google.maps.DirectionsService();
          directionsRenderer = new google.maps.DirectionsRenderer();

          // Mounts Direction Renderer to our map
          directionsRenderer.setMap(map);
      } catch (error) {
        console.error("Error: " + error);
      }
    }
  },

  methods: {
    checkDistance() {
        //Delivery address
        var destination = this.address.street + " " + this.address.city + 
            " " + this.address.state + " " + this.address.zip;
        //Building the request to send to the API
        var request = {
            origin: this.restaurant,
            destination,
            travelMode: google.maps.TravelMode.DRIVING,
            unitSystem: google.maps.UnitSystem.IMPERIAL
          }

        directionsService.route(request,(response, status) => {
            if(status === "OK") {
              directionsRenderer.setDirections(response);
              var distanceString = response.routes[0].legs[0].distance.text;
              var distance = parseFloat(distanceString.substr(0, distanceString.length - 2));
              document.getElementById("checkFail").innerHTML = "";
              document.getElementById("checkSuccess").innerHTML = "";
              if(distance > 5) {
                document.getElementById("checkFail").innerHTML = "Distance " + response.routes[0].legs[0].distance.text + "les exceeds our delivery range. Consider takeout?";
              } else {
                document.getElementById("checkSuccess").innerHTML = "Distance " + response.routes[0].legs[0].distance.text + "les is within delivery range!";
                this.deliveryAddress = destination;
              }
            } else {
              window.alert("Distance check failed");
            }
          }
        )
    },

    resetForm() {
      this.address.street = '';
      this.address.city = "";
      this.address.state= "";
      this.address.zip = "";
      document.getElementById("checkFail").innerHTML = "";
      document.getElementById("checkSuccess").innerHTML = "";
      map.removeMarkers
    },

    validTestAddress() {
      this.address.street = '348 S 13th St';
      this.address.city = "Boise";
      this.address.state= "ID";
      this.address.zip = "83702";
    }
  }
};
</script>

<style>
.flex-container {
    display: flex;
    text-align: right;
}

.form-container {
    text-align: right;
    width: 40%;
}

.map-wrapper {
    width: 60%;
    display: flex;
    justify-content: center;
}


#GoogleMap {
  width: 90%;
  
}

</style>
