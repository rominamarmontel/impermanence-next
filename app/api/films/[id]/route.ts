import { connectMongoDB } from "@/lib/mongodb"
import Category from "@/models/category";
import Film from "@/models/film"
import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../auth/[...nextauth]/route"

async function findCategoryIdByCatName(catName:string) {
  const category = await Category.findOne({ catName })
  if (category) {
    return category._id; 
  }
  return null; 
}

export const PUT = async (req: Request,
  {params}:{params: {id:string}})=> {
    const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({error: "Not authenticated"}, {status: 401})
  }

  const {id} = params

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


  const categoryId = catName ? await findCategoryIdByCatName(catName) : null
  await connectMongoDB()
  await Film.findByIdAndUpdate(id, {
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
  category: categoryId,
  download,
  crew,
  links,
  imageData,
  })
  return NextResponse.json({message:"Film updated"}, {status: 200})
}


export const GET = async(req:Request, {params}: {params: {id:string}}) => {
  const {id} = params
  await connectMongoDB()
  const film = await Film.findOne({_id: id}).populate('category')
  return NextResponse.json({film}, {status: 200})
}

export const DELETE = async(req:Request, {params}: {params: {id:string}}) => {
  const {id} = params
  await connectMongoDB()

  try {
    const film = await Film.findByIdAndDelete({_id: id})
    return NextResponse.json(film)   
  } catch (error) {
    console.log(error)
    return NextResponse.json({message: "Error deleting the film"})
  }
}