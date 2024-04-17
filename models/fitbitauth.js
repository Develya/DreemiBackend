class FitbitAuth {
    constructor(
        authId, accessToken, 
        refreshToken, tokenType,
        userId, createdAt,
        lastUpdated,
    ) {
        this.authId = authId;
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.tokenType = tokenType;
        this.userId = userId;
        this.createdAt = createdAt;
        this.lastUpdated = lastUpdated;
    }
}