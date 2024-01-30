import React, { useState } from "react";

export const CoffeeMachine = () => {
  const [order, setOrder] = useState([]);
  const [size, setSize] = useState("");
  const [quan, setQuan] = useState(0);
  const [bill, setBill] = useState(false);
  const handleSize = (e) => {
    setSize(e.target.value);
  };
  const handleQuantity = (e) => {
    setQuan(parseInt(e.target.value));
  };
  const handleSubmit = () => {
    if (size && quan > 0) {
      setOrder([...order, { size, quan }]);
      setSize("");
      setQuan(0);
      setBill(true);
    } else {
      alert("select a size and quantity");
    }
  };
  const calculateBill = () => {
    let totalAmount = 0;
    order.forEach((el) => {
      switch (order.size) {
        case "small":
          totalAmount += 1.5 * el.quan;
          break;
        case "medium":
          totalAmount += 2 * el.quan;
          break;
        case "large":
          totalAmount += 2.5 * el.quan;
          break;
        default:
          break;
      }
    });
    return totalAmount.toFixed(2);
  };
  return (
    <div>
      <h1>Coffee Machine</h1>
      {!bill && (
        <div>
          <label>
            Select
            <select value={size} onChange={handleSize}>
              <option value="">Select Size</option>
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </label>
          <label>
            quantity:
            <input
              type="number"
              min="1"
              value={quan}
              onChange={handleQuantity}
            />
          </label>
          <button onClick={handleSubmit}>Order</button>
        </div>
      )}
      {bill && (
        <div>
          <h2>Bill Breakdown</h2>
          <ul>
            {order.map((el, index) => (
              <li key={index}>
                {el.quan} {el.size} coffee
              </li>
            ))}
          </ul>
          <p>Total Amount: ${calculateBill()}</p>
          <button onClick={() => window.location.reload()}>
            Place Another Order
          </button>
        </div>
      )}
    </div>
  );
};
