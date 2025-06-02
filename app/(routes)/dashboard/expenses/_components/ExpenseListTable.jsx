import { db } from '@/utils/dbconfig'
import { Expenses } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { Trash } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner'

function ExpenseListTable({expenseList,refreshData}) {

    const deleteExpense=async(expense)=>{
        const result=await db.delete(Expenses)
        .where(eq(Expenses.id,expense.id))
        .returning();

        if(result){
            toast('Expense Deleted!')
            refreshData()
        }
    }
  return (
    <div className='mt-3'>
      <h2 className='font-bold text-lg '>Latest Expenses</h2>
      <div className='grid grid-cols-4 bg-purple-100 p-2 mt-3'>
        <h2 className='font-bold'>Name</h2>
        <h2 className='font-bold'>Amount</h2>
        <h2 className='font-bold'>Date</h2>
        <h2 className='font-bold'>Action</h2>
      </div>
      {expenseList?.map((expenses,index)=>(
        <div key={expenses.id || index} className='grid grid-cols-4 bg-purple-100 p-2'>
        <h2>{expenses.name}</h2>
        <h2>{expenses.amount}</h2>
        <h2>{expenses.createdAt}</h2>
        <h2>
            <Trash className='text-red-600 cursor-pointer'
            onClick={()=>deleteExpense(expenses)}/>
        </h2>
      </div>
      ))}
    </div>
  )
}

export default ExpenseListTable
