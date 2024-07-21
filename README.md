# Weather Chatbot Backend

This is the backend for the Weather Chatbot application, built with Node.js, Express, and WebSocket.

## Deployment to Heroku

Follow these steps to deploy the Node.js backend to Heroku using the terminal.

### Step-by-Step Deployment

1. **Clone the Repository**

   - Clone the repository from GitHub and navigate into the project directory:
     ```sh
     git clone https://github.com/dulanM/weather-chatbot-backend.git
     cd weather-chatbot-backend
     ```

2. **Install Dependencies**

   - Ensure all dependencies are installed by running:
     ```sh
     npm install
     ```

3. **Create a `Procfile`**

   - In the root directory of your project, create a file named `Procfile`:
     ```sh
     echo "web: node src/index.js" > Procfile
     ```

4. **Verify Server Code**

   - Ensure your server code is correctly set up to listen on the port provided by Heroku and all necessary routes and WebSocket configurations are in place.

5. **Initialize a Git Repository**

   - Initialize a new git repository if your project is not already in one:
     ```sh
     git init
     git add .
     git commit -m "Initial commit with Node.js backend setup"
     ```

6. **Create a Heroku App**

   - Create a new app on Heroku using the Heroku CLI:
     ```sh
     heroku create your-app-name
     ```

7. **Set Environment Variables on Heroku**

   - Set any required environment variables using the Heroku CLI:
     ```sh
     heroku config:set JWT_SECRET_KEY=your_jwt_secret_key
     heroku config:set WEATHER_API_KEY=your_weather_api_key
     ```

8. **Deploy to Heroku**

   - Push your code to Heroku to deploy the application:
     ```sh
     git push heroku main
     ```
     If your branch is not named `main`, use the appropriate branch name:
     ```sh
     git push heroku your-branch-name:main
     ```

9. **Monitor Logs**

   - Monitor the logs to ensure your application is running correctly:
     ```sh
     heroku logs --tail
     ```

### Troubleshooting

- **Error R10 (Boot timeout)**: Ensure your server is binding to the correct port (`process.env.PORT`).
- **Application Error**: Check the Heroku logs for specific error messages and ensure all dependencies are correctly installed and environment variables are set.

### Testing the API with Postman

1. **Get the Heroku App URL**

   - After deploying, your app will be available at `https://your-app-name.herokuapp.com`.

2. **Test an API Endpoint**

   - Open Postman and create a new request.
   - Enter the URL of your endpoint (e.g., `https://your-app-name.herokuapp.com/api`).
   - Select the HTTP method (GET).
   - Click "Send" to send the request.
   - Verify the response to ensure the endpoint is working correctly.

3. **Test WebSocket Connection**

   - Use a WebSocket client tool like [WebSocket King](https://websocketking.com/).
   - Connect to `wss://your-app-name.herokuapp.com`.
   - Send a message and observe the responses to ensure the WebSocket connection is working.

By following these steps, you can successfully deploy your Node.js backend to Heroku and test it using Postman or a WebSocket client.
