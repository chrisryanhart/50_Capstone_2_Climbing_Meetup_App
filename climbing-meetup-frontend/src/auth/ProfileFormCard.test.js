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


it("submits form when submit button pushed", function() {
    const registerMock = jest.fn()

    const {getByText, getByLabelText } = render(
      <MemoryRouter>
        <UserProvider registerUser={registerMock} >
            <ProfileFormCard />
        </UserProvider>
      </MemoryRouter>
      );
    
    const formTitle = getByText('Complete New Profile Form:');
    // expect(submitFormMock)

    expect(formTitle).toBeInTheDocument();

    const submitButton = getByText('Submit');

    fireEvent.click(submitButton);

    // expect(regMock).toHaveBeenCalled();

    expect(registerMock).toHaveBeenCalled();

    // console.log('test');

    // expect(getByText('New Meetup Form')).toBeInTheDocument();
    
});