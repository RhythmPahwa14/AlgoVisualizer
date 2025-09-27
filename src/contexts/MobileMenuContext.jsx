import React, { createContext, useContext, useState } from 'react';

const MobileMenuContext = createContext();

export const useMobileMenu = () => {
  const context = useContext(MobileMenuContext);
  if (!context) {
    throw new Error('useMobileMenu must be used within a MobileMenuProvider');
  }
  return context;
};

export const MobileMenuProvider = ({ children }) => {
  const [isNavbarMenuOpen, setIsNavbarMenuOpen] = useState(false);
  const [isFooterMenuOpen, setIsFooterMenuOpen] = useState(false);

  const openNavbarMenu = () => {
    setIsFooterMenuOpen(false);
    setIsNavbarMenuOpen(true);
  };

  const closeNavbarMenu = () => {
    setIsNavbarMenuOpen(false);
  };

  const openFooterMenu = () => {
    setIsNavbarMenuOpen(false);
    setIsFooterMenuOpen(true);
  };

  const closeFooterMenu = () => {
    setIsFooterMenuOpen(false);
  };

  const closeAllMenus = () => {
    setIsNavbarMenuOpen(false);
    setIsFooterMenuOpen(false);
  };

  const value = {
    isNavbarMenuOpen,
    isFooterMenuOpen,
    openNavbarMenu,
    closeNavbarMenu,
    openFooterMenu,
    closeFooterMenu,
    closeAllMenus
  };

  return (
    <MobileMenuContext.Provider value={value}>
      {children}
    </MobileMenuContext.Provider>
  );
};