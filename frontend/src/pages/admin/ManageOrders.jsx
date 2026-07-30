import { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";
import { FiShoppingBag } from "react-icons/fi";
import SkeletonTable from "../../components/common/SkeletonTable";
import EmptyState from "../../components/common/EmptyState";
import { orderService } from "../../services/orderService";
import { formatCurrency, statusColors } from "../../utils/format";
import { ORDER_STATUSES } from "../../utils/constants";

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  const loadOrders = useCallback(async () => {
    setLoading(true);
    try {
      const data = await orderService.getAll();
      setOrders(Array.isArray(data) ? data : data?.orders || []);
    } catch {
      setOrders([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  useEffect(() => {
    loadOrders();
  }, []);

  const handleStatusChange = async (order, status) => {
    if (status === order.status) return;
    setUpdatingId(order._id);
    try {
      await orderService.updateStatus(order._id, status);
      setOrders((prev) => prev.map((o) => (o._id === order._id ? { ...o, status } : o)));
      toast.success("Order status updated.");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Could not update order status.");
    } finally {
      setUpdatingId(null);
    }
  };

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
  return (
    <div>
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-ember">Fulfillment</p>
      <h1 className="mt-2 font-display text-3xl font-bold text-fog">Manage Orders</h1>

      <div className="mt-8 overflow-x-auto rounded-2xl border border-white/5">
        {loading ? (
          <SkeletonTable rows={6} columns={7} />
        ) : orders.length === 0 ? (
          <EmptyState icon={FiShoppingBag} title="No orders yet" message="Orders placed by customers will appear here." />
        ) : (
          <table className="w-full min-w-[800px] text-left text-sm">
            <thead>
              <tr className="border-b border-white/5 text-xs uppercase tracking-wide text-steel">
                <th className="p-4 font-medium">Customer</th>
                <th className="p-4 font-medium">Vehicle</th>
                <th className="p-4 font-medium">Quantity</th>
                <th className="p-4 font-medium">Price</th>
                <th className="p-4 font-medium">Payment</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Update</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border-b border-white/5 last:border-0">
                  <td className="p-4 text-fog">
                    {formatName(order.user?.name) || "—"}
                    <p className="text-xs text-steel">{order.user?.email}</p>
                  </td>
                  <td className="p-4 text-steel-light">
                    {formatName(order.vehicle?.make)} {formatName(order.vehicle?.model)}
                  </td>
                  <td className="p-4 text-steel-light">{order.quantity}</td>
                  <td className="p-4 font-medium text-fog">{formatCurrency(order.totalPrice)}</td>
                  <td className="p-4 text-steel-light">{order.paymentMethod}</td>
                  <td className="p-4">
                    <span className={`rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${statusColors[order.status] || "border-white/10 text-steel"}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <select
                      value={order.status}
                      disabled={updatingId === order._id}
                      onChange={(e) => handleStatusChange(order, e.target.value)}
                      className="rounded-lg border border-white/10 bg-obsidian-3 px-3 py-1.5 text-xs text-fog outline-none transition focus:border-ember/60 disabled:opacity-50"
                    >
                      {ORDER_STATUSES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ManageOrders;
