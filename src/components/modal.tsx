/* This example requires Tailwind CSS v2.0+ */
import { Dispatch, Fragment, SetStateAction, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import copy from 'copy-to-clipboard';
import { trpc } from '../../utils/trpc';

type args = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  url: string;
  slug: string;
};

export default function Modal({ open, setOpen, url, slug }: args) {
  const createSlug = trpc.useMutation(['createSlug']);

  const onClose = () => {
    setOpen(false);
    createSlug.reset();
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as='div' className='relative z-10' onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-gray-700 bg-opacity-75 transition-opacity' />
        </Transition.Child>

        <div className='fixed z-10 inset-0 overflow-y-auto'>
          <div className='flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              enterTo='opacity-100 translate-y-0 sm:scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0 sm:scale-100'
              leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            >
              <Dialog.Panel className='relative  rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full'>
                <div className='bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
                  <div className='sm:flex sm:items-start'>
                    <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full'>
                      <Dialog.Title
                        as='h3'
                        className='text-xl leading-6 font-medium text-gray-200'
                      >
                        Link Created!
                      </Dialog.Title>

                      <div className='mt-2 flex justify-between w-full bg-gray-700 rounded-lg p-2 items-center'>
                        <p className='text-md text-gray-300 text-center pl-2'>
                          {`${url}/${slug}`}
                        </p>
                        <button
                          type='button'
                          className='text-white focus:outline-none font-medium
      rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center bg-blue-600
      hover:bg-blue-700 active:scale-95 transition ease-in-out'
                          onClick={() => {
                            copy(`${url}/${slug}`);
                          }}
                        >
                          Copy
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='bg-gray-900 px-4 py-3 sm:px-6 flex justify-center'>
                  <button
                    type='button'
                    className='text-white focus:outline-none font-medium
      rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center bg-blue-600
      hover:bg-blue-700 active:scale-95 transition ease-in-out'
                    onClick={onClose}
                  >
                    Close
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
