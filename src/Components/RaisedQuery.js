import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebaseconfig';

const RaisedQuery = () => {
    const queryCollection = collection(db, "allQueries");
    const [queries, setQueries] = useState([]);
    const [replyText, setReplyText] = useState('');

    useEffect(() => {
        const loadQueries = async () => {
            const data = await getDocs(queryCollection);
            setQueries(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };
        loadQueries();
    });

    const resolveQuery = async (queryId) => {
        const queryRef = doc(db, "allQueries", queryId);
        await updateDoc(queryRef, { status: "Resolved" });
        setQueries((prevQueries) =>
            prevQueries.map((query) => {
                if (query.id === queryId) {
                    return { ...query, status: "Resolved" };
                }
                return query;
            })
        );
    };

    const replyQuery = async (queryId) => {
        const queryRef = doc(db, "allQueries", queryId);
        await updateDoc(queryRef, { reply: replyText });
        setQueries((prevQueries) =>
            prevQueries.map((query) => {
                if (query.id === queryId) {
                    return { ...query, reply: replyText };
                }
                return query;
            })
        );
        setReplyText('');
    };

    const rejectQuery = async (queryId) => {
        const queryRef = doc(db, "allQueries", queryId);
        await deleteDoc(queryRef);
        setQueries((prevQueries) =>
            prevQueries.filter((query) => query.id !== queryId)
        );
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-4">
            {queries.map((item) => (
                <div key={item.id}>
                    <div className="w-64 rounded overflow-hidden shadow-lg bg-white mb-4 mt-2 ml-4">
                        <div className="px-6 py-2">
                            {auth.currentUser?.email === "linktothedeveloper@gmail.com" && item.queryPerson.name}

                            <div className="font-bold text-l mb-2">{item.summary}</div>
                            <p className="text-gray-700 text-base">{item.description}</p>
                        </div>
                        <div className="px-6 pt-2 pb-2">
                            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                                #{item.Category}
                            </span>
                            {auth.currentUser?.email === "linktothedeveloper@gmail.com" ? (
                                item.status === 'Resolved' ? (
                                    <span className="inline-block bg-green-500 text-white py-1 px-2 rounded-full">
                                        Resolved
                                    </span>
                                ) : (
                                    <div>
                                        <button
                                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-1 rounded"
                                            onClick={() => resolveQuery(item.id)}
                                        >
                                            Resolve
                                        </button>
                                        <button
                                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 ml-1 px-1 rounded"
                                            onClick={() => rejectQuery(item.id)}
                                        >
                                            Reject
                                        </button>
                                        <input
                                            type='text'
                                            required
                                            placeholder='Reply to query'
                                            value={replyText}
                                            onChange={(e) => setReplyText(e.target.value)
                                            }
                                        />
                                        <button
                                            className="bg-blue-500 text-white py-1 px-1 rounded"
                                            onClick={() => replyQuery(item.id)}
                                        >
                                            Send
                                        </button>
                                    </div>
                                )
                            ) : (
                                <span
                                    className={`inline-block rounded-full px-1 py-1 text-sm font-semibold ${item.status === "Resolved"
                                        ? "bg-green-500 text-white"
                                        : "bg-red-500 text-white"
                                        }`}
                                >
                                    {item.status === "Resolved" ? "Resolved" : "Not resolved"}
                                </span>
                            )}
                        </div>
                        {item.reply && (
                            <p className="px-6 py-2 bg-gray-100">
                                <strong>Reply:</strong> {item.reply}
                            </p>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default RaisedQuery;
