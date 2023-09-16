import vPrintLogo from "../images/Logo.png";

const Logo = ({ imageWidth }: any) => {
  return (
    <>
      <img
        src={vPrintLogo}
        alt="Vinayak Prints"
        style={{ width: imageWidth, marginRight: "20px" }}
      />
    </>
  );
};

export default Logo;
