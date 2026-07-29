import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";

import ProtectedRoute from "./routes/ProtectedRoute";
import AdminRoute from "./routes/AdminRoute";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import VehicleListing from "./pages/VehicleListing";
import VehicleDetails from "./pages/VehicleDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";

import MyOrders from "./pages/user/MyOrders";
import OrderDetails from "./pages/user/OrderDetails";

import Dashboard from "./pages/admin/Dashboard";
import ManageVehicles from "./pages/admin/ManageVehicles";
import AddVehicle from "./pages/admin/AddVehicle";
import EditVehicle from "./pages/admin/EditVehicle";
import ManageOrders from "./pages/admin/ManageOrders";

function App() {
    return (
        <>
            <Toaster
                position="top-right"
                toastOptions={{
                    style: {
                        background: "#131417",
                        color: "#F5F5F0",
                        border: "1px solid rgba(255,255,255,0.08)",
                        fontSize: "14px",
                    },
                    success: {
                        iconTheme: {
                            primary: "#FF5A36",
                            secondary: "#0B0C0E",
                        },
                    },
                }}
            />

            <Routes>
                {/* Main Website */}
                <Route element={<MainLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />

                    <Route path="/vehicles" element={<VehicleListing />} />
                    <Route path="/vehicles/:id" element={<VehicleDetails />} />

                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    <Route element={<ProtectedRoute />}>
                        <Route path="/my-orders" element={<MyOrders />} />
                        <Route
                            path="/my-orders/:id"
                            element={<OrderDetails />}
                        />
                    </Route>

                    <Route path="*" element={<NotFound />} />
                </Route>

                {/* Admin */}
                <Route element={<AdminRoute />}>
                    <Route element={<AdminLayout />}>
                        <Route
                            path="/admin/dashboard"
                            element={<Dashboard />}
                        />

                        <Route
                            path="/admin/vehicles"
                            element={<ManageVehicles />}
                        />

                        <Route
                            path="/admin/vehicles/add"
                            element={<AddVehicle />}
                        />

                        <Route
                            path="/admin/vehicles/edit/:id"
                            element={<EditVehicle />}
                        />

                        <Route
                            path="/admin/orders"
                            element={<ManageOrders />}
                        />
                    </Route>
                </Route>
            </Routes>
        </>
    );
}

export default App;