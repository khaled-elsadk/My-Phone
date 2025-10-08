// src/Services/productsApi.js
export async function fetchPhones(limit = 24) {
  const res = await fetch(
    `https://dummyjson.com/products/category/smartphones?limit=${limit}`
  );
  if (!res.ok) throw new Error("Failed to fetch products");
  const data = await res.json();

  return (data.products || []).map((p) => {
    const seed = encodeURIComponent(`${p.id}-${p.title}`); // deterministic seed
    const main = `https://picsum.photos/seed/${seed}/800/600`;
    const alt1 = `https://picsum.photos/seed/${seed}-2/800/600`;
    const alt2 = `https://picsum.photos/seed/${seed}-3/800/600`;

    return {
      id: String(p.id),
      name: p.title,
      brand: p.brand || "Brand",
      price: Number(p.price),
      image: main,                 // main image (HD)
      images: [main, alt1, alt2],  // gallery images
      description: p.description || "Smartphone",
    };
  });
}
