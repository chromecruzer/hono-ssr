import { Hono } from 'hono'
import home from './pages/Home'
const figlet = require("figlet")
import { serveStatic } from 'hono/bun'
// Import your CSS file
import './styles/styles.css'


const app = new Hono()

// Serve static files from the public directory
app.use('/public/*', serveStatic({ root: './' }))
//app.use('/service/*', serveStatic({ root: './' }))
// Serve files from the 'service' directory
app.use(
  '/service/*',
  serveStatic({
    root: './', // Serve from the correct folder
    mimes: {
      js: 'application/javascript', // Set correct MIME for JS files
    },
  })
)

app.get('/', (c) => {
  return c.text('Hello Hono!')
})


app.route('/home', home)
// Display a Figlet message when the server starts
figlet('Bausch And Lomb', (err: any, data: any) => {
  if (err) {
    console.error('Something went wrong with Figlet...', err)
    return
  }
  console.log(data) // Show "Server ON" in Figlet style
})


export default app 
