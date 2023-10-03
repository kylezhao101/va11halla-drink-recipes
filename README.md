# Va11halla recipes site

Va11halla Drink Recipes is a web application that provides a collection of delicious drink recipes in the game "VA-11 Hall-A: Cyberpunk Bartender Action". You can find the game's Steam page [here](https://store.steampowered.com/app/447530/VA11_HallA_Cyberpunk_Bartender_Action/).

This project uses:
- React
- Firebase (Firestore and Firebase Authentication)
- React Three Fiber
- GLTF component generated from [gltf.pmnd.rs](https://gltf.pmnd.rs/) by Poimandres
  
## Roadmap

- Implement drink favoriting system for registered users and sort by popularity function
- Add responsiveness for login and registration page
- Optimize loading speed (especially gtlf model component)

## Installation

```sh
# Clone the Repository
git clone https://github.com/kylezhao101/va11halla-drink-recipes.git

# Navigate to the Project Directory
cd va11halla-drink-recipes

# Install Dependencies
npm install

# Start the development server to run the application locally.
npm run start
```

## Firebase Configuration

The drink recipes for this application were sourced from the [Va11halla Drinktionary](https://va11halla.fandom.com/wiki/Drinktionary) website.
The scraped drink recipes data was subsequently transferred and stored in a Firestore database.

To set up Firebase for the Va11halla Drink Recipes application, follow these steps:

1. **Create a Firebase Project:**
   - Go to the [Firebase Console](https://console.firebase.google.com/).
   - Create a new Firebase project if you don't have one already.

2. **Access Firebase Configuration:**
   - In your Firebase project, navigate to "Project Settings" to access your Firebase configuration.

3. **Replace Configuration in `src/firebase.js`:**
   - Open the `src/firebase.js` file in your project.
   - Replace the placeholders in the `firebaseConfig` object with your Firebase project's configuration. Your `firebaseConfig` object should look like this:

```javascript
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};
```
