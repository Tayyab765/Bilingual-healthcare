import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';
import AdminSidebar from '@/components/AdminSidebar';
import { Check, CreditCard, DollarSign, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AdminPayments = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden pl-64">
        <div className="bg-white shadow-sm z-10 p-4">
          <h1 className="text-2xl font-semibold text-gray-800">Payment Management</h1>
        </div>
        
        <main className="flex-1 overflow-y-auto p-6">
          <Card>
            <CardContent className="p-6">
              <p>Payments content will go here</p>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default AdminPayments;