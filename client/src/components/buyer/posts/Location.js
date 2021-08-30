import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow  } from '@react-google-maps/api';

const SimpleMap = (props) => {

    const [ selected, setSelected ] = useState({});

    const onSelect = item => {
        setSelected(item);
    }

    const mapStyles = {
        height: "100vh",
        width: "100%"};

    const defaultCenter = {
        lat: props.loc.lat, lng: props.loc.long
    }

    const locations = [
        {
            name: "Seller's Location",
            location: {
                lat: props.loc.lat,
                lng: props.loc.long
            },
        }
    ];

    return (
        <LoadScript
            googleMapsApiKey='AIzaSyBibEsSWGqXjOS3DbXiFM4i2cbQhZHb2wo'>
            <GoogleMap
                mapContainerStyle={mapStyles}
                zoom={13}
                center={defaultCenter}>
                {
                    locations.map(item => {
                        return (
                            <Marker key={item.name} position={item.location}/>
                        )
                    })
                }
                {
                    locations.map(item => {
                        return (
                            <Marker key={item.name}
                                    position={item.location}
                                    onClick={() => onSelect(item)}
                            />
                        )
                    })
                }
                {
                    selected.location &&
                    (
                        <InfoWindow
                            position={selected.location}
                            clickable={true}
                            onCloseClick={() => setSelected({})}
                        >
                            <p>{selected.name}</p>
                        </InfoWindow>
                    )
                }
            </GoogleMap>
        </LoadScript>
    )
}
export default SimpleMap;