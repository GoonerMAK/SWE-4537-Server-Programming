const fs = require('fs');
const path = require('path');

const logFilePath = path.join(__dirname, 'requestLogs.txt');

if (!fs.existsSync(logFilePath)) {
    fs.writeFileSync(logFilePath, '');
}

const loggerMiddleware = (req, res, next) => {
  const logEntry = `${req.originalUrl}\n`;

  console.log(logEntry);

  fs.appendFile(logFilePath, logEntry, (err) => {
    if (err) {
      console.error('Error writing to log file:', err);
    }
  });

  next();
};

module.exports = loggerMiddleware;
