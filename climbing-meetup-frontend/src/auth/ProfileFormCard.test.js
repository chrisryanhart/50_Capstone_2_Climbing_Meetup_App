import React from "react";
import { render, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import ProfileFormCard from "./ProfileFormCard";
import { UserProvider, regMock } from "../testUtilities";
import { MemoryRouter } from "react-router-dom";


it("renders without crashing", function() {
    render(
      <MemoryRouter>
          <UserProvider>
              <ProfileFormCard />
          </UserProvider>
      </MemoryRouter>

    );
});


it("detects snapshot changes", function() {

    const { asFragment } = render(
      <MemoryRouter>
        <UserProvider  >
            <ProfileFormCard />
        </UserProvider>
      </MemoryRouter>
      );  
    
    expect(asFragment()).toMatchSnapshot();
});


