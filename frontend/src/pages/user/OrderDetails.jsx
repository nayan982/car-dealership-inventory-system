import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import RevLoader from "../../components/common/RevLoader";
import EmptyState from "../../components/common/EmptyState";
import { orderService } from "../../services/orderService";
import { formatCurrency, formatDate, statusColors } from "../../utils/format";

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        // The API exposes a list endpoint rather than a single-order lookup,
        // so the matching order is resolved from the user's order history.
        const data = await orderService.getMyOrders();
        const list = Array.isArray(data) ? data : data?.orders || [];
        setOrder(list.find((o) => o._id === id) || null);
      } catch {
        setOrder(null);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) return <RevLoader label="Loading order" />;

  if (!order) {
    return (
      <div className="px-5 py-24">
        <EmptyState
          title="Order not found"
          message="This order may not belong to your account."
          action={
            <Link to="/my-orders" className="text-sm font-medium text-ember hover:text-ember-light">
              Back to My Orders
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <div className="px-5 py-14 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <Link to="/my-orders" className="inline-flex items-center gap-2 text-sm text-steel hover:text-fog">
          <FiArrowLeft size={15} /> Back to My Orders
        </Link>

        <div className="mt-6 overflow-hidden rounded-2xl border border-white/5 bg-obsidian-2">
          <img
            src={order.vehicle?.image}
            alt={order.vehicle?.model}
            className="h-56 w-full object-cover lg:h-72"
          />
          <div className="p-6 lg:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h1 className="font-display text-2xl font-bold text-fog">
                {order.vehicle?.make} {order.vehicle?.model}
              </h1>
              <span
                className={`rounded-full border px-3 py-1 text-xs font-medium ${statusColors[order.status] || "border-white/10 text-steel"}`}
              >
                {order.status}
              </span>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {[
                ["Order ID", order._id],
                ["Quantity", order.quantity],
                ["Total Price", formatCurrency(order.totalPrice)],
                ["Payment Method", order.paymentMethod],
                ["Delivery Address", order.deliveryAddress],
                ["Order Date", formatDate(order.createdAt)],
              ].map(([label, value]) => (
                <div key={label}>
                  <p className="text-xs uppercase tracking-wide text-steel">{label}</p>
                  <p className="mt-1 break-words text-sm font-medium text-fog">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
