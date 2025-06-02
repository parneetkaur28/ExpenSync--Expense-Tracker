"use client"
import React from 'react'
import {UserButton, useUser} from '@clerk/nextjs';
import { useState } from 'react';
import { useEffect } from 'react';
import { db } from '@/utils/dbConfig';
import { sql } from 'drizzle-orm';
import { sum, count } from 'drizzle-orm';
import { eq } from 'drizzle-orm';
import CardInfo from './_components/CardInfo';
import { getTableColumns } from 'drizzle-orm';
import { Budgets } from '@/utils/schema';
import { Expenses } from '@/utils/schema';
import { desc } from 'drizzle-orm';
import BarChartDashboard from './_components/BarChartDashboard';
import BudgetItem from './budgets/_components/BudgetItem';
import ExpenseListTable from './expenses/_components/ExpenseListTable';
function Dashboard() {
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
    <div className='p-8'>
        <h2 className='font-bold text-3xl'>Hi, {user?.fullName} ✌️</h2>
        <p className='text-gray-500 mt-2'>Here's what is happening with your money,
         Lets manage your expenses!</p>
         <CardInfo budgetList={budgetList}/>
         <div className='grid grid-cols-1 md:grid-cols-3 mt-6 gap-5'>
          <div className='md:col-span-2'>
            <BarChartDashboard
            budgetList={budgetList}/>
            <ExpenseListTable
            expenseList={expensesList}
            refreshData={()=>getBudgetList()}/>
          </div>
          <div className='grid gap-5'>
            <h2 className='font-bold text-lg'>Latest Budgets</h2>
            {budgetList.map((budget,index)=>(
              <BudgetItem budget={budget} key={index}/>
            ))}
          </div>
         </div>
    </div>
  )
}

export default Dashboard