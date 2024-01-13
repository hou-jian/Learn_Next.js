import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>demo page router</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>123</main>
    </>
  )
}

Home.getLayout = function getLayout(page) {
  return (
    <div>
      <h1>测试</h1>
      {page}
    </div>
  )
}
