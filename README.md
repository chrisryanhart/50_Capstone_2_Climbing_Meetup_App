# Climbing Meetup App

**URL Link:** _https://climbing-meetup.surge.sh/

**Overview:**

The Climbing Meetup App helps climbers facilitate climbing sessions with other climbers.   Schedule coordination is key because a second climber has to belay the active climber.  As such, this app is tailored to climbers with busy, dynamic schedules and climbers new to the area find a climbing partner.  Users can search existing meetups and request to join.  If no desireable meetups are found, the user can create a new meetup and coordinate with attendees that request to join.  All user meetups, both past and future, can be monitored from their custom profile. 



 - **Database Schema Model:**
 ![db schema model](database_schema.png?raw=true  "database_schema")



**Features Implemented:**

1. User profile creation
	* Users share details to help identify a better climbing match
	* Users can review their own profile and meetups
	* To help other users identify a good climbing partner, users are enabled to review other user profiles


2. Review all meetups at the climbing gym
 * All meetups, both past and future, can be reviewed
 * Creator and attendee icons are linked to their respective profiles for the user to review
 * This allows the user to identify a list of all schools with their field of study.
 * All confirmed attendees are displayed

3. Attendees request to join a meetup or leave
 * Users request to join via the join meetup button
 * Confirmed users can leave the meetup 
 
4. Meetup creators attendee management
 * Creators can approve or reject any pending attendees
 * Confirmed attendees can also be removed
 
5. Profile edit and delete capability
 * Users can edit or delete their own profile

6. Meetup creator edit and delete capability
 * Users can edit or delete meetups they created

 
**Step-by-step User guide:**

1. Create new profile or login to existing profile.
2. Review profile.  If desired, user can edit the profile.
3. User can review all future and past events.
4. If a user wants to find more events, the user can browse all future meetups.
5. The user can request to join existing meetups.
6. If no ideal times and/or partners are found, the user can create a new meetup
7. When attendees request to join the user's new meetup, they can approve or decline join requests. 


**Steps to Run Backend Tests**

1. Download repo to a local directory
2. Change directory to the 'climbing-meetup-backend' subfolder
3. Install the package.json packages via 'npm install'
4. Create a '.env' file.  Open and set "NODE_ENV='test".
5. Create a postgreSQL database named climbing_meetup_test.
6. Seed the database using the command 'psql < climbing-meetup.sql' in the terminal
7. Enter the 'jest' into the terminal.  All tests should run and pass.  

**Steps to Run Frontend Tests**

1. Open a new terminal
2. Change directory to the 'climbing-meetup-frontend' subdirectory
3. Enter the command 'npm test'. Then select 'a' to run all tests.


**Technology Stack Used:**

* Node with the express framework was used for backend
* React and javascript were used on frontend
* PostgreSQL was used for the database

Addition Technologies used

1. bcrypt was used for encrypted password protection



**App Installation Instructions if running locally**

1. Clone the respository to a new directory on your local machine

2. Go to the climbing-meetup-backend.  Use the 'npm install' command in the CLI.

3. Go to the climbing-meetup-frontend.  Use the 'npm install' command in the CLI.

4.  Create a new postgreSQL database named 'climbing_meetup'

5.  Change the database title to 'climbing_meetup' in all of the .sql files.

6.  In the root directory, use the command 'psql < climbing-meetup.sql'

7.  Ensure the .env file in the 'climbing-meetup-backend' subdirectory is not set to "NODE_ENV='test".

8. In the 'climbing-meetup-frontend' subdirectory, use the 'npm start' command.  A new browser window will open with the home screen.