import React, { useState } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoding from '@mapbox/mapbox-sdk/services/geocoding';
import "./mapbox.css"




//const MAPBOX_TOKEN = `${process.env.MAPBOX_TOKEN}`;
const MAPBOX_TOKEN = 'pk.eyJ1IjoiYW50b2luZXN1YnJhIiwiYSI6ImNsbDB5eWg4aTBrZGozanFyNmNtanJ6azAifQ.cMo1xIhNXAL4eeAL74tXjg';


mapboxgl.accessToken = MAPBOX_TOKEN;
const geocodingClient = MapboxGeocoding({ accessToken: mapboxgl.accessToken });

function MapBox({onSuggestionSelected, disabled, defaultLoc, type, mapPlaceholder}) {
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const handleInputChange = async (input) => {
        setSearchTerm(input);
        if (input.trim() === '') {
            setSuggestions([]);
            return;
        }

        try {
            const response = await geocodingClient.forwardGeocode({
                query: input,
                types: [type],
            }).send();
            setSuggestions(response.body.features);
        } catch (error) {
            console.error('Error fetching suggestions:', error);
        }
    };


    const handleSuggestionClick = (suggestion) => {
        setSearchTerm(suggestion.place_name);
        setSuggestions([]);
        onSuggestionSelected(suggestion.place_name);

    };

    return (
        <div>
            <input
                type="text"
                placeholder={mapPlaceholder}
                value={searchTerm}
                onChange={(e) => handleInputChange(e.target.value)}
                disabled={disabled}
                className={"mapbox-input"}

            />
            <ul>
                {suggestions.map((feature) => (
                    <li className={"mapbox-li"} key={feature.id} onClick={() => handleSuggestionClick(feature)}>{feature.place_name}</li>
                ))}
            </ul>
        </div>
    );
}

export default MapBox;
