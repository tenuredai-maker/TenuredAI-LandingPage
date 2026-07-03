import React from 'react';
import { motion } from 'motion/react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const deploymentData = [
  { name: 'Month 1', days: 25 },
  { name: 'Month 2', days: 18 },
  { name: 'Month 3', days: 12 },
  { name: 'Month 4', days: 8 },
];

const verificationData = [
  { name: 'Jan', percent: 45 },
  { name: 'Feb', percent: 62 },
  { name: 'Mar', percent: 78 },
  { name: 'Apr', percent: 85 },
];

export default function K12MetricsDashboard() {
  return (
    <div className="grid md:grid-cols-2 gap-8 p-8 bg-white rounded-3xl border border-[#EAE8E4] shadow-sm">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="font-bold text-xl mb-6 text-[#1C1C1A]">Average Deployment Time (Days)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={deploymentData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="days" fill="#775A19" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h3 className="font-bold text-xl mb-6 text-[#1C1C1A]">Percentage of Students Verified</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={verificationData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Line type="monotone" dataKey="percent" stroke="#775A19" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
}
