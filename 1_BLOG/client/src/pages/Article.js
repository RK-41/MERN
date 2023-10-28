import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import articleContent from './article-content';
import Articles from '../Components/Articles';
import NotFound from './NotFound';
import CommentsList from '../Components/CommentsList';
import AddCommentForm from '../Components/AddCommentForm';

function Article() {
   const { name } = useParams();
   const article = articleContent.find((article) => article.name === name);

   // Using 'useState()' and 'useEffect()' to Update the Article's Info
   const [articleInfo, setArticleInfo] = useState({ comments: [] });

   useEffect(() => {
      const fetchData = async () => {
         // Fetching Article Info
         const result = await fetch(`/api/articles/${name}`);

         const body = await result.json();

         console.log(body)

         // Updating the Article Info
         setArticleInfo(body);
      };

      fetchData();
   }, [name]);
   // The purpose of passing '[name]' as an argument is to make sure that the 'useEffect()' function only executes when there's change in the URL


   if (!article) return <NotFound />

   const otherArticles = articleContent.filter(article => article.name !== name);

   return (
      <>
         <h1 className='sm:text-4xl text-2xl font-bold my-6 text-gray-900'>
            {article.title}
         </h1>

         {article.content.map((para, index) => (
            <p className='mx-auto leading-relaxed text-base mb-4' key={index}>
               {para}
            </p>
         ))}

         {/* Comments' List Compnent (28.10.)*/}
         <CommentsList comments={articleInfo.comments} />

         {/* Add-Comment Form */}
         <AddCommentForm articleName={name} setArticleInfo={setArticleInfo} />

         <h1 className='sm:text-2xl text-xl font-bold my-4 text-gray-900'>
            Other articles
         </h1>
         <div className='flex flex-wrap -m-4'>
            <Articles articles={otherArticles} />
         </div>
      </>
   )
}

export default Article;