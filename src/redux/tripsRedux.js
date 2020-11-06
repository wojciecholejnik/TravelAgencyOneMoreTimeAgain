/* SELECTORS */

export const getAllTrips = ({trips}) => trips;

export const getFilteredTrips = ({trips, filters}) => {
  let output = trips;

  // filter by search phrase
  if(filters.searchPhrase){
    const pattern = new RegExp(filters.searchPhrase, 'i');
    output = output.filter(trip => pattern.test(trip.name));
  }

  // TODO - filter by duration
  if(filters.duration.from && filters.duration.to){
    output = output.filter((trips) =>
      trips.days >= filters.duration.from && trips.days <= filters.duration.to);
  }
  // TODO - filter by tags
  if(filters.tags.length != 0){
    output = output.filter(trip => {
      for(let tag of trip.tags) {
        if(filters.tags.indexOf(tag) >-1)
          return trip;
      }
    });
  }
  // TODO - sort by cost descending (most expensive goes first)

  return output;
};

export const getTripById = ({trips}, tripId) => {

  // TODO - filter trips by tripId
  const filtered = trips.filter(trip => trip.id == tripId);
  return filtered.length == 1 ? filtered[0] : {error: true};
};

export const getTripsForCountry = ({trips}, countryCode) => {
  // TODO - filter trips by countryCode
  const filtered = trips.filter(trip => trip.country.code == countryCode);
  return filtered;
};

/* ACTIONS */

/*
// action name creator
const reducerName = 'trips';
const createActionName = name => `app/${reducerName}/${name}`;

// action types


// action creators


// reducer
export default function reducer(statePart = [], action = {}) {
  switch (action.type) {
    default:
      return statePart;
  }
}
 */
