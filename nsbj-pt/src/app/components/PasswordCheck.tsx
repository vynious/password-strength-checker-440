import React, { useState } from 'react';

interface StrongPasswordProps {
    analysis: any;
}

const PasswordCheck: React.FC<StrongPasswordProps> = ({ analysis }) => {
    const [isModalOpen, setIsModalOpen] = useState(true);

    const getStrengthColor = (rating: number) => {
        if (rating <= 25) return 'bg-red-500';
        if (rating <= 50) return 'bg-orange-500';
        if (rating <= 75) return 'bg-yellow-500';
        return 'bg-green-500';
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    }

    return (
        <>
            <div className={isModalOpen ? "fixed inset-0 flex items-center justify-center z-50" : "hidden"}>
                <div className="bg-white p-8 w-12/12 md:min-w-lg mx-auto rounded-xl shadow-2xl z-50 overflow-y-scroll h-3/4">
                    <div className="flex justify-between items-center pb-3">
                        <p className="text-2xl font-bold">Password Analysis</p>
                        <div className="cursor-pointer z-50" onClick={handleCloseModal}>
                            <svg className="fill-current text-gray-500" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                                <path d="M18 1.3L16.7 0 9 7.6 1.3 0 0 1.3 7.6 9 0 16.7 1.3 18 9 10.4 16.7 18 18 16.7 10.4 9 18 1.3z"></path>
                            </svg>
                        </div>
                    </div>

                    <div className="mb-4">
                        <h3 className="text-xl font-semibold mb-2">Password Strength</h3>
                        <div className="bg-gray-200 h-6 rounded">
                            <div className={`h-full ${getStrengthColor(analysis.score * 25)}`} style={{ width: `${analysis.score * 25}%` }}></div>
                        </div>
                    </div>

                    <div className="mb-4">
                        <h3 className="text-xl font-semibold mb-2">Password</h3>
                        <p className="text-lg bg-gray-100 p-2 rounded">{analysis.password}</p>
                    </div>

                    <div className="mb-4">
                        <h3 className="text-xl font-semibold mb-2">Crack Time (Offline, Slow Hashing)</h3>
                        <p className="text-lg bg-gray-100 p-2 rounded">{analysis.crackTimesDisplay.offlineSlowHashing1e4PerSecond}</p>
                    </div>

                    <div className="mb-4">
                        <h3 className="text-xl font-semibold mb-2">Pattern Analysis</h3>
                        <ul className="list-disc pl-5">
                            {analysis.sequence.map((seq: any, index: any) => (
                                <li key={index} className="mb-2">
                                    <strong>Pattern:</strong> {seq.pattern}<br />
                                    <strong>Token:</strong> {seq.token}<br />
                                    <strong>Matched Word:</strong> {seq.matchedWord || 'N/A'}<br />
                                    <strong>Guesses:</strong> {seq.guesses}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="mb-4">
                        <h3 className="text-xl font-semibold mb-2">Feedback</h3>
                        {analysis.feedback.warning ? (
                            <div className="mb-2">
                                <strong>Warning:</strong> {analysis.feedback.warning}
                                <div className='w-full'>
                                    <img className='w-full' src="/weakling.png" alt="" />
                                </div>
                                
                            </div>
                        ) : (
                            !analysis.feedback.suggestions || analysis.feedback.suggestions.length === 0 ? (
                                <div>
                                    <strong><i>DATS A STONKS PASSWORD!!</i></strong>
                                    <div className='w-full'>
                                        <img className='w-full' src="/final.png" alt="" />
                                    </div>
                                </div>
                            ) : null
                        )}
                        {analysis.feedback.suggestions && analysis.feedback.suggestions.length > 0 && (
                            <div>
                                <strong>Suggestions:</strong>
                                <ul className="list-disc pl-5">
                                    {analysis.feedback.suggestions.map((suggestion: any, index: any) => (
                                        <li key={index}>{suggestion}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>


                </div>
                <div className="bg-black opacity-50 fixed inset-0 z-40"></div>
            </div>

        </>
    )
}

export default PasswordCheck;
