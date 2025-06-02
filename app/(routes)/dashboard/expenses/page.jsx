"use client"
import React from 'react'
import {UserButton, useUser} from '@clerk/nextjs';
import { useState } from 'react';
import { useEffect } from 'react';
import { db } from '@/utils/dbConfig';
import { sql } from 'drizzle-orm';
import { sum, count } from 'drizzle-orm';
import { eq } from 'drizzle-orm';
import { getTableColumns } from 'drizzle-orm';
import { Budgets } from '@/utils/schema';
import { Expenses } from '@/utils/schema';
import { desc } from 'drizzle-orm';
import ExpenseListTable from './_components/ExpenseListTable';

function page() {

    const {user}=useUser();
    const [budgetList,setBudgetList]=useState([]);
    const [expensesList,setExpensesList]=useState([]);
  
    useEffect(()=>{
      user&&getBudgetList();
    },[user])
  
    /*used to get budget list*/
    const getBudgetList=async()=>{
  
      const result=await db.select({
        ...getTableColumns(Budgets),
        totalSpend:sql `sum(${Expenses.amount})`.mapWith(Number),
        totalItem:sql `count(${Expenses.id})`.mapWith(Number)
      }).from(Budgets)
      .leftJoin(Expenses,eq(Budgets.id,Expenses.budgetId))
      .where(eq(Budgets.createdBy,user?.primaryEmailAddress?.emailAddress))
      .groupBy(Budgets.id)
      .orderBy(desc(Budgets.id))
      setBudgetList(result);
      getAllExpenses();
    }
  /** Used to get all Expenses belonging to a User */
    const getAllExpenses=async()=>{
      const result=await db.select({
        id:Expenses.id,
        name:Expenses.name,
        amount:Expenses.amount,
        createdAt:Expenses.createdAt
      }).from(Budgets)
      .rightJoin(Expenses,eq(Budgets.id,Expenses.budgetId))
      .where(eq(Budgets.createdBy,user?.primaryEmailAddress.emailAddress))
      .orderBy(desc(Expenses.id));
      setExpensesList(result);
  
      
    }
  return (
    <div className='mt-5 ml-5 mr-10'>
      <ExpenseListTable
            expenseList={expensesList}
            refreshData={()=>getBudgetList()}/>
    </div>
  )
}

export default page
