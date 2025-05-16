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
  ALL_LISTINGS = "listings",
  LISTING = "listing-id-", //! + listing uuid
  USER = "user-", //! + username
  USER_LISTINGS = "user-listings-", //! + username
  USER_BIDS = "user-bids-", //! + username
  USER_WINS = "user-wins-", //! + username
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

export type TYPE_META = {
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

export type TYPE_USER = {
  name: string
  email: string
  bio: string
  avatar: TYPE_MEDIA
  banner: TYPE_MEDIA
  venueManager: boolean
  venues: any[] // TYPE_VENUES[]
  bookings: any[] // TYPE_BOOKINGS[]
  _count: {
    venues: number
    bookings: number
  }
  accessToken: string | undefined | null
}

export type TYPE_USER_LOGIN = {
  email: string
  password: string
}

export type TYPE_USER_EDIT = {
  bio: string
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
    meta: TYPE_META
  }
  error: string | TYPE_API_ERROR[]
}

export type TYPE_GET_USER = TYPE_RESPONSE<TYPE_USER>
