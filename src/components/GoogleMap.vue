<template>
  <div id="map-container row">


    <br>
    <div>

      <span id="checkSuccess" class="checkResult text text-success"></span>
      <span id="checkFail" class="checkResult text text-danger"></span>
    </div>


    <div id="GoogleMap" ref="GoogleMap"/>
    <!-- <GMapMap
        :center="coordinates"
        :zoom="10"
        map-type-id="roadmap"
        style="width: 300px; height: 300px;">
        
    </GMapMap> -->
    </div>
</template>

<script>

import {Loader} from 'google-maps';
import shared from "../helper-functions/shared";
// Initialized in mounted()

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
      deliveryAddress: null,
    


    }
  },

  async mounted() {
    //   TODO:
    // -Fix memory leak
    let map = this.$store.getters.getMap;
    const mapContainer = this.$refs.GoogleMap;

    if(map == null) {
        try {
            const loader = new Loader(process.env.VUE_APP_GOOGLE_MAPS_API_KEY);
          var google = await loader.load();
        //   Create Map
          map = shared.createMap(google, mapContainer, this.coordinates);
          // Add Restaurant's location to the map
          shared.addRestaurantMarker(google, map, this.coordinates);
          this.$store.dispatch('setMap', map);
        //   directionsService = new google.maps.DirectionsService();
        //   directionsRenderer = new google.maps.DirectionsRenderer();

          // Mounts Direction Renderer to our map
        //   directionsRenderer.setMap(map);
      } catch (error) {
        console.error("Error: " + error);
      }
    // } else {

    }
  },
  unmounted() {
    //   MEMORY LEAK
      this.$store.dispatch('setMap', null);

  },

  methods: {
    // checkDistance() {
    //     //Delivery address
    //     var destination = this.address.street + " " + this.address.city + " " + this.address.state + " " + this.address.zip;

    //     //Building the request to send to the API
    //     var request = {
    //       // 
    //         origin: this.restaurant,
    //         destination,
    //         travelMode: google.maps.TravelMode.DRIVING,
    //         unitSystem: google.maps.UnitSystem.IMPERIAL
    //       }

    //     directionsService.route(request,(response, status) => {
    //         if(status === "OK") {
    //           directionsRenderer.setDirections(response);
    //           var distanceString = response.routes[0].legs[0].distance.text;
    //           var distance = parseFloat(distanceString.substr(0, distanceString.length - 2));
    //           document.getElementById("checkFail").innerHTML = "";
    //           document.getElementById("checkSuccess").innerHTML = "";
    //           if(distance > 5) {
    //             document.getElementById("checkFail").innerHTML = "Distance " + response.routes[0].legs[0].distance.text + "les exceeds our delivery range. Consider takeout?";
    //           } else {
    //             document.getElementById("checkSuccess").innerHTML = "Distance " + response.routes[0].legs[0].distance.text + "les is within delivery range!";
    //             this.deliveryAddress = destination;
    //           }
    //         } else {
    //           window.alert("Distance check failed");
    //         }
    //       }
    //     )
    // },
    // resetForm() {
    //   this.address.street = '';
    //   this.address.city = "";
    //   this.address.state= "";
    //   this.address.zip = "";
    //   document.getElementById("checkFail").innerHTML = "";
    //   document.getElementById("checkSuccess").innerHTML = "";
    //   map.removeMarkers
    // },

    // validTestAddress() {
    //   this.address.street = '348 S 13th St';
    //   this.address.city = "Boise";
    //   this.address.state= "ID";
    //   this.address.zip = "83702";
    // }


  }
  
};
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  width: 100vw;
}

.form-container {
  width: 30%;
  height: auto;
  display: inline-block;
}

.checkResult {
  margin-bottom: 10px;
  font-weight: 900;
}

button {
  margin: 5px;
}

#validAdd {
  display: block;
}

#GoogleMap {
  display: inline-block;
  width: 250px;
  height: 250px;
  margin-left: 15%;
}
@media only screen and (max-width: 1247px) {
  .map-container {
    text-align: center;
  }
  #GoogleMap {
  display: block;
}
}
@media only screen and (max-width: 768px) {
.form-container {
  margin-left: -55%;

}
}
@media only screen and (max-width: 450px) {
  #GoogleMap {
  display: block;
  width: 150px;
  height: 150px;
}

body {
  margin: 0 30% 0 10%;
}
}
</style>