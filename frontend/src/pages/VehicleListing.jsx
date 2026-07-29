import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FiSearch, FiX, FiTruck } from "react-icons/fi";
import VehicleCard from "../components/vehicle/VehicleCard";
import { SkeletonGrid } from "../components/common/SkeletonCard";
import EmptyState from "../components/common/EmptyState";
import { vehicleService } from "../services/vehicleService";
import { useDebounce } from "../hooks/useDebounce";
import { CATEGORIES } from "../utils/constants";

const VehicleListing = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const debouncedQuery = useDebounce(query, 400);
  const search = debouncedQuery.trim();

  // Synchronizes the browser address bar search string params
  useEffect(() => {
    const params = {};

    if (search) params.q = search;
    if (category) params.category = category;
    setSearchParams(params, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, category]);

  // Fetches vehicle array items on mount or when filter inputs toggle
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError("");
      try {
        const params = {};

        if (search) params.q = search;
        if (category) params.category = category;

        const data =
          search || category
            ? await vehicleService.search(params)
            : await vehicleService.getAll();

        const list = Array.isArray(data) ? data : data?.vehicles || [];
        setVehicles(list);
      } catch (err) {
        console.error("Failed to load vehicle dashboard lists:", err);
        setError("We couldn't load the inventory right now.");
        setVehicles([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [search, category]);

  const filteredCount = vehicles.length;

  return (
    <div className="px-5 py-14 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-2">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-ember">Full inventory</p>
          <h1 className="font-display text-3xl font-bold text-fog lg:text-4xl">Vehicle Listing</h1>
        </div>

        <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-md">
            <FiSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-steel" size={16} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by make, model, or year..."
              className="w-full rounded-xl border border-white/10 bg-obsidian-2 py-3 pl-11 pr-9 text-sm text-fog placeholder:text-steel/60 outline-none transition focus:border-ember/60"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-steel hover:text-fog"
                aria-label="Clear search"
              >
                <FiX size={16} />
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-2 overflow-x-auto">
            <button
              onClick={() => setCategory("")}
              className={`shrink-0 rounded-full border px-4 py-2 text-xs font-medium transition ${category === ""
                ? "border-ember/60 bg-ember/15 text-ember"
                : "border-white/10 text-steel hover:text-fog"
                }`}
            >
              All
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`shrink-0 rounded-full border px-4 py-2 text-xs font-medium transition ${category === cat
                  ? "border-ember/60 bg-ember/15 text-ember"
                  : "border-white/10 text-steel hover:text-fog"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {!loading && !error && (
          <p className="mt-6 text-xs text-steel">
            {filteredCount} vehicle{filteredCount === 1 ? "" : "s"} found
          </p>
        )}

        {/* 
          👉 THE FIX WAS APPLIED HERE:
          We wrap this dynamic condition block in a stable grid container with 'min-h-[500px]'. 
          This guarantees Framer Motion can calculate layout heights accurately, 
          even if the data loads faster than the transition fade completes.
        */}
        <div className="mt-6 min-h-[500px] transition-all duration-300">
          {loading ? (
            <SkeletonGrid count={8} />
          ) : error ? (
            <EmptyState icon={FiTruck} title="Something went wrong" message={error} />
          ) : vehicles.length === 0 ? (
            <EmptyState
              icon={FiTruck}
              title="No vehicles match your search"
              message="Try a different keyword or clear the category filter."
            />
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {vehicles.map((v) => (
                <VehicleCard key={v._id} vehicle={v} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VehicleListing;
