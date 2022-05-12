export class GeoApi {
    data: GeoApiData[];
}

export class GeoApiData {
    latitude: string;
    longitude: string;
    type: string;
    name: string;
    number: string;
    postal_code: string;
    street: string;
    confidence: number;
    region: string;
    region_code: string;
    county: string;
    locality: string;
    administrative_area: string;
    neighbourhood: string;
    country: string;
    country_code: string;
    continent: string;
    label: string;
}