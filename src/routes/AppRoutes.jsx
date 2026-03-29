// src/routes/AppRoutes.jsx
import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
const Home = lazy(() => import("../pages/Home.jsx"));
const Login = lazy(() => import("../pages/Login.jsx"));
const Signup = lazy(() => import("../pages/Signup.jsx"));
const ForgotPassword = lazy(() => import("../pages/ForgotPassword.jsx"));
const ResetPassword = lazy(() => import("../pages/ResetPassword.jsx"));
const Sorting = lazy(() => import("../pages/Sorting.jsx"));
const Searching = lazy(() => import("../pages/Searching.jsx"));
const TreePage = lazy(() => import("../pages/TreePage.jsx"));
const LinkedListPage = lazy(() => import("../pages/LinkedListPage.jsx"));
const SortingDoc = lazy(() => import("../pages/SortingDoc.jsx"));
const Quiz = lazy(() => import("../pages/Quiz.jsx"));
const Contact = lazy(() => import("../pages/contact.jsx"));
const Privacy = lazy(() => import("../pages/privacy.jsx"));
const Terms = lazy(() => import("../pages/terms.jsx"));
const About = lazy(() => import("../pages/about.jsx"));

import NQueensPage from "@/pages/Backtracking/NQueens";
// Add other pages as needed

const AppRoutes = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/sorting" element={<Sorting />} />
        <Route path="/sorting-doc" element={<SortingDoc />} />
        <Route path="/searching" element={<Searching />} />
        <Route path="/tree" element={<TreePage />} />
        <Route path="/linkedlist" element={<LinkedListPage />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/quiz/math" element={<MathQuiz />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/about" element={<About />} />

        <Route path="/backtracking/n-queens" element={<NQueensPage />} />

        {/* Add more routes for other pages/components */}
      </Routes>
      </Suspense>
    </Router>
  );
};

export default AppRoutes;
