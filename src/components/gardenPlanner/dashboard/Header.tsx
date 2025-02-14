"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Bell, Settings, HelpCircle, Calendar, FileText, User, Fence, UserRound, UsersRound } from "lucide-react";

interface NavItem {
  title: string;
  description: string;
  icon: React.ReactElement;
  href: string;
}

const mainNavItems: NavItem[] = [
  {
    title: "Calendrier",
    description: "Planifiez vos cultures et suivez leur progression",
    icon: <Calendar className="size-6" />,
    href: "/calendar"
  },
  {
    title: "Jardin",
    description: "Gérez vos plantes et espaces de culture",
    icon: <Fence className="size-6" />,
    href: "/plants"
  },
  {
    title: "Wiki",
    description: "Consultez notre base de données de plantes",
    icon: <FileText className="size-6" />,
    href: "/plant-sheets"
  },
  {
    title: "Forum",
    description: "Discutez avec d'autres jardiniers",
    icon: <UsersRound className="size-6" />,
    href: "/forum"
  },
];

const MobileNav = () => {
  const pathname = usePathname();
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 block border-t border-gray-200 bg-white/80 backdrop-blur-xl md:hidden">
      <div className="mx-auto flex h-16 max-w-md items-center justify-around px-4">
        {mainNavItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.title}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 rounded-lg p-2 transition-colors",
                isActive
                  ? "text-green-600"
                  : "text-gray-500 hover:text-green-600"
              )}
            >
              {item.icon}
              <span className="text-xs font-medium">{item.title}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

const DesktopNav = () => {
  const pathname = usePathname();

  return (
    <nav className="hidden md:block">
      <ul className="flex items-center gap-1">
        {mainNavItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <li key={item.title}>
              <Link
                href={item.href}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-green-50 text-green-600"
                    : "text-gray-600 hover:bg-green-50 hover:text-green-600"
                )}
              >
                {item.icon}
                {item.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export const Header = () => {
  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <div className="flex items-center gap-8">
            <Link 
              href="/"
              className="flex items-center gap-2 rounded-lg px-2 py-1 transition-colors hover:bg-green-50"
            >
              <motion.span
                animate={{
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="text-2xl"
              >
                <img src="/_logo.svg" className="size-8" alt="Logo Carnet Potager"/>
              </motion.span>
              <span className="hidden font-bold sm:inline-block text-gray-900">
                Carnet Potager
              </span>
            </Link>

            <DesktopNav />
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-xl text-gray-600 hover:bg-green-50 hover:text-gray-900"
            >
              <Bell className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-xl text-gray-600 hover:bg-green-50 hover:text-gray-900"
            >
              <HelpCircle className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-xl text-gray-600 hover:bg-green-50 hover:text-gray-900"
            >
              <Settings className="h-5 w-5" />
            </Button>

            <div className="ml-4 h-8 w-[1px] bg-gray-200" />

            <Link
              href="/profile"
              className="gap-2 rounded-xl"
            >
              <div className="flex items-center">
                <Fence className="size-4 absolute" />
                <User className="size-6 relative -top-[.4rem] -right-2" />
              </div>
              <span className="hidden sm:inline-block">Mon Profil</span>
            </Link>
          </div>
        </div>
      </header>
      <MobileNav />
    </>
  );
};
