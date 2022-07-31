import { NextPage } from 'next';
import { HTMLInputTypeAttribute, useState } from 'react';
import { FaRandom } from 'react-icons/fa';
import { trpc } from '../../utils/trpc';
import { nanoid } from 'nanoid';
import debounce from 'lodash/debounce';
import Modal from './modal';

const CreateLinkForm: NextPage = () => {
  const [link, setLink] = useState<HTMLInputTypeAttribute>('');
  const [slug, setSlug] = useState<HTMLInputTypeAttribute>('');
  const [open, setOpen] = useState(false);

  const url = window.location.origin;

  const checkSlug = trpc.useQuery(['checkSlug', { slug: slug }], {
    refetchOnReconnect: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  const createSlug = trpc.useMutation(['createSlug']);

  return (
    <form
      className='bg-gray-800 border-gray-700 border-2 rounded-lg flex flex-col gap-5 p-4 justify-center sm:w-2/3 md:w-1.2 lg:w-1/3'
      onSubmit={(e) => {
        e.preventDefault();
        createSlug.mutate({ slug, url: link });
        setOpen(true);
      }}
    >
      <Modal open={open} setOpen={setOpen} url={url} slug={slug} />
      {/* Link to shorten */}
      <label htmlFor='link-input' className='text-center text-3xl'>
        Enter a link to shorten
      </label>
      <input
        type='url'
        className='rounded-lg flex-1 min-w-0 w-full text-sm  p-2.5  bg-gray-700 border-gray-600 placeholder-gray-400 text-white '
        placeholder='https://google.com'
        onChange={({ target }) => setLink(target.value)}
        required
      />

      {/* Slug */}
      <div className='flex'>
        <span className='inline-flex items-center py-2 px-3 text-sm  rounded-l-md border border-r-0 bg-gray-800 text-gray-300 border-gray-600'>
          {url}/
        </span>
        <input
          type='text'
          className='rounded-none rounded-r-lg flex-1 min-w-0 w-full text-sm  p-2.5  bg-gray-700 border-gray-600 placeholder-gray-400 text-white '
          placeholder='odyssey'
          required
          value={slug}
          onChange={({ target }) => {
            setSlug(target.value);
            debounce(checkSlug.refetch, 100);
          }}
        />
        <button
          className=' ml-1 px-3 bg-gray-700 rounded-lg hover:bg-gray-600 active:scale-95 transition ease-in-out'
          type='button'
          onClick={() => {
            const slug = nanoid();
            setSlug(slug);
            checkSlug.refetch();
          }}
        >
          <FaRandom />
        </button>
      </div>
      {checkSlug.data?.used && (
        <span className='font-medium mr-2 text-center text-red-500'>
          Slug &quot;{slug}&quot; already in use.
        </span>
      )}

      <input
        type='submit'
        value='Create'
        className='text-white focus:outline-none font-medium
      rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center bg-blue-600
      hover:bg-blue-700 active:scale-95 transition ease-in-out'
        disabled={checkSlug.isFetched && checkSlug.data?.used}
      />
    </form>
  );
};

export default CreateLinkForm;
