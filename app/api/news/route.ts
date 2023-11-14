import { connectMongoDB } from "@/lib/mongodb"
import News from "@/models/news"
import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/route";


export const GET = async(req:Request) => {
  await connectMongoDB()
  const posts = await News.find()
  return NextResponse.json(posts)
}

export const POST = async(req:Request) => {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({error: "Not authenticated"}, {status: 401})
  }

  const {
    postTitle,
    post,
    imageUrl,
    publicId,
  } = await req.json()

  await connectMongoDB()
  const newPost = await News.create({
    postTitle,
    post,
    imageUrl,
    publicId,
  })
  await newPost.save()
  return NextResponse.json({response:newPost})
}