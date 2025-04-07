'use server';

import { CENTER } from '@/lib/constant';
import { GoogleLocationPlace } from '@/lib/types';
import axios from 'axios';

export async function fetchLocation(query: string): Promise<GoogleLocationPlace[]> {
  const data = {
    textQuery: query,
    languageCode: 'mn',
    regionCode: 'cn',
    locationBias: {
      circle: {
        center: {
          latitude: CENTER.lat,
          longitude: CENTER.long,
        },
        radius: 500.0,
      },
    },
  };

  try {
    const response = await axios.post('https://places.googleapis.com/v1/places:searchText', data, {
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': process.env.GOOGLE_MAPS_API,
        'X-Goog-FieldMask': 'places.location,places.formattedAddress,places.displayName',
      },
    });

    return response?.data?.places ?? [];
  } catch (error) {
    return [];
  }
}
