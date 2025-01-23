import { useEffect, useState } from "react";
import { Container, Row, Col, Button, Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav } from "react-bootstrap";
import axios from "axios";
import styled from "styled-components";
import CountryCard from "../components/CountryCard/CountryCard";
import Footer from "../components/Footer/Footer";
import { useDispatch } from "react-redux";
import { logoutUser } from "../features/userSlice";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [apiData, setApiData] = useState<
    {
      name: string;
      region: string;
      flag: string;
      independent: boolean;
    }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedMenu, setSelectedMenu] = useState("All");
  const [page, setPage] = useState<number>(1); // Start from page 1
  const [pageSize] = useState<number>(20); // Number of countries per page
  const [activeCarouselIndex, setActiveCarouselIndex] = useState<number>(0);

  const handleSelectCarousel = (selectedIndex: number) => {
    setActiveCarouselIndex(selectedIndex);
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
    toast.success("Loggedout successfullyś");
    navigate("/login");
  };

  const handleSelect = (eventKey: any) => {
    setSelectedMenu(
      eventKey === "#asia"
        ? "Asia"
        : eventKey === "#europe"
        ? "Europe"
        : eventKey === "#all"
        ? "All"
        : ""
    );
  };

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1); // Increment page number
  };

  // Filter data based on the selected menu (region) and paginate
  const filteredData =
    selectedMenu === "All"
      ? apiData
      : apiData.filter((country) => country.region === selectedMenu);

  const countriesToShow = filteredData.slice(0, page * pageSize); // Show countries based on current page

  useEffect(() => {
    const fetchApiData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://restcountries.com/v2/all?fields=name,region,flag`
        );
        setApiData(response.data); // Store the entire data set
      } catch (err) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchApiData();
  }, []);
  return (
    <Wrapper>
      <Navbar className="custom-navbar" expand="lg">
        <Container>
          {/* Align the Brand to the left */}
          <Navbar.Brand className="brand-heading me-auto" href="#home">
            Countries
          </Navbar.Brand>

          {/* Toggle button for responsive collapse */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          {/* Collapsible Navbar */}
          <Navbar.Collapse id="basic-navbar-nav">
            {/* Align navigation links to the right */}
            <Nav className="ms-auto" onSelect={handleSelect}>
              <Nav.Link
                className={`menu-item ${selectedMenu === "All" && "selected"}`}
                href="#all"
              >
                All
              </Nav.Link>
              <Nav.Link
                className={`menu-item ${selectedMenu === "Asia" && "selected"}`}
                href="#asia"
              >
                Asia
              </Nav.Link>
              <Nav.Link
                className={`menu-item ${
                  selectedMenu === "Europe" && "selected"
                }`}
                href="#europe"
              >
                Europe
              </Nav.Link>
              <Nav.Link
                onClick={() => {
                  handleLogout();
                }}
              >
                Logout
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container style={{ minHeight: "30rem" }}>
        <div className="heading-container">
          <span className="line"></span>
          <h1 className="heading">WELCOME</h1>
          <span className="line"></span>
        </div>{" "}
        <div
          style={{
            display: "flex",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          {/* Carousel Section */}
          <div
            style={{
              flex: 3,
              border: "2px solid #a1a1a1",
              borderRadius: "10px",
              overflow: "hidden",
            }}
          >
            <Carousel
              onSelect={handleSelectCarousel}
              style={{ height: "491px" }}
              nextIcon={<span style={{ backgroundColor: "black" }} />}
              prevIcon={<span style={{ backgroundColor: "black" }} />}
            >
              {countriesToShow.map((item, index) => (
                <Carousel.Item key={index}>
                  <img className="d-block w-100" src={item?.flag} />
                </Carousel.Item>
              ))}
            </Carousel>
          </div>

          {/* Frame Section */}
          <div
            className="frame-section"
            style={{
              flex: 1,
              border: "2px solid #ddd",
              borderRadius: "10px",
              backgroundColor: "#f9f9f9",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              className="d-block w-100"
              src={countriesToShow[activeCarouselIndex]?.flag}
            />
          </div>
        </div>
        {/* </div> */}
        <Row className="mt-3">
          {loading && <div>Loading...</div>}
          {error && <div>{error}</div>}

          {countriesToShow.length > 0 ? (
            countriesToShow.map((item, index) => (
              <Col
                key={index}
                sm={12}
                md={6}
                lg={6}
                xl={6}
                className="mb-3 ml-1 mr-1"
              >
                <CountryCard
                  imageUrl={item?.flag}
                  name={item?.name}
                  regionName={item?.region}
                />
              </Col>
            ))
          ) : (
            <div>No countries available</div>
          )}
        </Row>
        {filteredData.length > countriesToShow.length && (
          <Row className="mt-3 text-center">
            <Col>
              <Button onClick={loadMore} variant="dark">
                Load More
              </Button>
            </Col>
          </Row>
        )}
      </Container>

      <div style={{ marginTop: "2rem" }}>
        <Footer />
      </div>
    </Wrapper>
  );
};

export default HomePage;

const Wrapper = styled.div`
  width: 100%;
  padding: 0 13rem;

  @media (max-width: 1200px) {
    padding: 0 5rem;
  }

  @media (max-width: 768px) {
    padding: 0 2rem;
  }

  .country-class {
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .carousel-item img {
    width: 807px;
    height: 498px;
    object-fit: cover; /* Ensures the image scales without distortion */
    margin: 0 auto; /* Centers the images horizontally */
  }

  .carousel {
    max-width: 807px; /* Matches the width */
    margin: 0 auto; /* Centers the entire carousel */
  }

  .custom-navbar {
    background-color: white;
    position: sticky;
    top: 0;
    z-index: 1000;
    padding: 0.5rem 1rem;
    display: flex;
    justify-content: space-between;
    width: 100%;
    box-shadow: 0 1px 0px rgba(0, 0, 0, 0.1); /* Subtle shadow effect */
  }
  @media (max-width: 900px) {
    .frame-section {
      display: none;
    }
  }

  .brand-heading {
    color: #3d3d3d;
    font-family: "Noto Sans";
    font-size: 1.25rem;
    font-weight: 600;

    @media (max-width: 768px) {
      font-size: 1.25rem;
      color: #3d3d3d;
      font-family: "Noto Sans";
      font-weight: 600;
    }
  }

  .heading-container {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 2rem 0;
    flex-wrap: wrap; /* Wrap lines on smaller screens */
  }

  .line {
    flex-grow: 1;
    height: 2px;
    background-color: #000;
    margin: 0 10px;
  }

  .heading {
    font-size: 2rem;
    font-weight: bold;
    text-transform: uppercase;
    color: #333;
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    .heading-container {
      flex-direction: column; /* Stack items vertically */
    }

    .line {
      width: 50%; /* Adjust line width for small screens */
      margin: 5px 0; /* Add margin for spacing */
    }

    .heading {
      font-size: 1.5rem; /* Adjust font size */
    }
  }

  .menu-item {
    color: #8b8b8b;
    font-family: "Noto Sans";
    font-size: 1rem;
    font-weight: 600;
    text-decoration: none;
    padding: 0.5rem;

    &:hover,
    &.selected {
      color: #3d3d3d;
    }

    &::after {
      content: "";
      display: block;
      width: 0;
      height: 2px;
      background-color: #3d3d3d;
      transition: width 0.3s ease-in-out;
    }

    &:hover::after,
    &.selected::after {
      width: 100%;
    }
  }

  @media (max-width: 768px) {
    .menu-item {
      font-size: 0.9rem;
      padding: 0.25rem;
    }
  }
`;
