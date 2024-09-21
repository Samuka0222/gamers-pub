'use client'

import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';

interface DropFilesContainerProps {
  setUpload: React.Dispatch<React.SetStateAction<{
    file: File;
    progress: number;
  } | undefined>>
}

export function DropFilesContainer({ setUpload }: DropFilesContainerProps) {

  const { getRootProps, getInputProps } = useDropzone({
    noDrag: true,
    noKeyboard: true,
    maxFiles: 1,
    onDrop: (acceptedFile) => {
      setUpload({ file: acceptedFile[0], progress: 0 })
    },
  });

  return (
    <div className='w-full h-28 flex flex-col justify-center items-center'>
      <div
        className='w-full h-16 border rounded-xl cursor-pointer flex justify-center items-center bg-transparent'
        {...getRootProps()}
      >
        <input
          className='w-[400px]'
          {...getInputProps()}
        />
        <div className='w-full flex gap-2 items-center justify-center p-3'>
          <p className='text-black text-base'>Alterar foto de perfil</p>
          <Upload className='text-black' size={20} />
        </div>
      </div>
    </div>
  )
}
