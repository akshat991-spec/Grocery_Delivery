import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { Link, useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import ProductCard from "../components/ProductCard";

const ProductDetails = () => {
    const { products, navigate, currency, addToCart } = useAppContext();
    const { id } = useParams();

    
    const [thumbnail, setThumbnail] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);

    useEffect(() => {
        if (products.length > 0) {
            const currentProduct = products.find((item) => item._id === id);

            if (currentProduct) {
                setThumbnail(currentProduct.image[0] ? currentProduct.image[0] : null);

                let productsCopy = products.slice();
                productsCopy = productsCopy.filter(
                    (item) => 
                        item.category === currentProduct.category && item._id !== currentProduct._id
                ); 

                setRelatedProducts(productsCopy.slice(0, 5));
            }
        }
    }, [products, id]); 
    
    // Loading state
    if (products.length === 0) {
        return <div className="flex justify-center items-center h-[80vh]">Loading...</div>;
    }

    // Find the product after we've confirmed products are loaded
    const product = products.find((item) => item._id === id);

    // Not Found state
    if (!product) {
        return <div className="flex flex-col justify-center items-center h-[80vh]">
            <h2 className="text-3xl font-bold text-primary">Product Not Found</h2>
            <p className="mt-2 text-gray-500">The product you are looking for does not exist.</p>
            <button onClick={() => navigate('/')} className="mt-4 px-6 py-2 bg-primary text-white rounded-md">Go to Home</button>
        </div>;
    }

    // Success state (render the component)
    return (
        <div className="mt-12">
            <p className="text-sm md:text-base break-words"> 
                <Link to={"/"} className="hover:text-primary">Home</Link> / 
                <Link to={"/products"} className="hover:text-primary"> Products</Link> / 
                <Link to={`/products/${product.category.toLowerCase()}`} className="capitalize hover:text-primary"> {product.category}</Link> / 
                <span className="text-gray-500"> {product.name}</span>
            </p>

            <div className="flex flex-col md:flex-row gap-10 md:gap-16 mt-4">
                <div className="flex gap-3">
                    <div className="flex flex-col gap-3">
                        {product.image.map((image, index) => (
                            <div key={index} onClick={() => setThumbnail(image)} className="border max-w-24 border-gray-500/30 rounded overflow-hidden cursor-pointer">
                                <img src={image} alt={`Thumbnail ${index + 1}`} />
                            </div>
                        ))}
                    </div>

                    <div className="border border-gray-500/30 rounded overflow-hidden flex-grow flex items-center justify-center">
                        <img src={thumbnail} alt="Selected product" className="max-w-full max-h-full object-contain" />
                    </div>
                </div>

                <div className="text-sm w-full md:w-1/2">
                    <h1 className="text-3xl font-medium">{product.name}</h1>

                    <div className="flex items-center gap-0.5 mt-1">
                        {Array(5).fill('').map((_, i) => (
                                <img key={i} src={i < 4 ? assets.star_icon : assets.star_dull_icon} alt="" className="md:w-4 w-3.5" />
                        ))}
                        <p className="text-base ml-2">(4)</p>
                    </div>

                    <div className="mt-6">
                        <p className="text-gray-500/70 line-through">MRP: {currency}{product.price}</p>
                        <p className="text-2xl font-medium text-primary">MRP: {currency}{product.offerPrice}</p>
                        <span className="text-gray-500/70">(inclusive of all taxes)</span>
                    </div>

                    <p className="text-base font-medium mt-6">About Product</p>
                    <ul className="list-disc ml-4 text-gray-500/70 space-y-1">
                        {product.description.map((desc, index) => (
                            <li key={index}>{desc}</li> 
                        ))}
                    </ul>

                    <div className="flex items-center mt-10 gap-4 text-base">
                        <button onClick={() => addToCart(product._id)} className="w-full py-3.5 cursor-pointer font-medium bg-gray-700 text-white hover:bg-gray-800 transition rounded-md">
                            Add to Cart
                        </button>
                        <button onClick={() => { addToCart(product._id); navigate("/cart") }} className="w-full py-3.5 cursor-pointer font-medium bg-primary text-white hover:bg-primary-dull transition rounded-md">
                            Buy Now
                        </button>
                    </div>
                </div>
            </div>
           
            <div className="flex flex-col items-center mt-20">
                <div className="flex flex-col items-center w-max">
                    <p className="text-3xl font-medium">Related Products</p>
                    <div className="w-20 h-0.5 bg-primary rounded-full mt-2"></div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5 mt-6 w-full">
                    {relatedProducts.filter((p) => p.inStock).map((p, index) =>(
                        <ProductCard key={index} product={p} />
                    ))}
                </div>

                <button onClick={() => { navigate('/products'); window.scrollTo(0, 0) }} className="mx-auto cursor-pointer px-12 my-16 py-2.5 border rounded-2xl text-primary hover:bg-primary/10 transition">See More</button>
            </div>
        </div>
    );
};

export default ProductDetails;