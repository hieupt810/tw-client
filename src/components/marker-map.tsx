'use client';

import L, { LatLngExpression } from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet/dist/leaflet.css';
import { useEffect, useMemo } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';

import { Constant } from '@/constants';
import { IAttraction } from '@/types/IAttraction';

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: Constant.MARKER_ICON_URL.VIOLET,
  shadowUrl: Constant.MARKER_ICON_URL.SHADOW,
});

function RoutingMachine({ items }: { items: IAttraction[] }) {
  const map = useMap();
  const transparentIcon = useMemo(
    () =>
      L.icon({
        iconSize: [0, 0],
        shadowSize: [0, 0],
        iconAnchor: [0, 0],
        popupAnchor: [0, 0],
        iconUrl: Constant.MARKER_ICON_URL.VIOLET,
        shadowUrl: Constant.MARKER_ICON_URL.SHADOW,
      }),
    [],
  );

  useEffect(() => {
    if (!map) return;

    const routingControl = L.Routing.control({
      waypoints: items.map((item) => {
        return L.latLng(item.latitude, item.longitude);
      }),
      routeWhileDragging: true,
      lineOptions: {
        styles: [{ color: '#6FA1EC', weight: 4 }],
        extendToWaypoints: false,
        missingRouteTolerance: 0,
      },
      show: true,
      addWaypoints: true,
      showAlternatives: true,
      fitSelectedRoutes: true,
      // @ts-expect-error: leaflet-routing-machine types
      createMarker: (waypointIndex, waypoint, numberOfWaypoints) => {
        return L.marker(waypoint.latLng, {
          icon: transparentIcon,
        });
      },
    } as any).addTo(map);

    return () => {
      map.removeControl(routingControl);
    };
  });

  return null;
}

export default function MarkerMap({ items }: { items?: IAttraction[] }) {
  const centerPosition: LatLngExpression =
    items && items.length !== 0
      ? [items[0].latitude, items[0].longitude]
      : [16.0544, 108.2022];

  const GREEN_MARKER = useMemo(
    () =>
      new L.Icon({
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        shadowSize: [41, 41],
        popupAnchor: [1, -34],
        iconUrl: Constant.MARKER_ICON_URL.GREEN,
        shadowUrl: Constant.MARKER_ICON_URL.SHADOW,
      }),
    [],
  );

  const RED_MARKER = useMemo(
    () =>
      new L.Icon({
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        shadowSize: [41, 41],
        popupAnchor: [1, -34],
        iconUrl: Constant.MARKER_ICON_URL.RED,
        shadowUrl: Constant.MARKER_ICON_URL.SHADOW,
      }),
    [],
  );

  const VIOLET_MARKER = useMemo(
    () =>
      new L.Icon({
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        shadowSize: [41, 41],
        popupAnchor: [1, -34],
        iconUrl: Constant.MARKER_ICON_URL.VIOLET,
        shadowUrl: Constant.MARKER_ICON_URL.SHADOW,
      }),
    [],
  );

  return (
    <MapContainer
      zoom={15}
      minZoom={10}
      maxZoom={25}
      center={centerPosition}
      className='h-full min-h-[35rem] w-full rounded-lg'
    >
      <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
      {items &&
        items.map((item, idx) => {
          const position: LatLngExpression = [item.latitude, item.longitude];
          let icon = VIOLET_MARKER;
          if (items.length === 1) {
            icon = VIOLET_MARKER;
          } else if (idx === 0) {
            icon = GREEN_MARKER;
          } else if (idx === items.length - 1) {
            icon = RED_MARKER;
          }
          return (
            <Marker key={item.elementId} position={position} icon={icon}>
              <Popup>
                {idx + 1}. {item.name}
              </Popup>
            </Marker>
          );
        })}
      {items && items.length > 0 && <RoutingMachine items={items} />}
    </MapContainer>
  );
}
