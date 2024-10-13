const os = require('os');

const express = require('express');

const auth         = require('./auth');
const todos        = require('./todos');
const user         = require('./user');
const users        = require('./users');

const router = express.Router();

router.use('/api/auth', auth);
router.use('/api/user', user);
router.use('/api/users', users);
router.use('/api/todos', todos);
router.use('/api/health', (req, res) => {
  const memoryUsage = process.memoryUsage(); // Memory usage of the Node.js process
  const cpuUsage = process.cpuUsage(); // CPU usage of the Node.js process
  const uptime = process.uptime(); // Uptime of the Node.js process

  const healthStats = {
    message: 'Server is up and running...',
    memoryUsage: {
      rss: memoryUsage.rss, // Resident Set Size
      heapTotal: memoryUsage.heapTotal, // Total heap size
      heapUsed: memoryUsage.heapUsed, // Used heap size
      external: memoryUsage.external, // Memory usage outside of V8's heap
    },
    cpuUsage: {
      user: cpuUsage.user, // User CPU time in microseconds
      system: cpuUsage.system, // System CPU time in microseconds
    },
    upTime: uptime, // Uptime in seconds
    platform: os.platform(), // OS platform
    architecture: os.arch(), // OS architecture
    totalMemory: os.totalmem(), // Total system memory
    freeMemory: os.freemem(), // Free system memory
  };

  res.status(200).send(healthStats);
});

router.get('/api/tags', (req, res) => {
  res.send([
    'MERN', 'Node', 'Express', 'Webpack', 'React', 'Redux', 'Mongoose',
    'Bulma', 'Fontawesome', 'Ramda', 'ESLint', 'Jest',
  ]);
});

module.exports = router;
