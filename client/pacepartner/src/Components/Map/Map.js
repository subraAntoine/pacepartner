import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import React, { useRef, useEffect, useState } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';

import axios from "axios";

mapboxgl.accessToken = 'pk.eyJ1IjoiYW50b2luZXN1YnJhIiwiYSI6ImNsbDB5eWg4aTBrZGozanFyNmNtanJ6azAifQ.cMo1xIhNXAL4eeAL74tXjg';

export default function MapComponent({ coordinates }) {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const marker = useRef(null);
    const [lng, setLng] = useState(null);
    const [lat, setLat] = useState(null);
    const [zoom, setZoom] = useState(13);

    useEffect(() => {
        setLng(coordinates[0]);
        setLat(coordinates[1]);
    }, [coordinates]);

    useEffect(() => {
        if (map.current) return; // Initialize map only once

        if (lng !== null && lat !== null) {
            map.current = new mapboxgl.Map({
                container: mapContainer.current,
                style: 'mapbox://styles/mapbox/streets-v12',
                center: [lng, lat],
                zoom: zoom
            });

            map.current.on('load', () => {
                // Create a marker and add it to the map
                marker.current = new mapboxgl.Marker()
                    .setLngLat([lng, lat])
                    .addTo(map.current);
            });
        }
    }, [lng, lat]);

    return (
        <div>
            <div ref={mapContainer} className="map-container" />
        </div>
    );
}
