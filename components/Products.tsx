import ProductCard from "./ProductCard";
import { products } from "@/lib/data";

export default function Products() {
  return (
    <section className="products container" id="products" aria-label="Featured products">
      <div className="products__grid">
        {products.map((p, i) => (
          <ProductCard key={p.id} product={p} delay={i * 0.1} />
        ))}
      </div>
    </section>
  );
}
