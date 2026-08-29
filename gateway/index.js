const app = require('./src/express-app');
const config = require('./src/config');

app.listen(config.PORT, () => {
    console.log(`API Gateway listening on port ${config.PORT}`);
});
