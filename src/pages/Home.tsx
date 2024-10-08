import { Hono } from 'hono'
import type { FC } from 'hono/jsx'
import { Layout } from './seo-ui/Layout'

const home = new Hono()

const Top: FC<{ messages: string[] }> = (props: { messages: string[] }) => {
  return (
    <Layout title="Home Page" description="Welcome to the home page">
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold text-center mb-4">Hello Hono!</h1>
        <ul className="list-disc list-inside">
          {props.messages.map((message, index) => {
            return (
              <li key={index} className="text-xl text-gray-800 my-2"> 
                {message}!!
              </li>
            )
          })}
        </ul>
      </div>
    </Layout>
  )
}

home.get('/', (c) => {
  const messages = ['Good Morning', 'Good Evening', 'Good Night']
  return c.html(<Top messages={messages} />)
})

export default home
