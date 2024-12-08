# YelpCamp

A web application built using Node.js, Express, and MongoDB, allowing users to share and explore camping sites. Users can register, log in, and post information about camping sites, including a title, image, and description. They can also edit or delete their posts, add comments on posts, and edit their comments.

## Features

- **User Registration**: Users can create an account.
- **User Login**: Existing users can log in to access their account.
- **Post a Camping Site**: Users can share information about a camping site with a title, image, and description.
- **Edit a Post**: Users can update the details of their camping site posts.
- **Delete a Post**: Users can delete their camping site posts.
- **Add Comments**: Users can comment on camping site posts.
- **Edit Comments**: Users can update their comments on posts.

## Installation

Follow these steps to set up the project locally.

### Prerequisites

- Node.js (14.x or later)
- MongoDB (local or cloud instance)
- npm (Node Package Manager)

### Setup Instructions

1. **Clone the Repository**:
   ```
   git clone <repository-url>
   cd <repository-folder>
   ```

2. **Install Dependencies**:
   ```
   npm install
   ```

3. **Set Up Environment Variables**: Create a `.env` file in the project root and add the following:
   ```
   PORT=3000
   MONGO_URI=mongodb://localhost/yelp_camp
   SECRET_KEY=It's secret
   ```

4. **Start the Application**:
   ```
   node app.js
   ```

5. Open your browser and go to http://localhost:3000 to access the application.

## Technologies Used
- **Backend**: Node.js, Express
- **Frontend**: EJS templates
- **Database**: MongoDB
- **Styling**: CSS, Bootstrap
