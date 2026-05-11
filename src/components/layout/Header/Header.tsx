import { NavigationBar } from '../NavigationBar';

interface HeaderProps {
  variant?: 'default' | 'fixed';
}

export default function Header({ variant = 'default' }: HeaderProps = {}) {
  return (
    <>
      <NavigationBar variant={variant} />
    </>
  );
}
