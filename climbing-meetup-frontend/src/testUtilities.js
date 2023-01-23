import React from "react";
import UserContext from "./UserContext";

// const demoUser = {
//   username: "testuser",
//   first_name: "testfirst",
//   last_name: "testlast",
//   email: "test@test.net",
//   photo_url: null,
// };

// token
const userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ0ZXN0dXNlcjEiLCJpYXQiOjE2NzQ0MzYyMDZ9.m7tigic9I4D58MYFqDDBmc7cnZTSB5qtLkij5-Ol36A';

const regMock = jest.fn();

const UserProvider =
    ({ children, currUserId = 1, token=userToken, registerUser={regMock}}) => (
    <UserContext.Provider value={{ currUserId, token, registerUser }}>
      {children}
    </UserContext.Provider>
);

export { UserProvider,regMock };