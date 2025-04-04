import { i18n } from '../boot/i18n';

// config
import { rideToWorkByBikeConfig } from '../boot/global_vars';

// enums
import { TransportDirection } from '../components/types/Route';
import { TripDirection } from '../components/types/Trip';

// types
import type { Trip, TripPostPayload } from '../components/types/Trip';
import type {
  RouteItem,
  TransportType,
  RouteFeature,
} from '../components/types/Route';

// utils
import { hasTransportDistance } from '../utils/has_transport_distance';

/**
 * Adapter for converting between API and component trip data formats
 */
export const tripsAdapter = {
  /**
   * Convert Trip to RouteItem format
   * @param {Trip} trip - Trip to convert
   * @returns {RouteItem} - Route item
   */
  toRouteItem(trip: Trip): RouteItem {
    const direction =
      trip.direction === TripDirection.to
        ? TransportDirection.toWork
        : TransportDirection.fromWork;
    const distance = (trip: Trip) =>
      i18n.global.n(
        trip.distanceMeters ? trip.distanceMeters / 1000.0 : 0,
        'routeDistanceDecimalNumber',
        'en',
      );
    const transport = trip.commuteMode as TransportType;

    return {
      id: trip.id.toString(),
      date: trip.trip_date,
      direction: direction,
      distance: distance(trip),
      transport,
      // TODO: Handle the route feature data
      routeFeature: null as RouteFeature | null,
    };
  },

  /**
   * Convert RouteItem to TripPostPayload format
   * @param {RouteItem} routeItem - Route item to convert
   * @returns {TripPostPayload} - Trip post payload
   */
  toTripPostPayload(routeItem: RouteItem): TripPostPayload {
    const direction =
      routeItem.direction === TransportDirection.toWork
        ? TripDirection.to
        : TripDirection.from;

    /**
     * `routeItem.distance` value is in km unit as localized number string
     * (with ',' or '.' decimal point)
     */
    const distanceMeters =
      parseFloat(routeItem.distance.replace(',', '.')) * 1000;

    // create payload with required fields
    const payload: TripPostPayload = {
      trip_date: routeItem.date,
      direction,
      commuteMode: routeItem.transport,
      distanceMeters: hasTransportDistance(routeItem.transport)
        ? distanceMeters
        : 0,
      sourceApplication: rideToWorkByBikeConfig.apiTripsSourceApplicationId,
    };

    return payload;
  },
};
