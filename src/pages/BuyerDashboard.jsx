import { logout, getUser } from "../utils/auth";

export default function BuyerDashboard() {
  const user = getUser();

  return (
    <div style={{ padding: "20px" }}>
      <h2>Buyer Dashboard 🛒</h2>

      <p>Welcome {user?.name}</p>
      <p>Role: {user?.role}</p>

      <h3>Create Escrow</h3>

      <input placeholder="Seller Email" />
      <br />
      <br />
      <input placeholder="Product Name" />
      <br />
      <br />
      <input placeholder="Amount" />
      <br />
      <br />

      <button>Create Escrow</button>

      <br />
      <br />

      <button onClick={logout}>Logout</button>
    </div>
  );
}
