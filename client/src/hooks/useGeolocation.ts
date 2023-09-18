import { useState } from 'react';

type Position = {
  lat: number;
  lng: number;
};

export function useGeolocation(defaultPosition: Position | null = null) {
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState<Position | null>(defaultPosition);
  const [error, setError] = useState<string | null>(null);

  function getPosition() {
    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setIsLoading(false);
      },
      (error) => {
        setError(error.message);
        setIsLoading(false);
      },
    );
  }

  return { position, isLoading, error, getPosition };
}
