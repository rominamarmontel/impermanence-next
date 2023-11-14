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
  title: {
    en: string
    fr: string
  }
  originalTitle: string
  copyright?: string
  directedBy?: string
  producedBy?: string
  author?: string
  format?: string
  duration?: string
  synopsis?: {
    en: string
    fr: string
  }
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

export type TNews = {
  _id: string,
  postTitle: string,
  post: string,
  publicId?: string,
  imageUrl?: string,
  updatedAt: string
}