"use client";

import React from "react";
import CardNav from "./ui/Components/CardNav/CardNav";
import {
  FileText,
  PenBox,
  GraduationCapIcon,
  Code,
  LayoutDashboard,
  StarsIcon,
  DollarSign,
  User,
} from "lucide-react";

const NavWithIcons = ({ items, ...props }) => {
  const iconMap = {
    resume: FileText,
    letter: PenBox,
    interview: GraduationCapIcon,
    code: Code,
    dashboard: LayoutDashboard,
    stars: StarsIcon,
    dollar: DollarSign,
    user: User,
  };

  const enhancedItems = items.map((item) => ({
    ...item,
    links: item.links.map((link) => ({
      ...link,
      iconComponent: iconMap[link.iconType],
    })),
  }));

  return <CardNav items={enhancedItems} {...props} />;
};

export default NavWithIcons;
