import { Injectable } from '@nestjs/common';
import {
  DirectionsRequest,
  Client as GoogleMapsClient,
  TravelMode,
} from '@googlemaps/google-maps-services-js';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DirectionsService {
  constructor(
    private googleMapClient: GoogleMapsClient,
    private configService: ConfigService,
  ) {}
  async getDirections(placeOriginId: string, placeDestinationId: string) {
    const requestParams: DirectionsRequest['params'] = {
      origin: `place_id:${placeOriginId.replace('place_id:', '')}`,
      destination: `place_id:${placeDestinationId.replace('place_id:', '')}`,
      mode: TravelMode.driving,
      key: 'your_key_api_google_maps',
    };
    const { data } = await this.googleMapClient.directions({
      params: requestParams,
    });

    return {
      ...data,
      request: {
        origin: {
          place_id: requestParams.origin,
          location: {
            lat: data.routes[0].legs[0].start_location.lat,
            lng: data.routes[0].legs[0].start_location.lng,
          },
        },
        destination: {
          place_id: requestParams.destination,
          location: {
            lat: data.routes[0].legs[0].end_location.lat,
            lng: data.routes[0].legs[0].end_location.lng,
          },
        },
        mode: requestParams.mode,
      },
    };
  }
}
