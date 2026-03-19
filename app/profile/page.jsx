'use client';
import { useRouter } from "next/navigation";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProfilePage() {

  // ✅ Logged-in user
  const [user, setUser] = useState(null);
const router = useRouter();
  // ✅ Your form accounts
  const [accounts, setAccounts] = useState([
    {
      id: Date.now(),
      username: '',
      age: '',
      gender: '',
      mobile: '',
      gmail: '',
    },
  ]);

  // ✅ Fetch logged-in user
  useEffect(() => {
  const getUser = async () => {
    try {
      const res = await fetch('/api/auth/me', {
        credentials: 'include'
      });

      if (!res.ok) {
        // ❌ Not logged in → redirect
       
const router = useRouter();

router.push("/login");
        return;
      }

      const data = await res.json();
      setUser(data.user);

      // ✅ Auto-fill first account
      setAccounts([{
        id: Date.now(),
        username: data.user.name || '',
        age: data.user.age || '',
        gender: data.user.gender || '',
        mobile: data.user.mobile || '',
        gmail: data.user.email || '',
      }]);

    } catch (error) {
      router.push("/login");
    }
  };

  getUser();
}, []);

  // ✅ Add new account
const addAccount = () => {
  router.push("/login"); // ✅ always redirect
};

  // ✅ Update account fields
  const updateAccount = (id, field, value) => {
    setAccounts(accounts.map(acc =>
      acc.id === id ? { ...acc, [field]: value } : acc
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">

        {/* 🔥 Logged-in User Info */}
        

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-extrabold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"
        >
          Profile Accounts
        </motion.h1>

        {/* Accounts Form */}
        <AnimatePresence>
          {accounts.map((account, index) => (
            <motion.div
              key={account.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl p-6 mb-6 border border-white/20"
            >
              <h2 className="text-xl font-semibold mb-4">
                Account {index + 1}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                {/* Username */}
                <input
                  type="text"
                  placeholder="Username"
                  value={account.username}
                  onChange={(e) => updateAccount(account.id, 'username', e.target.value)}
                  className="px-4 py-2 border rounded-lg"
                />

                {/* Age */}
                <input
                  type="number"
                  placeholder="Age"
                  value={account.age}
                  onChange={(e) => updateAccount(account.id, 'age', e.target.value)}
                  className="px-4 py-2 border rounded-lg"
                />

                {/* Gender */}
                <select
                  value={account.gender}
                  onChange={(e) => updateAccount(account.id, 'gender', e.target.value)}
                  className="px-4 py-2 border rounded-lg"
                >
                  <option value="">Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>

                {/* Mobile */}
                <input
                  type="tel"
                  placeholder="Mobile"
                  value={account.mobile}
                  onChange={(e) => updateAccount(account.id, 'mobile', e.target.value)}
                  className="px-4 py-2 border rounded-lg"
                />

                {/* Gmail */}
                <input
                  type="email"
                  placeholder="Gmail"
                  value={account.gmail}
                  onChange={(e) => updateAccount(account.id, 'gmail', e.target.value)}
                  className="px-4 py-2 border rounded-lg col-span-2"
                />

              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* ✅ Add Account Button */}
        <div className="flex justify-center mt-6">
        <button
  onClick={addAccount}
  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
>
  Add Account
</button>
        </div>

      </div>
    </div>
  );
}