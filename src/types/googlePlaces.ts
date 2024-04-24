export type PlacesPredictionsByMap = StatusResponse<{
  predictions: Array<Prediction>
}>

export type PlaceResultsByLocation = {
  results: Array<Result>
}

export type PaceDetailed = {
  html_attributions: Array<any>
  result: {
    address_components: Array<AddressComponent>
    adr_address: string
    business_status: string
    dine_in: boolean
    formatted_address: string
    geometry: {
      location: { lat: number; lng: number }
      viewport: {
        northeast: { lat: number; lng: number }
        southwest: { lat: number; lng: number }
      }
    }
    icon: string
    icon_background_color: string
    icon_mask_base_uri: string
    name: string
    photos: Array<Object>
    place_id: string
    rating: number
    reference: string
    reviews: Array<Object>
    types: Array<string>
    url: string
    user_ratings_total: number
    utc_offset: number
    vicinity: string
  }
  status: string
}

export type Prediction = {
  description: string
  matched_substrings: Array<{
    length: number
    offset: number
  }>
  place_id: string
  reference: string
  structured_formatting: {
    main_text: string
    main_text_matched_substrings: Array<{ length: number; offset: number }>
    secondary_text: string
  }
  terms: Array<{
    offset: number
    value: string
  }>
  types: Array<string>
}

export type AddressComponent = {
  long_name: string
  short_name: string
  types: Array<string>
}

export type Result = {
  address_components: Array<AddressComponent>
  plus_code: {
    compound_code: string
    global_code: string
  }
  status: string
}

export type Region = {
  latitude: number
  longitude: number
  latitudeDelta?: number
  longitudeDelta?: number
}
