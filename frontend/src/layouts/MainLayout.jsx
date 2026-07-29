// React Router
import { Outlet, useLocation } from "react-router-dom";

// Animation
import { AnimatePresence } from "framer-motion";

// Layout
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

// Common Components
import ScrollProgressBar from "../components/common/ScrollProgressBar";
import BackToTop from "../components/common/BackToTop";
import PageTransition from "../components/common/PageTransition";

const MainLayout = () => {
    const location = useLocation();

    return (
        <div className="flex min-h-screen flex-col bg-obsidian">
            <ScrollProgressBar />

            <Navbar />

            <main className="flex-1 pt-20">
                <AnimatePresence>
                    <PageTransition key={location.pathname}>
                        <Outlet />
                    </PageTransition>
                </AnimatePresence>
            </main>

            <Footer />

            <BackToTop />
        </div>
    );
};

export default MainLayout;