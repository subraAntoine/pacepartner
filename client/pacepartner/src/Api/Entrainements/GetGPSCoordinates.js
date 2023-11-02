import axios from "axios";
import config from "../../config";
const GetGPSCoordinates = async (adresseCode) => {

        try {
            const code = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${adresseCode}.json`, {
                params: {
                    access_token: 'pk.eyJ1IjoiYW50b2luZXN1YnJhIiwiYSI6ImNsbDB5eWg4aTBrZGozanFyNmNtanJ6azAifQ.cMo1xIhNXAL4eeAL74tXjg',
                }
            });
            console.log(code.data.features[0].center);
            return code.data.features[0].center;

        } catch (err) {
            console.log(err);
        }

 }

 export default GetGPSCoordinates;