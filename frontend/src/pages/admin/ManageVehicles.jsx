import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { FiPlus, FiEdit2, FiTrash2, FiRefreshCw, FiTruck } from "react-icons/fi";
import SkeletonTable from "../../components/common/SkeletonTable";
import EmptyState from "../../components/common/EmptyState";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import RestockModal from "../../components/vehicle/RestockModal";
import { vehicleService } from "../../services/vehicleService";
import { formatCurrency } from "../../utils/format";

const ManageVehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [restockTarget, setRestockTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const loadVehicles = useCallback(async () => {
    setLoading(true);
    try {
      const data = await vehicleService.getAll();
      setVehicles(Array.isArray(data) ? data : data?.vehicles || []);
    } catch {
      setVehicles([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadVehicles();
  }, [loadVehicles]);

  useEffect(() => {
    loadVehicles();
  }, []);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await vehicleService.remove(deleteTarget._id);
      toast.success("Vehicle deleted.");
      setVehicles((prev) => prev.filter((v) => v._id !== deleteTarget._id));
      setDeleteTarget(null);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Could not delete this vehicle.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="relative">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-ember">Inventory</p>
          <h1 className="mt-2 font-display text-3xl font-bold text-fog">Manage Vehicles</h1>
        </div>
        <Link
          to="/admin/vehicles/add"
          className="hidden items-center gap-2 rounded-xl bg-ember px-5 py-2.5 text-sm font-semibold text-obsidian transition hover:bg-ember-light sm:flex"
        >
          <FiPlus /> Add Vehicle
        </Link>
      </div>

      <div className="mt-8 overflow-x-auto rounded-2xl border border-white/5">
        {loading ? (
          <SkeletonTable rows={6} columns={6} />
        ) : vehicles.length === 0 ? (
          <EmptyState
            icon={FiTruck}
            title="No vehicles in inventory"
            message="Add your first vehicle to get started."
            action={
              <Link to="/admin/vehicles/add" className="text-sm font-medium text-ember hover:text-ember-light">
                Add Vehicle
              </Link>
            }
          />
        ) : (
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="border-b border-white/5 text-xs uppercase tracking-wide text-steel">
                <th className="p-4 font-medium">Image</th>
                <th className="p-4 font-medium">Vehicle</th>
                <th className="p-4 font-medium">Category</th>
                <th className="p-4 font-medium">Price</th>
                <th className="p-4 font-medium">Quantity</th>
                <th className="p-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map((v) => (
                <tr key={v._id} className="border-b border-white/5 last:border-0">
                  <td className="p-4">
                    <img src={v.image} alt={v.model} className="h-12 w-16 rounded-lg object-cover" />
                  </td>
                  <td className="p-4 text-fog">
                    {v.make} {v.model}
                    <p className="text-xs text-steel">{v.year}</p>
                  </td>
                  <td className="p-4 text-steel-light">{v.category}</td>
                  <td className="p-4 font-medium text-fog">{formatCurrency(v.price)}</td>
                  <td className="p-4">
                    <span className={Number(v.quantity) <= 0 ? "text-red-400" : "text-steel-light"}>
                      {v.quantity}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1">
                      <Link
                        to={`/admin/vehicles/edit/${v._id}`}
                        aria-label="Edit"
                        className="rounded-lg p-2 text-steel transition hover:bg-white/5 hover:text-signal"
                      >
                        <FiEdit2 size={16} />
                      </Link>
                      <button
                        onClick={() => setRestockTarget(v)}
                        aria-label="Restock"
                        className="rounded-lg p-2 text-steel transition hover:bg-white/5 hover:text-ember"
                      >
                        <FiRefreshCw size={16} />
                      </button>
                      <button
                        onClick={() => setDeleteTarget(v)}
                        aria-label="Delete"
                        className="rounded-lg p-2 text-steel transition hover:bg-white/5 hover:text-red-400"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Link
        to="/admin/vehicles/add"
        aria-label="Add Vehicle"
        className="fixed bottom-6 right-6 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-ember text-obsidian shadow-[0_8px_24px_-6px_rgba(255,90,54,0.6)] transition hover:bg-ember-light sm:hidden"
      >
        <FiPlus size={22} />
      </Link>

      <ConfirmDialog
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        loading={deleting}
        title="Delete this vehicle?"
        message={deleteTarget ? `${deleteTarget.make} ${deleteTarget.model} will be permanently removed from the inventory.` : ""}
        confirmLabel="Delete"
      />

      <RestockModal
        open={!!restockTarget}
        onClose={() => setRestockTarget(null)}
        vehicle={restockTarget}
        onSuccess={() => {
          setRestockTarget(null);
          loadVehicles();
        }}
      />
    </div>
  );
};

export default ManageVehicles;
