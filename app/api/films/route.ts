import { connectMongoDB } from "@/lib/mongodb"
import Category from "@/models/category";
import Film from "@/models/film"
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server"
import { authOptions } from "../auth/[...nextauth]/route";

async function findCategoryIdByCatName(catName:string) {
  const category = await Category.findOne({ catName })
  if (category) {
    return category._id; 
  }
  return null; 
}

export const POST = async (req:Request) => {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({error: "Not authenticated"}, {status: 401})
  }

  const {
    title, 
    originalTitle,
    copyright,
    directedBy,
    producedBy,
    author,
    format,
    duration,
    synopsis,
    partner,
    createdYear,
    festivalsAndAwards,
    distribution,
    internationalSales,
    stageOfProduction,
    genre,
    category: catName,
    download,
    crew,
    links,
    imageData,
} = await req.json()
const parsedTitle = JSON.parse(title);
const parsedSynopsis = JSON.parse(synopsis);


const categoryId = await findCategoryIdByCatName(catName)
await connectMongoDB()
const newFilm = await Film.create({
  title: {
    en: parsedTitle.en,
    fr: parsedTitle.fr,
  },
  originalTitle,
  copyright,
  directedBy,
  producedBy,
  author,
  format,
  duration,
  synopsis: {
    en: parsedSynopsis.en,
    fr: parsedSynopsis.fr,
  },
  partner,
  createdYear,
  festivalsAndAwards,
  distribution,
  internationalSales,
  stageOfProduction,
  genre,
  category: categoryId,
  download,
  crew,
  links,
  imageData,
})
await newFilm.save();
  return NextResponse.json({response: newFilm})
}


export const GET = async(req:Request) => {
  await connectMongoDB()
  const films = await Film.find().sort({ updatedAt: -1 })
  const filmsWithCategories = await Promise.all(
    films.map(async (film) => {
      if (film.category) {
        const categoryObject = await Category.findById(film.category);
        return { ...film.toObject(), category: categoryObject };
      }
      return film.toObject();
    })
  );

  return NextResponse.json(filmsWithCategories)
}

// export const DELETE = async(req:NextRequest) => {
//   const id = req.nextUrl.searchParams.get('id')
//   await connectMongoDB()
//   await Film.findByIdAndDelete(id)
//   return NextResponse.json({message:"Film deleted"}, {status: 200})
// }