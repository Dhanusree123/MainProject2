export type Scraper = {
    id:string,
    category:string,
    brand:string,
    slug:string,
    store:string,
    storeId:string,
    expired:boolean,
    active:boolean,
    categoryId:string,
    categoryPath:string,
    code:string,
    handPicked:boolean,
    brandId:string,
    sales?:string[],
    dealPrice:number,
    description:string,
    images:string[],
    listPrice:number,
    mrp:number,
    rating:number,
    reviews:number,
    title:string
}

// Type '(data: AddProductType) => void' is not assignable to type '(data: Scraper) => void'.
//   Types of parameters 'data' and 'data' are incompatible.
//     Type 'Scraper' is missing the following properties from type '{ id: string; brand: string; code: string; store: string; handPicked: boolean; category: string; slug: string; dealPrice: number; description: string; images: string[]; listPrice: number; mrp: number; rating: number; reviews: number; title: string; }': store, handPicked, slug