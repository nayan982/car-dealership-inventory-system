import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiTruck, FiShoppingBag, FiAlertTriangle } from "react-icons/fi";
import { FaIndianRupeeSign } from "react-icons/fa6";
import StatCard from "../../components/dashboard/StatCard";
import SkeletonTable from "../../components/common/SkeletonTable";
import EmptyState from "../../components/common/EmptyState";
import { vehicleService } from "../../services/vehicleService";
import { orderService } from "../../services/orderService";
import { formatCurrency, formatDate, statusColors } from "../../utils/format";

const Dashboard = () => {
  const [vehicles, setVehicles] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [vehicleData, orderData] = await Promise.all([
          vehicleService.getAll(),
          orderService.getAll(),
        ]);
        setVehicles(Array.isArray(vehicleData) ? vehicleData : vehicleData?.vehicles || []);
        setOrders(Array.isArray(orderData) ? orderData : orderData?.orders || []);
      } catch {
        setVehicles([]);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const formatName = (str) => {
    if (!str) return "";

    return str
      .toLowerCase()
      .split(" ")
      .map(
        (word) =>
          word.charAt(0).toUpperCase() +
          word.slice(1)
      )
      .join(" ");
  };
  const totalRevenue = orders.filter((order) => order.status === "Delivered")
    .reduce((sum, order) => sum + (Number(order.totalPrice) || 0), 0);
  const outOfStock = vehicles.filter((v) => Number(v.quantity) <= 0).length;
  const recentOrders = [...orders]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 6);

  return (
    <div>
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-ember">Overview</p>
      <h1 className="mt-2 font-display text-3xl font-bold text-fog">Dashboard</h1>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={FiTruck} label="Total Vehicles" value={loading ? "—" : vehicles.length} />
        <StatCard icon={FiShoppingBag} label="Total Orders" value={loading ? "—" : orders.length} accent="text-signal" />
        <StatCard icon={FaIndianRupeeSign} label="Total Revenue" value={loading ? "—" : formatCurrency(totalRevenue)} accent="text-emerald-400" />
        <StatCard icon={FiAlertTriangle} label="Out of Stock" value={loading ? "—" : outOfStock} accent="text-red-400" />
      </div>

      <div className="mt-10">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl font-semibold text-fog">Recent Orders</h2>
          <Link to="/admin/orders" className="text-sm font-medium text-ember hover:text-ember-light">
            View all
          </Link>
        </div>

        <div className="mt-5 overflow-x-auto rounded-2xl border border-white/5">
          {loading ? (
            <SkeletonTable rows={5} columns={5} />
          ) : recentOrders.length === 0 ? (
            <EmptyState title="No orders yet" message="Orders will show up here as customers purchase vehicles." />
          ) : (
            <table className="w-full min-w-150 text-left text-sm">
              <thead>
                <tr className="border-b border-white/5 text-xs uppercase tracking-wide text-steel">
                  <th className="p-4 font-medium">Customer</th>
                  <th className="p-4 font-medium">Vehicle</th>
                  <th className="p-4 font-medium">Total</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order._id} className="border-b border-white/5 last:border-0">
                    <td className="p-4 text-fog">{formatName(order.user?.name) || "—"}</td>
                    <td className="p-4 text-steel-light">
                      {formatName(order.vehicle?.make)} {formatName(order.vehicle?.model)}
                    </td>
                    <td className="p-4 font-medium text-fog">{formatCurrency(order.totalPrice)}</td>
                    <td className="p-4">
                      <span className={`rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${statusColors[order.status] || "border-white/10 text-steel"}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="p-4 text-steel">{formatDate(order.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
