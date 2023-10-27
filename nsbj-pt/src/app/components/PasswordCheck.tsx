import React, { useState, useEffect } from 'react';

interface StrongPasswordProps {
    analysis: any
}

const PasswordCheck: React.FC<StrongPasswordProps> = ({ analysis }) => {
    const [isModalOpen, setIsModalOpen] = useState(true);
    const tier = "Strong";
    
    // Now you can use the analysis prop in your component

    const handleCloseModal = () => {
        setIsModalOpen(false);
    }

    return (
        <>
            {isModalOpen && (
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-20 shadow-modal">
                    <button onClick={handleCloseModal} className="absolute top-2.5 right-2.5 bg-none border-none text-20 cursor-pointer">
                        x
                    </button>
                    <div>
                        Password Strength: {analysis.strength}
                        <p>{analysis.recommendation}</p>
                    </div>
                </div>
            )}
        </>
    )
}

export default PasswordCheck;
