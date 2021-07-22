import React, { FormEvent, useState, useCallback } from "react"
import { SearchResults } from "../components/SearchResults";

type Product = {
  id: number;
  title: string;
  price: number;
  formattedPrice: string;
}

type Results = {
  totalPrice: number;
  data: Product[];
}

export default function Home() {
  const [search, setSearch] = useState('');

  const [results, setResults] = useState<Results>({
    totalPrice: 0,
    data: []
  });

  const addToWishlist = useCallback(async (id: number) => {
    console.log(id);
  }, [])

  async function handleSearch(event: FormEvent) {
    event.preventDefault();

    if (!search.trim()) {
      return;
    }

    const response = await fetch(`http://localhost:3333/products?q=${search}`)
    const data: Product[] = await response.json();

    const formatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });

    const products = data.map(product => {
      return {
        id: product.id,
        title: product.title,
        price: product.price,
        formattedPrice: formatter.format(product.price)
      };
    })

    const totalPrice = data.reduce((total, product) => {
      return total + product.price;
    }, 0);

    setResults({ totalPrice, data: products });
  }

  return (

    <div>
      <h1>Search</h1>

      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <SearchResults
        results={results.data}
        totalPrice={results.totalPrice}
        onAddToWishlist={addToWishlist}
      />

    </div>
  )
}