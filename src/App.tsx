
import LoginPages from "./pages/auth/LoginPages"
import { Route, Routes } from "react-router-dom"
import Home from "./pages/home/Home"
import RegisterPage from "./pages/auth/RegisterPage"

import CheckOutPage from "./components/CheckOutPage"
import { useSelector } from "react-redux"
import type { RootState } from "./store"
import Notifications from "./components/Notifications"
import SearchPage from "./components/SearchPage"
import SingleProductPage from "./components/SingleProduct"
import SaveItems from "./components/SaveItems"
import ReviewPage from "./components/ReviewPage"
import AccountPage from "./components/AccountPage"
import MyOrder from "./components/MyOrder"
import CartPage from "./components/CartPage"
import Navbar from "./components/Navbar"
import { AdminRoute } from "./components/common/AdminRoute"
import AdminLayout from "./layout/AdminLayout"
import ProfilePage from "./pages/profile/ProfilePage"
import FaqPage from "./pages/faqPage/FaqPage"
import HelpCenterPage from "./pages/helpCenter/HelpCenterPage"
import AddressPage from "./pages/address/AddressPage"
import PaymentPage from "./pages/payment/PaymentPage"

const App = () => {

  const { theme } = useSelector((state: RootState) => state.theme)

  return (
    <>
      <div className={theme == "light" ? "dark" : ""}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPages />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/save-items" element={<SaveItems />} />
          <Route path="/product/:id" element={<SingleProductPage />} />
          <Route path="/review" element={<ReviewPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/orders" element={<MyOrder />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckOutPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/faqs" element={<FaqPage />} />
          <Route path="/help" element={<HelpCenterPage />} />
          <Route path="/address" element={<AddressPage />} />
          <Route path="/payments" element={<PaymentPage />} />


          <Route element={<AdminRoute />}>
            <Route path="/admin" element={<AdminLayout />} />
          </Route>
        </Routes>
      </div>
    </>
  )
}

export default App

