"use client"
import React, { useEffect, useState } from 'react'
import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

function BarChartDashboard({budgetList}) {
    const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null
  return (
    <div className='border rounded-lg p-5'>
        <h2 className='font-bold text-lg'>Activity</h2>
       <ResponsiveContainer width={'80%'} height={300}>
        <BarChart 
        data={budgetList}
        margin={{
            top:7
        }}
        >
            <XAxis dataKey='name'/>
            <YAxis/>
            <Tooltip/>
            <Legend/>
            <Bar dataKey='totalSpend' stackId="a" fill='#643B9F'/>
            <Bar dataKey='amount' stackId="a" fill='#f0ceff'/>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default BarChartDashboard
