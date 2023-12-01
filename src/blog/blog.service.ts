import { validateSync } from "class-validator";

import { FindDoc } from "../types/public.types";
import { BlogIdDto, CreateBlogDto } from "./blog.dto";
import { IBlog } from "./blog.type";
import { errorHandler } from "../utils/func";
import { BlogModel } from "../model/blog.model";
export class BlogService {
    async create(blogDto: CreateBlogDto): Promise<IBlog>{
        const errors = validateSync(blogDto);
        const checkedErrors = errorHandler(errors);
        if(checkedErrors.length > 0) throw {status: 400, errors: checkedErrors, message: "validation Error"}
        const blog: IBlog = await BlogModel.create(blogDto)
        return blog
    }
    async fetchAll(): Promise<IBlog[]>{
        const blogs: IBlog[] = await BlogModel.find({});
        return blogs
    }
    async fetchByID(blogId: BlogIdDto): Promise<FindDoc<IBlog>>{
        const blog: FindDoc<IBlog> = await BlogModel.findById(blogId.id)
        console.log(blog);
        console.log(blogId.id);
        
        if(!blog) throw {status: 404, message: "notFound Blog"}
        return blog
    }
    async removeByID(blogId: BlogIdDto): Promise<string>{
        const blog: FindDoc<IBlog>= await this.fetchByID(blogId);
        const deleteResult: any = await BlogModel.deleteOne({_id: blogId.id})
        if(deleteResult.deletedCount > 0) return "deleted blog successfuly";
        return "error: cannot remove blog"
    }
}