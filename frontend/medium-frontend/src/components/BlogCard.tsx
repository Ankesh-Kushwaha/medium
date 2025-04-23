import React from 'react';
import { Link } from 'react-router-dom';

interface BlogCardProps{
  authorName: string,
  title: string,
  content: string,
  id: string,
  publishedDate:string
}

const BlogCard = (
  {
    authorName,
    title,
    content,
    publishedDate,
    id
 }:BlogCardProps
) => {

  return (
    <Link to={`/blog/:${id}`}>
    <div className='m-3 border-b-2  border-b-slate-300 pb-2 mb-2 cursor-pointer'>
      <div className='flex justify-start gap-1'>
        <Avatar name={authorName} />
        <div className='pl-2 font-semibold'> {authorName}</div>
         <div className='text-shadow-emerald-950'>
           &#9679;
         </div>

        <div className='pl-2 font-bold'>   {publishedDate}</div>
      </div>

      <div className='text-slate-900 font-extrabold text-3xl'>
        {title}
      </div>

      <div className='text-2xl font-thin text-slate-600'>
        {content.slice(0,150)+"...."}
      </div>

      <div className='text-2xl font-semibold text-slate-500'>
        {`${Math.ceil(content.length/100)} minutes.`}
      </div>
      </div>
  </Link>
  )
}

function Avatar({name}:{name:string}) {
  return <>
   <div className="relative inline-flex items-center justify-center w-7 h-7 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
      <span className="font-medium text-gray-600 dark:text-gray-200">{name[0].toUpperCase()}</span>
        </div>
  </>
 }

export default BlogCard