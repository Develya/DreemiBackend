const UserDao = require('../dao/userDao');

const {OAuth2Client} = require('google-auth-library');

const androidClientId = '1023281627813-snquqr6m76bcl45g3gdmck9se31erlbn.apps.googleusercontent.com';
const webClientId = '1023281627813-gn1lpaov1m4neb3q7jdkiful8fk29lqp.apps.googleusercontent.com';
const client = new OAuth2Client(androidClientId);

class UserController {
    static async googleSignIn(req, res) {
        console.log('googleSignIn');
        const { authorizationToken } = req.body; // Retrieve the authorization token from the request body

        try {
            // Verify Google ID token
            const ticket = await client.verifyIdToken({ idToken: authorizationToken, audience: androidClientId });
            const payload = ticket.getPayload(); // Retrieve the payload from the ticket

            // Check if the user already exists in the DB
            let user = await UserDao.getUserByGoogleId(payload.sub);
            
            if (user) {
                // If user exists, return the user
                res.json(user);
            } else {
                // If user doesn't exist, create a new user
                user = await UserDao.newUser(payload.sub, payload.email, payload.name, payload.picture);
                res.json(user);
            }
        } catch (error) {
            console.error('Error verifying Google ID token:', error.message);
            res.status(400).json({ error: 'Invalid Google ID token' });
        }
    }
}

module.exports = UserController;