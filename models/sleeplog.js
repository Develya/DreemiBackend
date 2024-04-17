class SleepLog {
    constructor(logId, duration_ms, startDate, endDate, efficiency, userId) {
        this.logId = logId;
        this.duration_ms = duration_ms;
        this.startDate = startDate;
        this.endDate = endDate;
        this.efficiency = efficiency;
        this.userId = userId;
    }
}

module.exports = SleepLog;