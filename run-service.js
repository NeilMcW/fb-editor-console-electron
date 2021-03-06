const {exec} = require('child_process')
const {app} = require('./app.js')
const ipc = require('electron-better-ipc')

const logger = require('electron-timber')
const runLogger = logger.create({name: 'RunService'})

const {SERVICE_PATH, SERVICEPORT} = process.env
const {nvs, editor, logs} = app.paths

runLogger.log(`. ${nvs}/nvs.sh && nvs use 10.11 && cd ${editor} && PORT=${SERVICEPORT} SERVICE_PATH='${SERVICE_PATH}' LOGDIR='${logs}' npm start`)
const child = exec(`. ${nvs}/nvs.sh && nvs use 10.11 && cd ${editor} && PORT=${SERVICEPORT} SERVICE_PATH='${SERVICE_PATH}' LOGDIR='${logs}' npm start`, (err, stdout, stderr) => {
  if (err) {
    runLogger.log('background server failed', err)
  }
})
runLogger.log('pid', child.pid, 'port', SERVICEPORT, 'SERVICE_PATH', SERVICE_PATH)

// ipc.callMain('setServiceProperty', {
//   service: 'fb-ioj',
//   property: 'pid',
//   value: child.pid
// })

module.exports = {}
