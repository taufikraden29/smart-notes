import React, { useState } from 'react';
import { supabase } from '../services/supabase';

export default function AddTransaction({ onSuccess }) {
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [image, setImage] = useState(null);

    const handleUpload = async (e) => {
        e.preventDefault();

        let imageUrl = null;

        if (image) {
            const fileExt = image.name.split('.').pop();
            const fileName = `${Date.now()}.${fileExt}`;
            const { data, error: uploadError } = await supabase.storage
                .from('transaction-images')
                .upload(fileName, image);

            if (uploadError) {
                alert('Upload gagal:', uploadError.message);
                return;
            }

            imageUrl = `${supabase.storage.from('transaction-images').getPublicUrl(fileName).data.publicUrl}`;
        }

        const { error } = await supabase.from('transactions').insert([
            {
                title,
                amount: parseFloat(amount),
                image_url: imageUrl,
            },
        ]);

        if (error) {
            alert('Gagal simpan transaksi: ' + error.message);
        } else {
            setTitle('');
            setAmount('');
            setImage(null);
            onSuccess();
        }
    };

    return (
        <form onSubmit={handleUpload} className="space-y-4">
            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Judul transaksi" className="border p-2 w-full" />
            <input value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Nominal" type="number" className="border p-2 w-full" />
            <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
            <button type="submit" className="bg-blue-600 text-white px-4 py-2">Tambah Transaksi</button>
        </form>
    );
}
