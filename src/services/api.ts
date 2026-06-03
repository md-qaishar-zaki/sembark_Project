const BASE_URL = "https://api.escuelajs.co/api/v1";

export const getProducts = async (
  categoryId?: number,
  sort?: string
) => {
  let url = `${BASE_URL}/products`;

  if (categoryId) {
    url = `${BASE_URL}/categories/${categoryId}/products`;
  }

  const res = await fetch(url);
  let data = await res.json();

  if (sort === "lowToHigh") {
    data.sort((a: any, b: any) => a.price - b.price);
  }

  if (sort === "highToLow") {
    data.sort((a: any, b: any) => b.price - a.price);
  }

  return data;
};

export const getCategories = async () => {
  const res = await fetch(`${BASE_URL}/categories`);
  return res.json();
};

export const getProductById = async (id: string) => {
  const res = await fetch(`${BASE_URL}/products/${id}`);
  return res.json();
};