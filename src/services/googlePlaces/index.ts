import type { PaceDetailed, PlaceResultsByLocation, PlacesPredictionsByMap } from '@/types/googlePlaces'
import placesApiClient from '@/clients/placesApiClient'

const googlePlacesService = {
  getPlaceAutoComplete: (input: string) =>
    placesApiClient().get<PlacesPredictionsByMap>('/place/autocomplete/json', { params: { input } }),
  getPlaceDetailed: async (params?: Record<string, any>) =>
    await placesApiClient().get<PaceDetailed>('/place/details/json', { params }),
  getPlaceGeocode: async (params?: Record<string, any>) =>
    await placesApiClient().get<PlaceResultsByLocation>('/geocode/json', { params }),
}

export default googlePlacesService
