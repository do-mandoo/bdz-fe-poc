/**
 * 현재 위치 가져오기 훅 (expo-location)
 */

import { useState, useCallback } from 'react';
import * as Location from 'expo-location';

export interface LocationCoords {
  latitude: number;
  longitude: number;
}

export interface UseLocationResult {
  location: LocationCoords | null;
  address: string | null;
  isLoading: boolean;
  error: string | null;
  getCurrentLocation: () => Promise<LocationCoords | null>;
}

export function useLocation(): UseLocationResult {
  const [location, setLocation] = useState<LocationCoords | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getCurrentLocation = useCallback(async (): Promise<LocationCoords | null> => {
    setIsLoading(true);
    setError(null);

    try {
      // 위치 권한 요청
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError('위치 권한이 거부되었습니다.');
        setIsLoading(false);
        return null;
      }

      // 현재 위치 가져오기
      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      const coords: LocationCoords = {
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      };
      setLocation(coords);

      // 역지오코딩으로 주소 가져오기
      try {
        const reverseGeocode = await Location.reverseGeocodeAsync(coords);
        if (reverseGeocode.length > 0) {
          const addr = reverseGeocode[0];
          const formattedAddress = [
            addr.city,
            addr.district,
            addr.street,
            addr.streetNumber,
          ]
            .filter(Boolean)
            .join(' ');
          setAddress(formattedAddress || addr.name || '주소를 찾을 수 없습니다');
        }
      } catch {
        // 역지오코딩 실패해도 좌표는 반환
        setAddress('주소를 가져올 수 없습니다');
      }

      setIsLoading(false);
      return coords;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '위치를 가져오는데 실패했습니다.';
      setError(errorMessage);
      setIsLoading(false);
      return null;
    }
  }, []);

  return {
    location,
    address,
    isLoading,
    error,
    getCurrentLocation,
  };
}
