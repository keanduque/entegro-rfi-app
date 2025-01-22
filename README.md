# Entegro Application

this app is a Entegro App created in Vite + React,
this app has a following feature below :

- Tha app has a Card view with all RFI tracking, showing the rfi_reference, da, status, types, priority, forecasts, handover date and etc. (Default display is current_status on filter is selected to "5. Set For Redesign")
- The app has API Filtering for current_status, status_entegro, DA Options and sorting to latest and oldest by id.
- The app has a Pagination in Server-side showing the result with Next and Previous button.
- Can able to search RFI Reference.
- Added prefetching for data rendering without loading again.
- The App has Skeleton Loading while fetching data from the server. (Dashboard and RFI Tracker).
- Users should be able to View the RFI Relationship for Survey as a Modal and Wayleave Tracker for Page.
- The User can easily distinguished if there is a Survey and Wayleave tasks per RFI's.
- can able to edit the Form From Assessment form into Common Form.
- added the validation and automation based on the previous RFI-MSAccess Functionality. (in-progress)
- Per RFI Card Section. the user has a capability to add, edit and delete Wayleave Tracker if there is available Wayleave.
- The initial app screen is the Dashboard containing the important information for the RFI Tracker such as:

  - For RFI Count
  - For Assessment
  - For Awaiting Forecast
  - Returns
  - On Hold
  - In Progress
  - Missed It Date
  - Hand Over
  - RMO
  - Wayleave
  - Survey

- The Dashboard also shows the DA Option Chart using ComposedChart and PieChart for Statuses.
- Can click map based on the saved data, this can redirect the user to the map.

Next Features to be added:

- Add the Single Page per RFI for more details.
- The App will having a Dark mode.
- Users of the app are entegro engineering team. They need to be logged into the application to perform tasks.
- New users can only be signed up inside the applications (to guarantee that only actual entegro engineering team can get accounts) - (need to create new Table for Users)
- Users should be able to upload an avatar, and change their name and password

---

Feature Category :

- Dashboard
- RFI Tracker List Card

  - Wayleave and Survey Forms

- Reports
- Settings

Future Enhancemente :

- Add Configuration for settings like (Constant Value for Pagination, Limits and other process)
- Dashboard enhancement
- Map Intigration using Leaflet
- Some Image Attachments for Details.

---

## Other Info:

Node version : v18.16.0

used feature-based structure for the folder inside App

In the project directory, you can run:

## Technology Decisions / 3rd party Tools

- Routing & Remote State management: ReactRouter
- Styling: Styled Components
- Remote State Management: ReactQuery
- UI State Management: Context API
- Form Management: React Hook Form
- Other Tools: React Icons,React Hot Toast,Recharts,date-fns and Superbase
- React Portal - createPortal : render a component in any place that we want inside the DOM tree.

## 3rd party installation via Terminal

#### Styled components

```node
npm i styled-components
```

#### new way of react routing with data loading in version 6.4+

```node
npm i react-router-dom@6
```

#### React-icons

```node
npm i react-icons
```

#### supabase

```node
npm install --save @supabase/supabase-js
```

#### React-Query

```node
npm i @tanstack/react-query@4
```

#### React-Query DevTools

```node
npm i @tanstack/react-query-devtools@4
```

#### date-fns modern JS date utility library

```node
npm i date-fns
```

#### react-date-picker Provides the date picker functionality.

```node
npm install react-date-picker
```

#### moment additional date library Formats the date into dd/mm/yyyy.

```node
npm install moment
```

#### A composable charting library built on React components

```node
npm i recharts@2
```

#### biggest library to implement map https://react-leaflet.js.org/

https://leafletjs.com/examples/quick-start/

```node
npm i react-leaflet leaflet
```

React Date Picker https://www.npmjs.com/package/react-datepicker

```node
npm i react-datepicker
```

TailwindCSS : https://tailwindcss.com/docs/installation
https://tailwindcss.com/docs/guides/vite

Redux Toolkit

```node
npm i @reduxjs/toolkit react-redux
```

having .env configuration for security

```node
npm install dotenv
```

---

## Backend PostgreSQL / ExpressJS

---

```node
npm run dev
```

VITE v4.5.2

➜ Local: http://localhost:5173/ <br />
➜ Network: use --host to expose <br />
➜ press h to show help

```node
npm i date-fns`
```

helper for date utility library

```node
npm i react-hot-toast
```

Smoking hot Notifications for React.

```node
npm i react-hook-form@7
```

Simple form validation with React Hook Form.

---

### `nodemon index.js` to run server using express JS

Index:
http://localhost:5000/

Endpoints:
POST : http://localhost:5000/rfis - add body field e.g: {"rfi_reference": 12345678}
GET : http://localhost:5000/rfis/ - get all rfi by list
GET : http://localhost:5000/rfis/:id - get specific rfi by id
PUT : http://localhost:5000/rfis/:id - update specific rfi by id
DELETE : http://localhost:5000/rfis/:id - delete speicific rfi by id

# Advanced React Pattern

- Render props pattern
- Compound Component Pattern

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
