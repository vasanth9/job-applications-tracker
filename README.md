# Job Application Tracker

A simple, modern, and responsive web application to track your job applications.

## Features

*   **Email-style UI:** A clean and intuitive three-pane layout inspired by modern email clients.
*   **Status Filtering:** Filter applications by status (Applied, Interviewing, Offer, Rejected).
*   **Detailed View:** Click on an application to see detailed information, including dates, location, notes, and a link to the original job posting.
*   **Mobile Responsive:** The application is fully responsive and provides a great user experience on both desktop and mobile devices.
*   **Modal Job Posting:** View job postings directly within the application in a convenient modal window.
*   **Application Trends:** Visualize your application trends over time with a line chart, with options to filter by date range and status.
*   **Data-driven:** The application is powered by a simple `applications.json` file, making it easy to manage your application data.

## Getting Started

To run this application locally, you'll need to serve the files using a simple HTTP server. This is necessary because of browser security restrictions (CORS) that prevent JavaScript from fetching local files directly.

A simple way to do this is to use Python's built-in HTTP server.

1.  Make sure you have Python installed on your system.
2.  Open your terminal in the project's root directory.
3.  Run one of the following commands:

    **For Python 3:**
    ```bash
    python3 -m http.server
    ```

    **For Python 2:**
    ```bash
    python -m SimpleHTTPServer
    ```

4.  Once the server is running, open your web browser and navigate to `http://localhost:8000` to see the application in action.

## How to Use

*   **Edit `data/applications.json`:** To add, remove, or update your job applications, simply edit the `data/applications.json` file.
*   **Use `data/mock_applications.json` for testing:** The `data/mock_applications.json` file is provided with sample data for testing purposes. To use it, simply change the `dataFile` variable in `src/script.js` to point to this file.
