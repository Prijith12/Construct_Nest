import AddProduct from "./_components/add-products"
import ProductsTable from "./_components/products-table"

function page() {
  return (
    <div className="px-4 py-4">
      <h1 className="admin-heading">Manage Products</h1>
      <div className='flex justify-end pt-3 pr-4'>
                <AddProduct />
            </div>
            <div className='mt-2 mb-3 md:mb-28'>
                <ProductsTable/>
            </div>
      </div>
  )
}


export type Product={
  productId?:number
  name: string
  price: number
  rating: number|null
  unit: string|null
  image: string
}

export default page
