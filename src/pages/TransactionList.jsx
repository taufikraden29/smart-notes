import React, { useEffect, useState } from 'react';
import { supabase } from '../services/supabase';
import AddTransaction from '../pages/AddTransaction';

export default function TransactionList() {
    const [transactions, setTransactions] = useState([]);

    const fetchTransactions = async () => {
        const { data, error } = await supabase.from('transactions').select('*').order('created_at', { ascending: false });
        if (error) console.error(error);
        else setTransactions(data);
    };

    useEffect(() => {
        fetchTransactions();
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-xl font-bold mb-4">List Transaksi</h1>
            <AddTransaction onSuccess={fetchTransactions} />
            <ul className="mt-6 space-y-4">
                {transactions.map((trx) => (
                    <li key={trx.id} className="border p-4 rounded shadow">
                        <p className="font-semibold">{trx.title}</p>
                        <p>Rp {trx.amount.toLocaleString()}</p>
                        {trx.image_url && (
                            <img src={trx.image_url} alt="gambar transaksi" className="mt-2 w-32 rounded" />
                        )}
                        <small>{new Date(trx.created_at).toLocaleString()}</small>
                    </li>
                ))}
            </ul>
        </div>
    );
}
