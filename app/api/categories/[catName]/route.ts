import { NextResponse } from "next/server"
import Film from '@/models/film'
import { connectMongoDB } from "@/lib/mongodb"
import Category from "@/models/category"

async function findCategoryIdByCatName(catName: string) {
  const category = await Category.findOne({ catName });
  if (category) {
    return category._id; 
  }
  return null; 
}

export const GET = async (
  req: Request, 
  { params }: { params: { catName: string } }
) => {
  try {
    const catName = params.catName;
    const categoryId = await findCategoryIdByCatName(catName); 
    await connectMongoDB();

    const films = await Film.find({ category: categoryId }).populate('category');
    
    const movies = films.map((film) => {
      const {
        _id,
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
        category,
        download,
        crew,
        links,
        imageData,
      } = film;

      return {
        _id,
        title: {
          en: title?.en || '',
          fr: title?.fr || '',
        },
        originalTitle,
        copyright,
        directedBy,
        producedBy,
        author, 
        format,
        duration,
        synopsis: {
          en: synopsis?.en || '',
          fr: synopsis?.fr || '',
        },
        partner,
        createdYear,
        festivalsAndAwards,
        distribution,
        internationalSales,
        stageOfProduction,
        genre,
        category,
        download,
        crew,
        links,
        imageData,
      };
    });
    return NextResponse.json({ categoryId, catName, movies });

  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Could not fetch catName" });
  }
}
