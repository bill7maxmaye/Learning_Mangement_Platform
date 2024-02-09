import Image from "next/image";

const Logo = () => {
  return (
    <div className="p-6">
      <Image src="/logo.svg" alt="logo" width={130} height={130} />
    </div>
  );
};

export default Logo;
