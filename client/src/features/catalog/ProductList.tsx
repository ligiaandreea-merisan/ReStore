import { Grid } from "@mui/material";
import { Product } from "../../app/models/product";
import ProductCard from "./ProductCard";

// We added the List from Catalog.tsx here + added all missing imports.
// Now error regarding "product" and we need to add an interface to tell our ProductList component
//what properties it can expect to receive from its parent component.
// Also add products and a new colon: Props to the function.
// Then update the Catalog.tsx .

interface Props {
    products: Product[];
}

export default function ProductList({products}: Props) {
    return (
        <Grid container spacing={4}>
            {products.map((product) => (
                <Grid item xs={3} key={product.id}>
                    <ProductCard product={product} />
                </Grid>
            ))}
        </Grid>
    );
}