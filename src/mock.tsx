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
    filterText: "Foo",
    isStockOnly: false,
  });
  return (
    <fieldset>
      <legend>Filterable Product Table</legend>
      <SearchBar
        filterText={state.filterText}
        isStockOnly={state.isStockOnly}
      />
      <ProductTable
        products={products}
        filterText={state.filterText}
        isStockOnly={state.isStockOnly}
      />
    </fieldset>
  );
};

const SearchBar: VFC<{ filterText: string; isStockOnly: boolean }> = ({
  filterText,
  isStockOnly,
}) => {
  return (
    <form>
      <input type="text" placeholder="Search..." value={filterText} />
      <p>
        <label>
          <input type="checkbox" checked={isStockOnly} />
          Only show products in stock
        </label>
      </p>
    </form>
  );
};

const ProductTable: VFC<{
  products: Product[];
  filterText: string;
  isStockOnly: boolean;
}> = ({ products, filterText, isStockOnly }) => {
  const categoryList = products
    .map((product) => {
      if (product.name.indexOf(filterText) === -1) return "";
      if (isStockOnly && !product.stocked) return "";
      return product.category;
    })
    .filter((category, index, categories) => {
      return categories.indexOf(category) === index;
    });
  console.log(categoryList);

  const rows: React.ReactNode[] = [];

  categoryList.forEach((category) => {
    rows.push(<ProductCategoryRow category={category} key={category} />);
    products.forEach((product) => {
      if (product.category === category && product.name === filterText) {
        rows.push(<ProductRow product={product} key={product.name} />);
      }
    });
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
