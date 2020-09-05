/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express')
const path = require('path')

const app = express()
const buildPath = path.join(__dirname, '..', 'build')
const port = process.env.PORT || 5000

app.use(express.static(buildPath))

app.get('*', (_req, res) => {
	res.sendFile(path.join(buildPath, 'index.html'))
})

app.listen(port, () => {
	console.log('Server is running')
})
