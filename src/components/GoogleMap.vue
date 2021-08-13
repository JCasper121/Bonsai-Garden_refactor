<template>
  <div id="google-map-component">
            <div class="validation-messages">
                <span id="checkSuccess"></span>
                <span id="checkFail"></span>
            </div>
        <div class="flex-container">

            <div class="form-container">
                <!-- For testing -->
                <form id="address-form" >
                  <div class="form">
                    <label for="street">Street:</label>
                    <input type="text" id="street" v-model='address.street'>
                    <label for="city">City:</label>
                    <input type="text" v-model='address.city' id="city">
                    <label for="state">State:</label>
                    <!-- <input type="text" v-model='address.state' maxlength="2"> -->
                    <select v-model='address.state'>
                      <option value=""></option>
                      <option value="AL">Alabama</option>
                      <option value="AK">Alaska</option>
                      <option value="AZ">Arizona</option>
                      <option value="AR">Arkansas</option>
                      <option value="CA">California</option>
                      <option value="CO">Colorado</option>
                      <option value="CT">Connecticut</option>
                      <option value="DE">Delaware</option>
                      <option value="DC">District Of Columbia</option>
                      <option value="FL">Florida</option>
                      <option value="GA">Georgia</option>
                      <option value="HI">Hawaii</option>
                      <option value="ID">Idaho</option>
                      <option value="IL">Illinois</option>
                      <option value="IN">Indiana</option>
                      <option value="IA">Iowa</option>
                      <option value="KS">Kansas</option>
                      <option value="KY">Kentucky</option>
                      <option value="LA">Louisiana</option>
                      <option value="ME">Maine</option>
                      <option value="MD">Maryland</option>
                      <option value="MA">Massachusetts</option>
                      <option value="MI">Michigan</option>
                      <option value="MN">Minnesota</option>
                      <option value="MS">Mississippi</option>
                      <option value="MO">Missouri</option>
                      <option value="MT">Montana</option>
                      <option value="NE">Nebraska</option>
                      <option value="NV">Nevada</option>
                      <option value="NH">New Hampshire</option>
                      <option value="NJ">New Jersey</option>
                      <option value="NM">New Mexico</option>
                      <option value="NY">New York</option>
                      <option value="NC">North Carolina</option>
                      <option value="ND">North Dakota</option>
                      <option value="OH">Ohio</option>
                      <option value="OK">Oklahoma</option>
                      <option value="OR">Oregon</option>
                      <option value="PA">Pennsylvania</option>
                      <option value="RI">Rhode Island</option>
                      <option value="SC">South Carolina</option>
                      <option value="SD">South Dakota</option>
                      <option value="TN">Tennessee</option>
                      <option value="TX">Texas</option>
                      <option value="UT">Utah</option>
                      <option value="VT">Vermont</option>
                      <option value="VA">Virginia</option>
                      <option value="WA">Washington</option>
                      <option value="WV">West Virginia</option>
                      <option value="WI">Wisconsin</option>
                      <option value="WY">Wyoming</option>
                    </select>
                    <label for="zip">ZIP code:</label>
                    <input type="number" v-model='address.zip' id="zip">
                  </div>
                  <div class="map-form-button-wrapper">
                    <button  id="submit" class="submit-button button" @click.prevent="checkDistance">Check</button>
                    <button class="reset-button button" @click.prevent="resetForm">Reset</button>
                    <button type="button" @click.prevent ="validTestAddress" class="valid-test-btn">
                        Test a valid address
                    </button>
                  </div>
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
                document.getElementById("checkFail").innerHTML = response.routes[0].legs[0].distance.text + "les exceeds our delivery range. Consider takeout?";
              } else {
                document.getElementById("checkSuccess").innerHTML = response.routes[0].legs[0].distance.text + "les is within delivery range!";
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
  width: 100%;
  display: flex;
  justify-content: space-around;
}

.form-container {
  display: flex;
  align-items: center;
  flex-direction: column;
  order: 1;
}



.form{
    margin-bottom: 2em;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-bottom: 1em;
  text-align:left;
}

input, select {
  height: 20px;
}

.map-form-button-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 140px;
  
}

.map-form-button-wrapper > button {
  /* Remove default button styles */
	color: inherit;
	border: none;
	padding: 0;
	font: inherit;
	cursor: pointer;
	outline: inherit;
  /* button styles */
  background-color: rgb(144,179,30);
  box-shadow: 0 5px 10px rgba(0,0,0,0.27),0 0 6px rgba(0,0,0,0.10);
  color: white;
  padding: 2%;
  border-radius: 7px;

}

.map-form-button-wrapper > button:active {
    box-shadow: 0 3px 6px inset rgba(0,0,0,0.17),0 0 6px rgba(0,0,0,0.10);

}


#checkSuccess {
  color: rgb(12, 177, 12);
}

#checkFail {
  color: red;
}

.map-wrapper {
    width: 60%;
    display: flex;
    justify-content: center;
    order: 3;
}

#GoogleMap {
  width: 90%;
  box-shadow: 0 3px 6px rgba(0,0,0,0.17),0 0 6px rgba(0,0,0,0.10);
  
  
}

@media  screen and (max-width: 500px) {
  .form-container {
    text-align: left;
    width: 100%;

  }

  .flex-container {
    flex-direction: column-reverse;
    justify-content: center;
    text-align: center;
  }

  .validation-messages {
    order: 2;
  }

  .map-wrapper {
  width: 100%;
  height: 150px;
  
  }

  #address-form {
    width: 80%;
    padding-top: 0.5em;

  }
}






</style>
