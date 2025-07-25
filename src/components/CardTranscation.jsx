import React from "react";

const CardTransaction = ({ title, amount, type, date }) => {
    const isExpense = type === "expense";

    return (
        <div className="bg-white p-3 rounded-lg shadow flex justify-between items-center">
            <div>
                <h3 className="font-medium text-gray-800">{title}</h3>
                <p className="text-sm text-gray-500">{date}</p>
            </div>
            <div
                className={`text-right font-bold ${isExpense ? "text-red-500" : "text-green-500"
                    }`}
            >
                {amount}
            </div>
        </div>
    );
};

export default CardTransaction;
