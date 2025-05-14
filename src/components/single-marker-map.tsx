'use client';

import L, { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

const SHADOW_MARKER =
  'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png';

const VIOLET_MARKER = new L.Icon({
  iconUrl:
    'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-violet.png',
  shadowUrl: SHADOW_MARKER,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  shadowSize: [41, 41],
  popupAnchor: [1, -34],
});

type Props = {
  name: string;
  latitude: number;
  longitude: number;
};

export default function SingleMarkerMap({ name, latitude, longitude }: Props) {
  const position: LatLngExpression = [latitude, longitude];
  return (
    <MapContainer
      zoom={17}
      minZoom={10}
      maxZoom={25}
      center={position}
      style={{ height: '35rem', width: '100%', borderRadius: '0.65rem' }}
    >
      <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
      <Marker position={position} icon={VIOLET_MARKER}>
        <Popup>{name}</Popup>
      </Marker>
    </MapContainer>
  );
}
