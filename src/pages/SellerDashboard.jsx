import { logout, getUser } from "../utils/auth";

export default function SellerDashboard() {
  const user = getUser();

  return (
    <div style={{ padding: "20px" }}>
      <h2>Seller Dashboard 💰</h2>

      <p>Welcome {user?.name}</p>
      <p>Role: {user?.role}</p>

      <h3>Orders Waiting Delivery</h3>

      <button>Mark as Delivered</button>

      <br />
      <br />

      <button onClick={logout}>Logout</button>
    </div>
  );
}
