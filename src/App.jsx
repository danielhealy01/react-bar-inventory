import { useState } from "react";
import './App.css'


function FilterableProductTable({ products }) {
  const [filterText, setFilterText] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [isBeerOnly, setIsBeerOnly] = useState(false);
  const [isWineOnly, setIsWineOnly] = useState(false);

  return (
    <div>
      <SearchBar
        filterText={filterText}
        inStockOnly={inStockOnly}
        isBeerOnly={isBeerOnly}
        isWineOnly={isWineOnly}
        setIsBeerOnly={setIsBeerOnly}
        setIsWineOnly={setIsWineOnly}
        onFilterTextChange={setFilterText}
        onInStockOnlyChange={setInStockOnly}
      />
      <ProductTable
        products={products}
        filterText={filterText}
        inStockOnly={inStockOnly}
        isBeerOnly={isBeerOnly}
        isWineOnly={isWineOnly}
      />
    </div>
  );
}

function ProductCategoryRow({ category }) {
  return (
    <tr>
      <th colSpan="5">{category}</th>
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
      <td>{product.style}</td>
      <td>{product.ABV}</td>
      <td>{product.serving}</td>
      <td>{product.price}</td>
    </tr>
  );
}

function ProductTable({ products, filterText, inStockOnly, isBeerOnly, isWineOnly }) {
  const rows = [];
  let lastCategory = null;

  products.forEach((product) => {
    if (product.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
      return;
    }
    if (inStockOnly && !product.stocked) {
      return;
    }
    if (isBeerOnly && product.category !== "BEER") {
      return;
    }
    if (isWineOnly && product.category !== "WINE") {
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
      <tbody>{rows}</tbody>
    </table>
  );
}

function SearchBar({
  filterText,
  inStockOnly,
  onFilterTextChange,
  onInStockOnlyChange,
  isBeerOnly,
  setIsBeerOnly,
  isWineOnly,
  setIsWineOnly,
}) {
  return (
    <form onSubmit={(e) => {
      e.preventDefault()
    }}>
      <input
        type="text"
        className="textInput"
        value={filterText}
        placeholder="Product Search..."
        onChange={(e) => onFilterTextChange(e.target.value)}
      />
      <fieldset>
        <label>
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => onInStockOnlyChange(e.target.checked)}
          />{" "}
          Only IN STOCK
        </label>
        <label>
          {isWineOnly ? (
            <input
              disabled={true}
              type="checkbox"
              checked={isBeerOnly}
              onChange={(e) => setIsBeerOnly(e.target.checked)}
            />
          ) : (
            <input
              type="checkbox"
              checked={isBeerOnly}
              onChange={(e) => setIsBeerOnly(e.target.checked)}
            />
          )}{" "}
          Only BEER
        </label>
        <label>
          {isBeerOnly ? (
            <input
              disabled={true}
              type="checkbox"
              checked={isWineOnly}
              onChange={(e) => setIsWineOnly(e.target.checked)}
            />
          ) : (
            <input
              type="checkbox"
              checked={isWineOnly}
              onChange={(e) => setIsWineOnly(e.target.checked)}
            />
          )}{" "}
          Only WINE
        </label>
      </fieldset>
    </form>
  );
}

const PRODUCTS = [
  {
    category: "BEER",
    price: "£5.20",
    serving: "Pint",
    stocked: true,
    name: "Cosmic Dust",
    style: "IPA",
    ABV: "3.6%",
  },
  {
    category: "BEER",
    price: "£5.40",
    serving: "Pint",
    stocked: true,
    name: "Brane: Reimagined",
    style: "Stout",
    ABV: "4.6%",
  },
  {
    category: "BEER",
    price: "£5.20",
    serving: "Pint",
    stocked: true,
    name: "Studio Lager",
    style: "Lager",
    ABV: "4.0%",
  },
  {
    category: "BEER",
    price: "£5.20",
    serving: "1/2",
    stocked: true,
    name: "Jouletide",
    style: "Stout",
    ABV: "11.2%",
  },
  {
    category: "BEER",
    price: "£4.50",
    serving: "2/3",
    stocked: true,
    name: "Symmetries of Nature",
    style: "Sour",
    ABV: "4.5%",
  },
  {
    category: "BEER",
    price: "£4.20",
    serving: "2/3",
    stocked: true,
    name: "Kviek it Simple",
    style: "IPA",
    ABV: "6.0%",
  },
  {
    category: "BEER",
    price: "£5.60",
    serving: "Pint",
    stocked: true,
    name: "Termination Shock",
    style: "Pale",
    ABV: "5.4%",
  },
  {
    category: "BEER",
    price: "£4.50",
    serving: "2/3",
    stocked: true,
    name: "Planetary Alignment",
    style: "Sour",
    ABV: "7.2%",
  },
  {
    category: "BEER",
    price: "£4.20",
    serving: "2/3",
    stocked: false,
    name: "Non-Standard Candle",
    style: "IPA3",
    ABV: "6.8%",
  },
  {
    category: "BEER",
    price: "£4.20",
    serving: "1/2",
    stocked: true,
    name: "Universal Theory 3.0",
    style: "IPA",
    ABV: "8.0%",
  },
  {
    category: "WINE",
    price: "£5.50",
    serving: "125ml",
    stocked: true,
    name: "Vinho Verde",
    style: "White",
    ABV: "11.0%",
  },
  {
    category: "WINE",
    price: "£6.50",
    serving: "125ml",
    stocked: true,
    name: "Barbera d'alba",
    style: "Red",
    ABV: "13.0%",
  },
  {
    category: "WINE",
    price: "£5.50",
    serving: "125ml",
    stocked: false,
    name: "Primitivo",
    style: "Red",
    ABV: "13.5%",
  },
  {
    category: "WINE",
    price: "£6.50",
    serving: "125ml",
    stocked: true,
    name: "Pinot Gris",
    style: "White",
    ABV: "11.5%",
  },
];

export default function App() {
  return (
    <div className="mainContainer">
      <FilterableProductTable products={PRODUCTS} />
    </div>
  );
}
