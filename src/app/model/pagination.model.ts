export interface Page {
  number: number
  size: number
  totalElements: number
  totalPages: number
}

export interface Links {
  first: string
  last: string
  next: string
  self: string
}
