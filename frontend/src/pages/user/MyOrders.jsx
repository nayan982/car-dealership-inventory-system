import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiPackage, FiArrowRight } from "react-icons/fi";
import EmptyState from "../../components/common/EmptyState";
import { SkeletonGrid } from "../../components/common/SkeletonCard";
import { orderService } from "../../services/orderService";
import { formatCurrency, formatDate, statusColors } from "../../utils/format";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await orderService.getMyOrders();
        setOrders(Array.isArray(data) ? data : data?.orders || []);
      } catch {
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="px-5 py-14 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-ember">Your account</p>
        <h1 className="mt-2 font-display text-3xl font-bold text-fog lg:text-4xl">My Orders</h1>

        <div className="mt-8">
          {loading ? (
            <SkeletonGrid count={3} />
          ) : orders.length === 0 ? (
            <EmptyState
              icon={FiPackage}
              title="No orders yet"
              message="Once you purchase a vehicle, it will show up here."
              action={
                <Link to="/vehicles" className="text-sm font-medium text-ember hover:text-ember-light">
                  Browse Inventory
                </Link>
              }
            />
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <Link
                  key={order._id}
                  to={`/my-orders/${order._id}`}
                  className="flex flex-col gap-4 rounded-2xl border border-white/5 bg-obsidian-2 p-5 transition hover:border-ember/30 sm:flex-row sm:items-center"
                >
                  <img
                    src={order.vehicle?.image}
                    alt={order.vehicle?.model}
                    className="h-24 w-full rounded-xl object-cover sm:h-20 sm:w-28"
                  />
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-display text-base font-semibold text-fog">
                        {order.vehicle?.make} {order.vehicle?.model}
                      </h3>
                      <span
                        className={`rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${statusColors[order.status] || "border-white/10 text-steel"}`}
                      >
                        {order.status}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-steel">
                      Qty {order.quantity} · {formatDate(order.createdAt)}
                    </p>
                    <p className="mt-1 text-xs text-steel">{order.deliveryAddress}</p>
                  </div>
                  <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end sm:justify-center">
                    <p className="font-display text-lg font-bold text-fog">
                      {formatCurrency(order.totalPrice)}
                    </p>
                    <FiArrowRight className="text-steel" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
