import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';

const CreateLinkForm = dynamic(() => import('../components/create-link'), {
  ssr: false,
});

const Home: NextPage = () => {
  return (
    <div className='flex flex-col justify-center items-center h-screen bg-gray-900 text-white'>
      <Head>
        <title>Link Shortener</title>
        <meta
          name='description'
          content='A website designed to shorten links'
        />
      </Head>

      <CreateLinkForm />
    </div>
  );
};

export default Home;

