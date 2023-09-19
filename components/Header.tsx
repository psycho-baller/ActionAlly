import Image from "next/image";
import Logo from "logo.png";

export default function Header({ className }: { className?: string }) {
  return (
    <header className={`${className}`}>
      <Image
        src={Logo}
        alt="logo"
        width="100"
        height="50"
        className="ml-3"
      />
    </header>
  );
}
