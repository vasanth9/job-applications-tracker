# GEMINI.md - Technical Context

## Project Overview

This project is a modern, responsive job application tracker built with vanilla JavaScript, HTML, and CSS. It provides a clean and intuitive user interface for managing and tracking the status of job applications.

## Architecture

The application is designed with a three-pane, email-style layout:

*   **Sidebar (Navigation):** A left-hand sidebar allows users to filter applications by their status ("All", "Applied", "Interviewing", "Offer", "Rejected") or view the analytics page.
*   **Main Pane:** The main content area displays either the list of job applications or the analytics view, based on the sidebar selection.
*   **Detail Pane:** When viewing applications, the right-hand pane displays the detailed information of the selected application.

On mobile devices, the layout adapts to a single-pane view, with the sidebar and detail pane accessible as sliding overlays.

## Data Schema

The application's data is stored in `data/applications.json`. The agent should treat `data/applications.json` as read-only, and any schema changes should be tested on `data/mock_applications.json`. Each application object in the JSON array has the following structure:

```json
{
    "company": "string",
    "role": "string",
    "status": "string (Applied, Interviewing, Offer, or Rejected)",
    "link": "string (URL to the job posting)",
    "notes": "string",
    "location": "string",
    "portal": "string (e.g., LinkedIn, Indeed)",
    "appliedDate": "string (YYYY-MM-DD)",
    "interviewDate": "string (YYYY-MM-DD) or null",
    "offerDate": "string (YYYY-MM-DD) or null",
    "rejectedDate": "string (YYYY-MM-DD) or null"
}
```

## Analytics View

The analytics view provides insights into the user's job application activity. It consists of two main parts:

1.  **Summary Bar Charts:** Bar charts that show a summary of application statuses for "Today", "This Week", and "This Month".
2.  **Application Trends Line Chart:** An interactive line chart that visualizes the number of applications over time. The user can filter the chart by a date range and by application status.

## External Libraries

*   **Chart.js:** Used to render the line chart in the analytics view. The library is loaded via a CDN in `index.html`.

## Running the Application

To run this application locally, you need to serve the files using a simple HTTP server due to browser security restrictions (CORS).

1.  Make sure you have Python installed.
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

4.  Open your web browser and navigate to `http://localhost:8000`.
