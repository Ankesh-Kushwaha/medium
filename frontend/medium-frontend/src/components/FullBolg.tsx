import React from 'react'

interface BlogType{
  title: string,
  content: string,
  author: string,
  postedOn:string
}

const FullBolg = ({title,content,author, postedOn}:BlogType) => {
  return (
    <div className='flex flex-col sm:flex-row gap-3 m-2 p-3 border-b-slate border-b-2'>
      {/* design left side of the full blog */}
      <div className='flex flex-col gap-2'>
        <div className='font-extrabold text-5xl text-slate-800 font-serif '>
          {title}
        </div>
        <div className='font-extralight text-2xl text-shadow-gray-700 '>
         <span className='font-semibold font-serif text-blue-900'>Posted On:</span> {postedOn}
        </div>
      <div className="font-serif text-lg leading-relaxed text-slate-800 max-w-3xl mx-auto space-y-4">
          {content.split('\n').map((para, idx) => (
            <p key={idx}>{para}</p>
          ))}
        </div>

      </div>
        
      {/* design right side of the full blog */}
      <div className='flex flex-row sm:flex-col'>
        <div>
          <Avatar name={author} />
        </div>
        <div className='font-semibold text-2xl text-emerald-800'>
          {author}
        </div>
      </div>
    </div>
  )
}


function Avatar({ name }: { name: string }) {
  return <>
    <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
      <span className="font-medium text-gray-600 dark:text-gray-200">{name[0].toUpperCase()}</span>
    </div>
  </>
}

export default FullBolg