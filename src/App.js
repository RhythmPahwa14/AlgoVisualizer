import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Sorting from './pages/Sorting';
import Searching from './pages/Searching';
import DataStructures from './pages/DataStructures';
import Contributors from './components/Contributors';
import ScrollToTop from './ScrollToTop'; 
import About from './components/about';
import Contact from './components/contact';
import PrivacyPolicy from './components/Privacy';
import TermsOfService from './components/terms';
import Doubt from './components/Doubt';
import AlgorithmDocumentation from './pages/Documentation';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import './styles/components.css';
import { ThemeProvider } from './ThemeContext'; // ← import ThemeProvider

const App = () => {
    return (
        <ThemeProvider> {/* ← Wrap entire app with ThemeProvider */}
            <Router>
                <div className="app-container">
                    <Header />
                    <main className="main-content">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/sorting" element={<Sorting />} />
                            <Route path="/searching" element={<Searching />} />
                            <Route path="/data-structures" element={<DataStructures />} />
                            <Route path="/contributors" element={<Contributors />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route path="/terms" element={<TermsOfService />} />
                            <Route path="/privacy" element={<PrivacyPolicy />} />
                            <Route path="/documentation" element={<AlgorithmDocumentation />} />
                            <Route path="/signin" element={<SignIn />} />
                            <Route path="/signup" element={<SignUp />} />
                        </Routes>
                    </main>
                    <Doubt />
                    <Footer />
                    <ScrollToTop />
                </div>
            </Router>
        </ThemeProvider>
    );
};

export default App;
