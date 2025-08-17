import { useState } from 'react';

import logo from '@/assets/logox.png';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar } from '@heroui/avatar';
import { Button } from '@heroui/button';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@heroui/dropdown';
import {
  Navbar as Nav,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from '@heroui/navbar';
import { cn } from '@heroui/theme';
import { Link, useRouter } from '@tanstack/react-router';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Nav
      classNames={{
        base: cn('border-default-100', {
          'bg-default-200/50 dark:bg-default-100/50': isMenuOpen,
        }),
        item: 'hidden md:flex',
      }}
      height="80px"
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      isBlurred
      maxWidth="2xl"
    >
      {/* Left Content */}
      <NavbarBrand>
        <Link to="/" className="flex items-center justify-center">
          <div className="bg-foreground text-background rounded-full">
            <img
              src={logo}
              alt="logo"
              height="48"
              width="48"
              className="!bg-current"
            />
          </div>
          <span className="ml-2 text-lg font-extrabold tracking-widest">
            GRINDSTONE
          </span>
        </Link>
      </NavbarBrand>

      {/* Center Content */}
      {/* <NavbarContent justify="end">
        <NavbarItem>
          <Link to="/dashboard">Dashboard</Link>
        </NavbarItem>
      </NavbarContent> */}

      {/* Right Content */}
      <NavbarContent className="!flex-grow-0" justify="end">
        <NavbarItem className="ml-8 !flex gap-2">
          <AuthButtons />
        </NavbarItem>
      </NavbarContent>
    </Nav>
  );
};

const AuthButtons = () => {
  const { session } = useAuth();

  console.log(session?.access_token)

  const isLoggedIn = !!session?.user;

  return isLoggedIn ? (
    <UserDropdown />
  ) : (
    <>
      <Button
        as={Link}
        radius="full"
        color="primary"
        variant="shadow"
        // className="text-default-500 [&.active]:font-bold"
        to="/login"
      >
        Sign In
      </Button>
    </>
  );
};

const UserDropdown = () => {
  const { signOut } = useAuth();
  const router = useRouter();

  const logout = async () => {
    await signOut();
    router.invalidate();
  };

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <button className="mt-1 h-8 w-8 cursor-pointer transition-transform outline-none">
          <Avatar size="md" src="https://i.pravatar.cc/150?u=a04258114e29526708c" />
        </button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Profile Actions" variant="flat">
        <DropdownItem key="profile" className="h-14 gap-2">
          <p className="font-semibold">Signed in as</p>
          <p className="font-semibold">johndoe@example.com</p>
        </DropdownItem>
        <DropdownItem key="dashboard">
          <Link to="/dashboard">Dashboard</Link>
        </DropdownItem>
        <DropdownItem key="settings">My Settings</DropdownItem>
        <DropdownItem key="logout" color="danger" onPress={logout}>
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
