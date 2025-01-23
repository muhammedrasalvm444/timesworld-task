import styled from "styled-components";

const CountryCardś = ({ imageUrl, name, regionName }: any) => {
  return (
    <Wrapper>
      <img src={imageUrl} alt={name} className="card-image" />
      <div className="card-content">
        <span className="name">{name}</span>
        <span className="region-name">{regionName}</span>
      </div>
    </Wrapper>
  );
};

export default CountryCardś;
const Wrapper = styled.div`
  border: 2px solid #3e3e3e;
  background: #fff;
  box-shadow: 8px 8px 0px 0px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 528px;
  height: 130px;
  padding: 16px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .card-image {
    height: 100%;
    width: auto;
    max-width: 127px;
    max-height: 96px;
    margin-right: 16px;
  }

  .card-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    flex-grow: 1;
  }

  .name {
    color: #3d3d3d;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }

  .region-name {
    color: #6f6f6f;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 19px;
    letter-spacing: 0.48px;
  }
`;
