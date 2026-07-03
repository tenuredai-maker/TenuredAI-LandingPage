import React, { useState } from 'react';
import { Calculator } from 'lucide-react';

export default function K12ImpactCalculator() {
  const [students, setStudents] = useState<number>(500);
  const [staff, setStaff] = useState<number>(50);

  const teacherHoursSaved = staff * 5; // e.g., 5 hours saved per staff per week
  const studentHoursSaved = students * 1; // e.g., 1 hour saved per student per week
  const totalHoursSaved = teacherHoursSaved + studentHoursSaved;

  return (
    <div className="p-8 bg-white rounded-3xl border border-[#EAE8E4] shadow-sm">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-[#F6F3EF] rounded-2xl text-[#775A19]">
          <Calculator className="w-8 h-8" />
        </div>
        <h3 className="font-bold text-2xl">Impact Calculator</h3>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div>
          <label className="block text-sm font-bold mb-2 text-[#4E4639]">Number of Students</label>
          <input 
            type="number" 
            value={students} 
            onChange={(e) => setStudents(Number(e.target.value))}
            className="w-full p-4 rounded-xl border border-[#EAE8E4] focus:outline-none focus:ring-2 focus:ring-[#775A19]"
          />
        </div>
        <div>
          <label className="block text-sm font-bold mb-2 text-[#4E4639]">Number of Staff</label>
          <input 
            type="number" 
            value={staff} 
            onChange={(e) => setStaff(Number(e.target.value))}
            className="w-full p-4 rounded-xl border border-[#EAE8E4] focus:outline-none focus:ring-2 focus:ring-[#775A19]"
          />
        </div>
      </div>

      <div className="bg-[#FCF9F5] p-6 rounded-2xl border border-[#EAE8E4]">
        <div className="text-sm text-[#4E4639] mb-1">Estimated Weekly Savings</div>
        <div className="text-4xl font-bold text-[#775A19]">{totalHoursSaved.toLocaleString()} Hours</div>
        <div className="text-sm text-[#4E4639] mt-2">Combined efficiency gain across students and staff.</div>
      </div>
    </div>
  );
}
