import { LatLngTuple } from 'leaflet';
import { useEffect, useState } from 'react';
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from 'react-leaflet';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/Button/Button.tsx';
import { useCities } from '@/contexts/Cities/CitiesContext.ts';
import { useGeolocation } from '@/hooks/useGeolocation.ts';
import { useUrlPosition } from '@/hooks/useUrlPosition.ts';

import styles from './Map.module.css';

export function Map() {
  const { cities } = useCities();
  const [mapPosition, setMapPosition] = useState<LatLngTuple>([40, 0]);
  const {
    isLoading: isLoadingPosition,
    position: geoLocationPosition,
    getPosition,
  } = useGeolocation();
  const [mapLat, mapLng] = useUrlPosition();

  useEffect(() => {
    if (mapLat !== null && mapLng !== null) {
      setMapPosition([Number(mapLat), Number(mapLng)]);
    }
  }, [mapLat, mapLng]);

  useEffect(() => {
    if (geoLocationPosition) {
      setMapPosition([geoLocationPosition.lat, geoLocationPosition.lng]);
    }
  }, [geoLocationPosition]);

  return (
    <div className={styles.mapContainer}>
      {!geoLocationPosition && (
        <Button
          onClick={() => {
            getPosition();
          }}
          variant="position"
        >
          {isLoadingPosition ? 'Loading...' : 'Use your position'}
        </Button>
      )}
      <MapContainer
        center={mapPosition}
        zoom={8}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cities?.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{city.emoji}</span> <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}

        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

type ChangeCenterProps = {
  position: LatLngTuple;
};

function normalizeLongitude(lng: number): number {
  return ((((lng + 180) % 360) + 360) % 360) - 180;
}

function ChangeCenter({ position }: ChangeCenterProps) {
  const map = useMap();

  useEffect(() => {
    const currentLng = map.getCenter().lng;
    let targetLng = normalizeLongitude(position[1]);

    // Check if it's shorter to adjust the target longitude for smoother panning
    if (Math.abs(currentLng - targetLng) > 180) {
      if (currentLng > targetLng) {
        targetLng += 360;
      } else {
        targetLng -= 360;
      }
    }

    const adjustedPosition: LatLngTuple = [position[0], targetLng];

    map.closePopup();
    map.setView(adjustedPosition, map.getZoom(), { animate: true });
  }, [map, position]);

  return null;
}

function DetectClick() {
  const navigate = useNavigate();

  useMapEvents({
    click: (e) =>
      navigate(
        `form?lat=${e.latlng.lat}&lng=${normalizeLongitude(e.latlng.lng)}`,
      ),
  });

  return null;
}
