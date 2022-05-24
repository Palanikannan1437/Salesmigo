import Image from "next/image";
import salesmigoLogo from "../../public/salesmigo_logo.png";
export default function Logo({ ...rest }) {
  return (
    <>
      <Image src={salesmigoLogo} width="80" height="70" />
    </>
  );
}
