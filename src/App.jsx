import { useState } from "react";

function FilterableProductTable({ products }) {
  const [filterText, setFilterText] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);

  return (
    <div>
      <SearchBar
        filterText={filterText}
        inStockOnly={inStockOnly}
        onFilterTextChange={setFilterText}
        onInStockOnlyChange={setInStockOnly}
      />
      <ProductTable
        products={products}
        filterText={filterText}
        inStockOnly={inStockOnly}
      />
    </div>
  );
}

function ProductCategoryRow({ category }) {
  return (
    <tr>
      <th colSpan="4">{category}</th>
    </tr>
  );
}

function ProductRow({ product }) {
  const name = product.stocked ? (
    product.name
  ) : (
    <span style={{ color: "red" }}>{product.name}</span>
  );

  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
      <td>{product.serving}</td>
      <td>{product.ABV}</td>
    </tr>
  );
}

function ProductTable({ products, filterText, inStockOnly }) {
  const rows = [];
  let lastCategory = null;

  products.forEach((product) => {
    if (product.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
      return;
    }
    if (inStockOnly && !product.stocked) {
      return;
    }
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
}

function SearchBar({
  filterText,
  inStockOnly,
  onFilterTextChange,
  onInStockOnlyChange,
}) {
  return (
    <form>
      <input
        type="text"
        value={filterText}
        placeholder="Search..."
        onChange={(e) => onFilterTextChange(e.target.value)}
      />
      <label>
        <input
          type="checkbox"
          checked={inStockOnly}
          onChange={(e) => onInStockOnlyChange(e.target.checked)}
        />{" "}
        Only show products in stock
      </label>
    </form>
  );
}

const PRODUCTS = [
  {
    category: "BEER",
    price: "£5.20",
    serving: "Pint",
    stocked: true,
    name: "IPA1",
    ABV: "3.6%",
  },
  {
    category: "BEER",
    price: "£5.40",
    serving: "Pint",
    stocked: true,
    name: "Stout1",
    ABV: "4.6%",
  },
  {
    category: "BEER",
    price: "£5.20",
    serving: "Pint",
    stocked: true,
    name: "Lager",
    ABV: "4.0%",
  },
  {
    category: "BEER",
    price: "£5.20",
    serving: "1/2",
    stocked: true,
    name: "Stout2",
    ABV: "11.2%",
  },
  {
    category: "BEER",
    price: "£4.50",
    serving: "2/3",
    stocked: true,
    name: "Sour1",
    ABV: "4.5%",
  },
  {
    category: "BEER",
    price: "£4.20",
    serving: "2/3",
    stocked: true,
    name: "IPA2",
    ABV: "6.0%",
  },
  {
    category: "BEER",
    price: "£5.60",
    serving: "Pint",
    stocked: true,
    name: "Pale",
    ABV: "5.4%",
  },
  {
    category: "BEER",
    price: "£4.50",
    serving: "2/3",
    stocked: true,
    name: "Sour2",
    ABV: "7.2%",
  },
  {
    category: "BEER",
    price: "£4.20",
    serving: "2/3",
    stocked: false,
    name: "IPA3",
    ABV: "6.8%",
  },
  {
    category: "BEER",
    price: "£4.20",
    serving: "1/2",
    stocked: true,
    name: "IPA4",
    ABV: "8.0%",
  },
  {
    category: "WINE",
    price: "£5.50",
    serving: "125ml",
    stocked: true,
    name: "Vinho Verde",
    ABV: "11.0%",
  },
  {
    category: "WINE",
    price: "£6.50",
    serving: "125ml",
    stocked: true,
    name: "Barbera d'alba",
    ABV: "13.0%",
  },
  {
    category: "WINE",
    price: "£5.50",
    serving: "125ml",
    stocked: false,
    name: "Primitivo",
    ABV: "13.5%",
  },
  {
    category: "WINE",
    price: "£6.50",
    serving: "125ml",
    stocked: true,
    name: "Pinot Gris",
    ABV: "11.5%",
  },
];

export default function App() {
  return <FilterableProductTable products={PRODUCTS} />;
}
