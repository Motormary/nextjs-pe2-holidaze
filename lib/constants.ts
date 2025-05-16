import "server-only"

export const API_BASE = process.env.API_BASE

export const API_AUTH = `${API_BASE}/auth`

export const API_AUTH_LOGIN = `${API_AUTH}/login`

export const API_AUTH_REGISTER = `${API_AUTH}/register`

export const API_HOLIDAZE = `${API_BASE}/holidaze`

export const API_AH_VENUES = `${API_HOLIDAZE}/venues`

export const API_AH_BOOKINGS = `${API_HOLIDAZE}/bookings`

export const API_AH_USERS = `${API_HOLIDAZE}/profiles`
