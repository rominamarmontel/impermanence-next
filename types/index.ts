export type TUser = {
  email: string,
  password: string
}

export type TCategory = {
  _id: string,
  catName: string
}

export type TFilm = {
  _id: string
  category: TCategory
  title: string
  originalTitle: string
  copyright?: string
  directedBy?: string
  producedBy?: string
  author?: string
  format?: string
  duration?: string
  synopsis?: string
  partner?: string
  genre?: string
  festivalsAndAwards?: string
  internationalSales?: string,
  stageOfProduction?: string,
  distribution?: string
  download?: string,
  crew?: string,
  createdYear: string
  links?: string[]
  imageData?: { url: string; publicId: string }[];
}
