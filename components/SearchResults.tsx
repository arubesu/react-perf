import { List, ListRowRenderer } from 'react-virtualized'
import { ProductItem } from "./ProductItem";

interface SearchResultsProps {
  results: Array<{
    id: number;
    price: number;
    title: string;
    formattedPrice: string;
  }>,
  onAddToWishlist: (id: number) => void;
  totalPrice: number;
}

export function SearchResults({ totalPrice, results, onAddToWishlist }: SearchResultsProps) {

  const rowRenderer: ListRowRenderer = ({ index, key, style }) => {
    return (
      <div key={key} style={style}>
        <ProductItem
          product={results[index]}
          onAddToWishlist={onAddToWishlist}
        />
      </div>
    );
  }

  return (
    <div>
      <h2>{totalPrice}</h2>
      <List
        height={500}
        rowHeight={25}
        width={900}
        overscanRowCount={5}
        rowCount={results.length}
        rowRenderer={rowRenderer}
      />
    </div>
  );
}