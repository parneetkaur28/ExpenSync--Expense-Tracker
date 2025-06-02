import React, { useState } from 'react'
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { db } from '@/utils/dbconfig';
import { Budgets, Expenses } from '@/utils/schema';
import { toast } from 'sonner';
import moment from 'moment/moment';
import { Loader } from 'lucide-react';

function AddExpense({ budgetId, user, refreshData }) {

    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");
    const [loading, setLoading] = useState(false);

    /**  To add new expenses */
    const addNewExpense = async () => {
        setLoading(true);
        const result = await db.insert(Expenses).values({
            name: name,
            amount: amount,
            budgetId: budgetId,
            createdAt: moment().format('DD-MM-YYYY')
        }).returning({ insertedId: Budgets.id });

        setAmount('');
        setName('');
        if (result) {
            setLoading(false);
            refreshData()
            toast('New Expense Added')
        }
        setLoading(false);
    }


    return (
        <div className='border p-5 rounded-lg'>
            <h2 className='font-bold text-lg'>Add Expense</h2>
            <div className='mt-2'>
                <h2 className='text-black font-medium my-1'>Expense Name</h2>
                <Input placeholder="e.g. Hall Decor"
                    value={name} onChange={(e) => setName(e.target.value)} />
            </div>

            <div className='mt-2'>
                <h2 className='text-black font-medium my-1'>Expense Amount</h2>
                <Input placeholder="e.g. 2000$"
                    value={amount} onChange={(e) => setAmount(e.target.value)} />
            </div>

            <Button disabled={!(name && amount)} className='mt-3 w-full'
                onClick={() => addNewExpense()}>
                {loading ? <Loader className='animate-spin' /> : "Add New Expense"}</Button>
        </div>
    )
}

export default AddExpense
