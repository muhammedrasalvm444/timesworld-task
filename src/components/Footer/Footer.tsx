import FbIcon from "../../assets/FbIcon";
import Twitter from "../../assets/Twitter";
import Linkedin from "../../assets/Linkedin";
import Youtube from "../../assets/Youtube";
import styled from "styled-components";

const index = () => {
  return (
    <Wrapper>
      <div className="icon-row">
        <FbIcon />
        <Twitter />
        <Linkedin />
        <Youtube />
      </div>
      <div className="email-row">
        <p>Example@gmail.com</p>
      </div>
      <div className="copyright-row">
        <p>Copyright &copy; 2020 Name.All rights reserved</p>
      </div>
    </Wrapper>
  );
};

export default index;
const Wrapper = styled.footer`
  .footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: white;
    /* padding: 20px; */
    position: fixed;
    bottom: 0;
    width: 100%;
  }

  .icon-row {
    display: flex;
    gap: 20px;
    align-items: center;
    justify-content: center;
  }

  .email-row,
  .copyright-row {
    margin-top: 10px;
    text-align: center;
  }
`;
