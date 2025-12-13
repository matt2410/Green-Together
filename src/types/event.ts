export interface Event {
  id: string
  title: string
  description: string
  location: string
  lat: number
  lng: number
  images: string[]
  startDate: string // ISO string
  endDate: string   // ISO string
}