import React, { useState, VFC } from "react";
import productData from "./data.json";
import "./mock.css";

type Product = {
  category: string;
  price: number;
  stocked: boolean;
  name: string;
};

const Mock: VFC = () => {
  const PRODUCTS = JSON.parse(JSON.stringify(productData));
  return <FilterableProductTable products={PRODUCTS} />;
};

const FilterableProductTable: VFC<{ products: Product[] }> = ({ products }) => {
  const [state, setState] = useState({
    filterText: "",
    inStockOnly: false,
  });
  const handleFilterTextChange = (filterText: string) => {
    setState((prev) => ({ ...prev, filterText: filterText }));
  };
  const handleInStockChange = (inStockOnly: boolean) => {
    setState((prev) => ({ ...prev, inStockOnly: inStockOnly }));
  };
  return (
    <fieldset>
      <legend>Filterable Product Table</legend>
      <SearchBar
        filterText={state.filterText}
        inStockOnly={state.inStockOnly}
        onFilterTextChange={handleFilterTextChange}
        onInStockChange={handleInStockChange}
      />
      <ProductTable
        products={products}
        filterText={state.filterText}
        inStockOnly={state.inStockOnly}
      />
    </fieldset>
  );
};

const SearchBar: VFC<{
  filterText: string;
  inStockOnly: boolean;
  onFilterTextChange: (filterText: string) => void;
  onInStockChange: (inStockOnly: boolean) => void;
}> = ({ filterText, inStockOnly, onFilterTextChange, onInStockChange }) => {
  const handleFilterTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterTextChange(e.target.value);
  };
  const handleInStockChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onInStockChange(e.target.checked);
  };
  return (
    <form>
      <input
        type="text"
        placeholder="Search..."
        value={filterText}
        onChange={handleFilterTextChange}
      />
      <p>
        <label>
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={handleInStockChange}
          />
          Only show products in stock
        </label>
      </p>
    </form>
  );
};

const ProductTable: VFC<{
  products: Product[];
  filterText: string;
  inStockOnly: boolean;
}> = ({ products, filterText, inStockOnly }) => {
  const rows: React.ReactNode[] = [];
  let lastCategory = "";

  // const categoryList = products
  //   .map((product) => {
  //     if (product.name.indexOf(filterText) === -1) return "";
  //     if (inStockOnly && !product.stocked) return "";
  //     return product.category;
  //   })
  //   .filter((category, index, categories) => {
  //     return categories.indexOf(category) === index;
  //   });
  // console.log(categoryList);

  // categoryList.forEach((category) => {
  //   rows.push(<ProductCategoryRow category={category} key={category} />);
  //   products.forEach((product) => {
  //     if (product.category === category && product.name === filterText) {
  //       rows.push(<ProductRow product={product} key={product.name} />);
  //     }
  //   });
  // });

  products.forEach((product) => {
    if (!product.name.includes(filterText)) return;
    if (inStockOnly && !product.stocked) return;
    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category}
        />
      );
    }
    rows.push(<ProductRow product={product} key={product.name} />);
    lastCategory = product.category;
  });

  console.log(rows);

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
};

const ProductCategoryRow: VFC<{ category: string }> = ({ category }) => {
  return (
    <tr>
      <th colSpan={2}>{category}</th>
    </tr>
  );
};
const ProductRow: VFC<{ product: Product }> = ({ product }) => {
  const name = product.stocked ? (
    product.name
  ) : (
    <span style={{ color: "red" }}>{product.name}</span>
  );
  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
};

export default Mock;
