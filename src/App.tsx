import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Search from "./components/pages/Search";
import Details from "./components/pages/Details";
import Favorites from "./components/pages/Favorites";
import Home from "./components/pages/Home";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";

const pageVariants = {
  initial: { opacity: 0, y: 12, filter: "blur(6px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: { opacity: 0, y: -8, filter: "blur(6px)" },
};

const pageTransition = {
  duration: 0.4,
  ease: [0.16, 1, 0.3, 1] as const,
};

function Page({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
      className="w-full"
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 overflow-y-hidden">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <Page>
                  <Home />
                </Page>
              }
            />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/search" element={<Search />} />
            <Route
              path="/details/:id"
              element={
                <Page>
                  <Details />
                </Page>
              }
            />
          </Routes>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
