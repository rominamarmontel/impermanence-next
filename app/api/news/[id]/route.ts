import { getServerSession } from "next-auth/next"
import { authOptions } from "../../auth/[...nextauth]/route"
import { NextResponse } from "next/server"
import { connectMongoDB } from "@/lib/mongodb"
import News from "@/models/news"

export const PUT = async(req: Request,
  {params}:{params: {id:string}}) => {
    const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({error: "Not authenticated"}, {status: 401})
  }

  const {id} = params

  const {
    postTitle,
    post,
    imageUrl,
    publicId,
  } = await req.json()

  await connectMongoDB()
  await News.findByIdAndUpdate(id,
    {
      postTitle,
      post,
      imageUrl,
      publicId,
    })
    return NextResponse.json({message:"Film updated"}, {status: 200})
  }


  export const GET = async(req:Request, {params}: {params: {id:string}}) => {
    const {id} = params
    await connectMongoDB()
    const post = await News.findOne({_id: id})
  return NextResponse.json({post}, {status: 200})
  }

  export const DELETE = async(req:Request, {params}: {params: {id: string}}) => {
    const {id} = params
    await connectMongoDB()
    try {
      const post = await News.findByIdAndDelete({_id: id})
      return NextResponse.json(post)  
    } catch (error) {
      return NextResponse.json({message: "Error deleting the post"})
    }
  }