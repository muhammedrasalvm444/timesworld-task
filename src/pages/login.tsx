import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Illustration from "../../src/assets/Illustration.svg";
import { Col, Form, Row } from "react-bootstrap";
import FbIcon from "../assets/FbIcon";
import Twitter from "../assets/Twitter";
import Linkedin from "../assets/Linkedin";
import Youtube from "../assets/Youtube";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { loginUser } from "../features/userSlice";
import { toast } from "sonner";

// Validation Schema
const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/\d/, "Password must contain at least one number")
    .matches(
      /[@$!%*?&#]/,
      "Password must contain at least one special character"
    )
    .required("Password is required"),
});

type LoginFormInputs = {
  email: string;
  password: string;
};

const LoginPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(loginSchema),
  });

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector((state: RootState) => state.user.users);

  const onSubmit = (data: LoginFormInputs) => {
    const userExists = users.find(
      (user: { email: string }) =>
        user.email.toLowerCase() === data.email.toLowerCase()
    );

    if (userExists) {
      if (userExists.password === data.password) {
        dispatch(loginUser(data));
        navigate("/home");
        toast.success("Login sucessfull.");
      } else {
        toast.error("Incorrect password.");
      }
    } else {
      toast?.error("User does not exist. Please create an account.");
    }
  };

  return (
    <StyledContainer>
      <Row className="home-page-row mt-3" gutter={26}>
        <Col lg={6} md={6} sm={12} xs={12}>
          <StyledFormWrapper>
            <StyledHeader>Sign In</StyledHeader>
            <div>
              <StyledPTag>
                New user?{" "}
                <span
                  onClick={() => {
                    navigate("/sign-up");
                  }}
                  style={{ cursor: "pointer" }}
                >
                  Create an Account
                </span>
              </StyledPTag>
            </div>
            <Form className="form" noValidate onSubmit={handleSubmit(onSubmit)}>
              <Form.Group className="mb-3">
                <Form.Control
                  {...register("email")}
                  type="text"
                  required
                  placeholder="Username or Email"
                  style={{
                    border: "2px solid #3e3e3e",
                    backgroundColor: "#fff",
                    height: "48px",
                    width: "17rem",
                    padding: "12px",
                    borderRadius: 0,
                  }}
                />
                {/* Error message */}
                {errors.email && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "0.875rem",
                      marginTop: "4px",
                      width: "17rem",
                    }}
                  >
                    {errors.email.message}
                  </p>
                )}
                {/* </div> */}
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput2"
              >
                <Form.Control
                  {...register("password")}
                  type="password"
                  required
                  placeholder="Password"
                  style={{
                    border: "2px solid #3e3e3e",
                    backgroundColor: "#fff",
                    height: "48px",
                    width: "17rem",
                    padding: "12px",
                    borderRadius: 0,
                  }}
                />
                {errors.password && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "0.875rem",
                      marginTop: "4px",
                      width: "17rem",
                    }}
                  >
                    {errors.password.message}
                  </p>
                )}
              </Form.Group>

              <Form.Check
                type={"checkbox"}
                id={`default-checkbox`}
                label={"Keep me signed in"}
                style={{ marginBottom: "1.8125rem" }}
                className="custom-checkbox"
              />
              <button type="submit" className="sign-in-button">
                Sign In
              </button>
              <div
                className="horizontal-rule-container"
                style={{ margin: "1rem 0" }}
              >
                <div className="horizontal-rule"></div>
                <div className="text-center">Or Sign In With</div>
                <div className="horizontal-rule"></div>
              </div>
              <div className="icon-row">
                <FbIcon />
                <Twitter />
                <Linkedin />
                <Youtube />
              </div>
            </Form>
          </StyledFormWrapper>
        </Col>
        <Col
          lg={6}
          md={6}
          className="d-none d-md-block text-center d-flex  align-items-right justify-content-end"
        >
          <img
            src={Illustration}
            alt="Illustration"
            style={{ height: "25rem", width: "40rem" }}
          />
        </Col>
      </Row>
    </StyledContainer>
  );
};

export default LoginPage;

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  .home-page-row {
    justify-content: space-between;
    align-items: center;
    width: 100vw;
    padding: 2rem 14rem;
    height: 100vh;
  }

  .icon-row {
    display: flex;
    gap: 1.25rem;
    align-items: center;
    justify-content: center;
  }
  .sign-in-button {
    background-color: #3c3c3c;
    height: 3rem;
    border: none;
    color: #fff;
    font-size: 1rem;
    font-style: normal;
    font-weight: 600;
    width: 100%;
  }
  .horizontal-rule-container {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 1.25rem 0;
  }

  .horizontal-rule {
    flex-grow: 1;
    border-top: 0.125rem solid #cfcfcf;
  }

  .custom-checkbox {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 600;
    font-size: 1rem;
  }
  .custom-checkbox .form-check-input {
    width: 1.5rem;
    height: 1.5rem;
    border: 0.125rem solid #333333;
    background-color: white;
    cursor: pointer;
  }

  .custom-checkbox .form-check-input:checked {
    background-color: #000000;
    border-color: #000000;
  }

  .custom-checkbox .form-check-label {
    font-size: 1rem;
    margin-left: 0.5rem;
    color: #555555;
  }
`;

const StyledPTag = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: #3d3d3d;
  span {
    font-size: 1rem;
    font-weight: 600;
    color: #587fff;
  }
`;

const StyledFormWrapper = styled.div`
  width: 100%;
  max-width: 25rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: start;
`;

const StyledHeader = styled.h3`
  text-align: center;
  color: #333333;
`;
