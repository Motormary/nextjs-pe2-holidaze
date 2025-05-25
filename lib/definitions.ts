export enum CacheOptions {
  NoStore = "no-store",
  ForceCache = "force-cache",
  NoCache = "no-cache",
  Default = "default",
}

/**
 * @description Cache tags for fetching data -
 * Add {+ username} to USER members of enum
 */
export enum CacheTags {
  ALL_VENUES = "venues",
  VENUE = "venue-id-", //! + venue uuid
  USER = "user-", //! + username
  USER_VENUES = "user-venues-", //! + username
  USER_BOOKINGS = "user-bookings-", //! + username
}

export enum ErrorSource {
  CAUGHT = "caught", // Error is unkown - Error will be a string
  API = "api", // Error from BE - typeof errorSchema
  SESSION = "session", // failed to verify auth - Error will be a string
}

export enum Method {
  POST = "POST",
  DELETE = "DELETE",
  PATCH = "PATCH",
  PUT = "PUT",
  GET = "GET",
}

type TYPE_VENUE_META = {
  wifi: boolean
  parking: boolean
  breakfast: boolean
  pets: boolean
}

type TYPE_VENUE_LOC = {
  address: string
  city: string
  zip: string
  country: string
  continent: string
  lat: number
  lng: number
}

export type TYPE_BOOKING = {
  id: string
  dateFrom: string
  dateTo: string
  guests: number
  created: string
  updated: string
  customer: TYPE_USER
  venue: TYPE_VENUE
}

export type TYPE_NEW_BOOKING = {
  dateRange: {
    from: Date
    to: Date
  }
  guests: number
  venueId: string
}

export type TYPE_PAGINATION = {
  isFirstPage: boolean
  isLastPage: boolean
  currentPage: number
  previousPage: number | null
  nextPage: number | null
  pageCount: number
  totalCount: number
}

export type TYPE_MEDIA = {
  url: string
  alt: string
}

// -------------------------

export type TYPE_USER = {
  name: string
  email: string
  bio: string
  avatar: TYPE_MEDIA
  banner: TYPE_MEDIA
  venueManager: boolean
  venues: TYPE_VENUE[]
  bookings: TYPE_BOOKING[]
  _count: {
    venues: number
    bookings: number
  }
  accessToken: string | undefined | null
}

export type TYPE_VENUE = {
  id: string
  name: string
  description: string
  media: TYPE_MEDIA[]
  price: number
  maxGuests: number
  rating: number
  created: string
  updated: string
  meta: TYPE_VENUE_META
  location: TYPE_VENUE_LOC
  owner: TYPE_USER
  bookings: TYPE_BOOKING[]
}

export type TYPE_NEW_VENUE = {
  name: string
  description: string
  media: TYPE_MEDIA[] | undefined
  price: number
  rating: number
  meta: {
    wifi: boolean
    parking: boolean
    breakfast: boolean
    pets: boolean
  }
  location: {
    address: string
    city: string
  }
}

export type TYPE_USER_LOGIN = {
  email: string
  password: string
}

export type TYPE_USER_EDIT = {
  bio?: string
  avatar: TYPE_MEDIA
}

export type TYPE_API_ERROR = {
  code: string | undefined
  message: string
  path: string[] | undefined
}

export type TYPE_RESPONSE<T> = {
  success: boolean
  source: ErrorSource
  data: {
    errors: TYPE_API_ERROR[]
    status: string
    statusCode: number
    data: T
    meta: TYPE_PAGINATION
  }
  error: string | TYPE_API_ERROR[]
}

export type TYPE_GET_USER = TYPE_RESPONSE<TYPE_USER>

export type TYPE_GET_VENUE = TYPE_RESPONSE<TYPE_VENUE>

export type TYPE_GET_ALL_VENUES = TYPE_RESPONSE<TYPE_VENUE[]>

export type TYPE_GET_BOOKING = TYPE_RESPONSE<TYPE_BOOKING>
