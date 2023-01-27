import React from 'react';
import { SidebarWithHeader } from '../atoms/Navbar';

function AuthPage({ children }) {
  return <SidebarWithHeader>{children}</SidebarWithHeader>;
}

export default AuthPage;
