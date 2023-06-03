import React, { useState } from 'react';
import { auth, db } from '../config/firebaseconfig';
import { collection, addDoc } from 'firebase/firestore';
const QueryForm = () => {
  const [Category, setCategory] = useState("")
  const [summary, setSummary] = useState("")
  const [description, setdescription] = useState("")
  const queryCollection = collection(db, "allQueries")
  const submitQuery = async () => {
    await addDoc(queryCollection, { Category, summary, description, queryPerson: { name: auth.currentUser.displayName, id: auth.currentUser.uid } })
    alert("Uploaded")
  }

  return (
    <div className='flex w-fit xl:w-full'>
      <form className="w-full max-w-lg ml-3">
        <div className="flex items-center mb-6">
          <div className="w-1/3">
            <label className="block text-black font-bold text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
              Category
            </label>
          </div>
          <div className="relative w-11/12">
            <select onChange={(e) => { setCategory(e.target.value) }} className="bg-white appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-black leading-tight focus:outline-none focus:bg-white focus:border-blue-500 rounded-md pl-8" id="grid-state">
              <option></option>
              <option>Academics</option>
              <option>Hostel</option>
              <option>Personal</option>
              <option>Skill Training</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
            </div>
          </div>
        </div>
        <div className="flex items-center mb-6">
          <div className="w-1/3">
            <label className="block text-black font-bold text-right mb-1 md:mb-0 pr-4" htmlFor="inline-password">
              Summary
            </label>
          </div>
          <div className="w-11/12">
            <input onChange={(e) => { setSummary(e.target.value) }} className="bg-white appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-black leading-tight focus:outline-none focus:bg-white rounded-md" id="inline-password" />
          </div>
        </div>
        <div className="flex items-center mb-4">
          <div className="w-1/3">
            <label className="block text-black font-bold text-right mb-1 md:mb-0 pr-4" htmlFor="inline-password">
              Description
            </label>
          </div>
          <div className="w-11/12">
            <textarea onChange={(e) => { setdescription(e.target.value) }} className="rounded-md resize-none border-2 border-gray-200 focus:border-blue-500 w-full h-40 py-2 px-4 text-black leading-tight focus:outline-none" id="description" />
          </div>
        </div>

        <div className="flex items-center mb-4">
          <div className="w-1/3"></div>
          <label className="w-2/3 flex items-center block text-black font-bold">
            <input className="mr-2 leading-tight" type="checkbox" />
            <span className="text-sm">
              I hereby declare that the above given query is true.
            </span>
          </label>
        </div>
        <div className="flex items-center">
          <div className="w-1/3"></div>
          <div className="w-2/3">
            <button onClick={submitQuery} className="shadow bg-blue-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-3 rounded" type="button">
              Submit issue
            </button>
          </div>
        </div>
      </form >
    </div >
  );
};

export default QueryForm;
