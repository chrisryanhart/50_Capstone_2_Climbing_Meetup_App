import React from "react";
import { render } from "@testing-library/react";
import LoginForm from './LoginForm'
import CountContext from "../UserContext";

// consider using memory router and doing a snapshot
// have to mock contextProvider


it("renders without crashing", function() {
  render(<LoginForm />);
});