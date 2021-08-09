export default {
    formatPrice: function(price) {
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
        })

        var formattedPrice = formatter.format(price);
        return formattedPrice;
    },
    createMap: function(google, mapContainer, coordinates) {
        console.log("map container: ", mapContainer);
        var map = new google.maps.Map(mapContainer, {
            center: coordinates,
            zoom: 10
          });
        return map;
    },
    addRestaurantMarker: function(google, map, coordinates) {
          new google.maps.Marker({
            position: coordinates,
            map: map,
            title: "Bonsai Garden"
          });
    }

}