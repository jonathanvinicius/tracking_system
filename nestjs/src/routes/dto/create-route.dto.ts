export interface CreateRouteDto {
  source_id?: string;
  destination_id?: string;
  name: string;
  source: Place;
  destination: Place;
  distance: number;
  duration: number;
  directions: any;
}

export interface Place {
  name: string;
  location: Coord;
}

export interface Coord {
  lat: number;
  lng: number;
}
