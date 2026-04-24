import { createBrowserRouter } from "react-router-dom";
import { routePaths } from "../config/routes";
import { MainLayout } from "../layouts/MainLayout";
import { AboutPage } from "../pages/About";
import { AdminLitePage } from "../pages/AdminLite";
import { BuyPropertiesPage } from "../pages/BuyProperties";
import { ContactPage } from "../pages/Contact";
import { HomePage } from "../pages/Home";
import { LocalitiesPage } from "../pages/Localities";
import { LocalityDetailPage } from "../pages/LocalityDetail";
import { NotFoundPage } from "../pages/NotFound";
import { PropertyDetailPage } from "../pages/PropertyDetail";
import { RentPropertiesPage } from "../pages/RentProperties";
import { SellPropertyPage } from "../pages/SellProperty";

export const router = createBrowserRouter([
  {
    path: routePaths.home,
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: routePaths.buy, element: <BuyPropertiesPage /> },
      { path: routePaths.rent, element: <RentPropertiesPage /> },
      { path: routePaths.sell, element: <SellPropertyPage /> },
      { path: routePaths.propertyDetail, element: <PropertyDetailPage /> },
      { path: routePaths.localities, element: <LocalitiesPage /> },
      { path: routePaths.localityDetail, element: <LocalityDetailPage /> },
      { path: routePaths.about, element: <AboutPage /> },
      { path: routePaths.contact, element: <ContactPage /> },
      { path: routePaths.adminLite, element: <AdminLitePage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);
