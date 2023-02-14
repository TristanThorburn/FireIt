Fire It:

Netlify Hosting             https://peppy-khapse-d2cdad.netlify.app/

Created to explore the logic of some of the Point of Sale systems I used while working in a prior carrer, and also to demonstrate how working with them lead me to pursue an industry change.

Primarily inspired by my 3 years working exclusively with Squirrel (https://www.squirrelsystems.com/)

Tristan Thorburn 2023


                                    CHANGELOG:
                                    2023-02-13

-------------------------------------------------------------------------------------------------------
Admin ('Back-end') Dashboard

-Table Map Settings:
    -Allow adding / deleting and editing design style of tables in table map database


**********************************************************************************************************
                                    2023-02-12
                                Start of Changelog


Keypad / Login:

-Used to replicate touch screen logic used by Front of House Staff in lieu of server badge/card

-Currently using firebase auth with additional data pushed to account for email/password requirements
    -4 Digit user ID, 🔥 (Submit), 4 digit user password, 🔥 (Submit),

-------------------------------------------------------------------------------------------------------
Summary / Dashboard:

-Log in navigates user to summary screen showing current set up for table map / floor plan, pulled from data

-Future tabs for:
    - menu items
    - check tab
    - payment tab

-Lower nav shows logged in firebase user with future options

-Admin Tab auths an admin user comparing 4 digit pin to authorized users array

-------------------------------------------------------------------------------------------------------
Admin ('Back-end') Dashboard

-Replicate the user interface of the main data computer to set up information for the summary dashboard mechanics to utilize

-Menu Entry Setup:
    -Add / Store items for the menu that can be added to table bills, organized by categories / subcategory
    -like the original system initial items can be created with just a name, any current data populates placeholders in form or is displayed for the user

-Employee Setup:
    -Add / Store employee data, current data is populated via placeholder or other display, ability to add employees to firebase 'authenticating' from data entered into the employee form

-Table Map Settings:
    -Update the display of the table map on the front end summary dash which pulls table locations from this saved data.

-Future sections for:
    - payment data
    - misc settings


