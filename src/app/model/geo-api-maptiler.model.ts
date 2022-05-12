export class GeoApiMapTilerData {
    attribution: string;
    features: MapTilerFeature[];
    query: string[];
    type: string;
}

export class MapTilerFeature {
    bbox: number[];
    center: number[];
    place_type: string[];
    place_name: string;
    text: string;
}