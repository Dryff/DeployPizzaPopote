'use client'

import { useState, useEffect } from 'react';
import { fetchWithAuth } from '@/app/admin/utils/api';

interface ContactInfo {
  instagram: string;
  phone: string;
  email: string;
}

export function ContactComponent() {
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    instagram: '',
    phone: '',
    email: ''
  });

  useEffect(() => {
    fetchContact();
  }, []);

  const fetchContact = async () => {
    try {
      const response = await fetchWithAuth('/contact');
      const data = await response.json();
      setContactInfo(data);
    } catch (error) {
      console.error('Error fetching contact information:', error);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetchWithAuth('/contact', {
        method: 'PUT',
        body: JSON.stringify(contactInfo)
      });
      fetchContact(); // Refresh data after successful update
    } catch (error) {
      console.error('Error updating contact info:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContactInfo({
      ...contactInfo,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-6">Contact Information</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Instagram
          </label>
          <input
            type="text"
            name="instagram"
            value={contactInfo.instagram}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone
          </label>
          <input
            type="text"
            name="phone"
            value={contactInfo.phone}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={contactInfo.email}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <button 
          type="submit"
          className="w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
        >
          Update Contact Information
        </button>
      </form>
    </div>
  );
}