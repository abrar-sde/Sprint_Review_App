# Sprint Review Dashboard

The Sprint Review Dashboard is a comprehensive web application designed to manage and facilitate sprint reviews in Agile teams. The app allows team members to collaborate in real-time during sprint reviews, ensuring that feedback is collected efficiently and stored securely.

## Features

- **User Authentication**: Secure signup and login.
- **Admin Controls**: Admins can create new sprint reviews, and only admins have access to the "Create New Meeting" feature.
- **Sprint Review Form**: A well-designed, interactive form for collecting feedback during sprint reviews. It includes a timer, and users can save their inputs.
- **Past Reviews**: View and manage all past sprint reviews with a detailed and animated UI.

## Getting Started

### Prerequisites

- Ruby (version 2.7.0 or higher)
- Rails (version 6.1.0 or higher)
- Node.js (version 14.x or higher)
- Sqlite

### Installation

1. **Clone the repository**:

    ```bash
    git clone https://github.com/yourusername/sprint-review-dashboard.git
    cd sprint-review-dashboard
    ```

2. **Backend Setup**:

    ```bash
    cd Backend
    bundle install
    rails db:create
    rails db:migrate
    rails db:seed (if any seed data is necessary)
    ```

3. **Frontend Setup**:

    ```bash
    cd ../Frontend
    npm install
    npm start
    ```

4. **Run the Servers**:

    Start the Rails API server:

    ```bash
    cd Backend
    rails s
    ```

    Start the React development server:

    ```bash
    cd ../Frontend
    npm start
    ```

    The React app should now be running on `http://localhost:3001`, and the Rails API should be running on `http://localhost:3000`.

## Usage

- **Admin Login**: Use the admin credentials to log in and access the dashboard.
- **Create a Sprint Review**: Click on "Create New Meeting" to start a new sprint review. The sprint review form will appear, where you can input feedback.
- **Real-Time Review**: During the sprint review, the form and timer are synchronized across all users in real-time.
- **Save Reviews**: Once the timer ends, the inputs can be saved, and the review is stored in the database.

