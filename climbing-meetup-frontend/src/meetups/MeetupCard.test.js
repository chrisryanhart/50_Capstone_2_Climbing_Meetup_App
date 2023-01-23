import React from "react";
import { render } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import { UserProvider, regMock } from "../testUtilities";
import { MemoryRouter } from "react-router-dom";
import MeetupCard from "./MeetupCard";

it("matches snapshot", function () {

    const meetupDetails1  = {
        creator_name: 'spider man',
        creator_user_id: 1,
        date: '2023-01-05T05:00:00.000Z',
        description: 'Climb and have some beers',
        duration: 3,
        id: 1,
        location_name: 'Red River Gorge',
        time: '10:00:00',
        attendees:[{id: 2, name: 'wonder woman', status: 'pending'},{id: 3, name: 'batman', status: 'approved'},{id: 19, name: 'spongebob', status: 'pending'}]
    }

    const { asFragment } = render(
        <MemoryRouter>
            <UserProvider>
                <MeetupCard details={meetupDetails1} />
            </UserProvider>
        </MemoryRouter>

        );
    expect(asFragment()).toMatchSnapshot();

  });

it("renders without crashing", function() {

    const meetupDetails1  = {
        creator_name: 'spider man',
        creator_user_id: 1,
        date: '2023-01-05T05:00:00.000Z',
        description: 'Climb and have some beers',
        duration: 3,
        id: 1,
        location_name: 'Red River Gorge',
        time: '10:00:00',
        attendees:[{id: 2, name: 'wonder woman', status: 'pending'},{id: 3, name: 'batman', status: 'approved'},{id: 19, name: 'spongebob', status: 'pending'}]
    }

    render(
        <MemoryRouter>
            <UserProvider>
                <MeetupCard details={meetupDetails1} />
            </UserProvider>
        </MemoryRouter>

        );
});


it("loads current user meetup details", function() {

    const meetupDetails2 = {
        attendees: [{id: 1, name: 'spider man', status: 'approved'}],
        creator_name: 'wonder woman',
        creator_user_id: 2,
        date:'2023-01-10T05:00:00.000Z',
        description: 'Meetup after work',
        duration: 4,
        id: 2,
        location_name: 'Climb Lawrence',
        time: '17:00:00'
    }
    const { getByTestId, getByText } = render(
      <MemoryRouter>
        <UserProvider >
            <MeetupCard details={meetupDetails2} />
        </UserProvider>
      </MemoryRouter>
      );

    expect(getByTestId('attendee').textContent).toEqual('spider man');
    expect(getByTestId('creator-name').textContent).toEqual('wonder woman'); 
    expect(getByText('Leave Meetup')).toBeInTheDocument();

});


it("loads current user meetup details", function() {
    const meetupDetails1  = {
        creator_name: 'spider man',
        creator_user_id: 1,
        date: '2023-01-05T05:00:00.000Z',
        description: 'Climb and have some beers',
        duration: 3,
        id: 1,
        location_name: 'Red River Gorge',
        time: '10:00:00',
        attendees:[{id: 2, name: 'wonder woman', status: 'pending'},{id: 3, name: 'batman', status: 'approved'},{id: 19, name: 'spongebob', status: 'pending'}]
    }

    const meetupDetails2 = {
        attendees: [{id: 1, name: 'spider man', status: 'approved'}],
        creator_name: 'wonder woman',
        creator_user_id: 2,
        date:'2023-01-10T05:00:00.000Z',
        description: 'Meetup after work',
        duration: 4,
        id: 2,
        location_name: 'Climb Lawrence',
        time: '17:00:00'
    }
    const { getByTestId, getByText } = render(
      <MemoryRouter>
        <UserProvider >
            <MeetupCard details={meetupDetails1} />
        </UserProvider>
      </MemoryRouter>
      );

    expect(getByTestId('attendee').textContent).toEqual('batman');
    expect(getByTestId('creator-name').textContent).toEqual('spider man'); 
    expect(getByText('Manage')).toBeInTheDocument();

});
