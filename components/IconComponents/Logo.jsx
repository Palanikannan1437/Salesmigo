import styled from "@emotion/styled";
import Image from "next/image";
import salesmigoLogo from "../../public/salesmigo_logo.png";
import OverTitle from "../PageStructureComponents/OverTitle";
import RichText from "../PageStructureComponents/RichText";

export default function Logo({ ...rest }) {
  return (
    <>
      <Image src={salesmigoLogo} width="80" height="70" />
      <RichText>
        <CustomeRichText>Salesmigo</CustomeRichText>
      </RichText>
    </>
  );
}

const CustomeRichText = styled.div`
  font-size: 3rem;
  position: relative;
  left: 6px;
  top: 10px;
`;
