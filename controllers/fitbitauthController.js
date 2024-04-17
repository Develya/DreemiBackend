const FitbitAuthDao = require('../dao/fitbitauthDao');

// Function to generate the Basic token
function generateBasicToken(clientId, clientSecret) {
    const credentials = `${clientId}:${clientSecret}`;
    return Buffer.from(credentials).toString('base64');
}

class FitbitAuthController {
    static async getFitbitAuthByUserId(req, res) {
        const { userId } = req.params;
        FitbitAuthDao.getFitbitAuthByUserId(userId)
            .then(reponse => res.json(reponse));
    }

    static async isFitbitAuthorized(req, res) {
        const { userId } = req.params;
        const fitbitAuth = await FitbitAuthDao.getFitbitAuthByUserId(userId);
        if (fitbitAuth) res.send(true);
        else res.send(false);
    }

    static async fitbitSignIn(req, res) {
        const { authCode, codeVerifier, userId } = req.body; // Retrieve the authorization token from the request body

        console.log(authCode, codeVerifier, userId);

        const fitbitAuth = await FitbitAuthDao.getFitbitAuthByUserId(userId);

        if (fitbitAuth) {
            res.json(fitbitAuth);
            return;
        }
    
        // Fitbit API credentials
        const fitbitClientId = '23S3GJ';
        const fitbitClientSecret = '8e6afa51836defb68586db37678fe316';
    
        // Generate the Basic token
        const basicToken = generateBasicToken(fitbitClientId, fitbitClientSecret);
    
        const response = await fetch('https://api.fitbit.com/oauth2/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${basicToken}`
            },
            body: new URLSearchParams({
                'client_id': fitbitClientId,
                'code': authCode,
                'code_verifier': codeVerifier,
                'grant_type': 'authorization_code',
                'redirect_uri': 'dev.paintilya.sleeptracker://fitbit-redirect'
            })
        });

        const data = await response.json();
        console.log(data);

        const newFitbitAuth = await FitbitAuthDao.newFitbitAuth(data.access_token, data.expires_in, data.refresh_token, data.token_type, userId, data.scope);
    }
}

module.exports = FitbitAuthController;