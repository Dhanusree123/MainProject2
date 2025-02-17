import { SubmitHandler } from "react-hook-form";
import { z } from "zod";

export const ProductSchema = z.object({
    id:z.string(),
    brand:z.string().min(1,"Brand is required"),
    code:z.string().min(1,"CODE is required"),
    active:z.boolean(),
    expired:z.boolean(),
    categoryPath:z.string().min(1,"Category is required"),
    store:z.string().min(1,"Category is reguired"),
    handPicked:z.boolean(),
    slug:z.coerce.string().min(1,"URL Slug must be longer than 16 characters"),
    dealPrice:z.coerce.number().gt(0,"Deal price must be greater than 0"),
    description:z.string().min(32,"Description must be longer than 32 characters"),
    images:z.array(z.string()).min(1,"Please add atleast one image"),
    listPrice:z.coerce.number().gt(0,"List price must be greater than 0"),
    mrp:z.coerce.number().gt(0,"MRP must be greater than 0"),
    rating:z.coerce.number().gte(0,"Rating must be greater than or equal to 0"),
    reviews:z.coerce.number().gte(0,'Review must be greater than or equla to 0'),
    title:z.string().min(3,"Title must be at least 3 characters long")
})
export type IProduct = z.infer<typeof ProductSchema>;

export const AddProduct = ProductSchema.omit({active:true,expired:true}).strict()
.refine(data=>data.listPrice<= data.mrp,{
    message:"List price must be less than or equal to MRP",
    path:["listPrice"],
}).refine(data=>data.dealPrice<=data.listPrice,{
    message:"Deal price must be less than or equal to List price",
    path:["dealPrice"]
});

export type AddProductType = z.infer<typeof AddProduct>

export type FieldType = {
    fields:{
        name:keyof AddProductType,
        label:string,
        type?:string,
    }[],
    onSubmit:SubmitHandler<AddProductType>
}