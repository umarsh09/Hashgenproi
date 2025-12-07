import React, { useState, useRef } from 'react';
import { UserProfile } from '../types';
import { useToast } from './CustomToast';

interface SettingsProps {
  user: UserProfile;
  onUpdateUser: (user: UserProfile) => void;
  onUpdatePassword: (currentPass: string, newPass: string) => Promise<boolean>;
  isDarkMode: boolean;
  toggleTheme: () => void;
  onBack?: () => void;
}

export const Settings: React.FC<SettingsProps> = ({ user, onUpdateUser, onUpdatePassword, isDarkMode, toggleTheme, onBack }) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'preferences' | 'security'>('profile');
  const [name, setName] = useState(user.name);
  const [bio, setBio] = useState('Digital Creator using HashtagGenius');
  
  // Password State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { showToast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        showToast('Image too large. Max 5MB.', 'error');
        return;
      }

      // Revoke old blob URL to prevent memory leak
      if (user.avatar && user.avatar.startsWith('blob:')) {
        URL.revokeObjectURL(user.avatar);
      }

      const imageUrl = URL.createObjectURL(file);
      onUpdateUser({ ...user, avatar: imageUrl });
      showToast('Profile picture updated!', 'success');
    }
  };

  const handleSaveProfile = () => {
    onUpdateUser({ ...user, name: name });
    showToast('Profile saved successfully!', 'success');
  };

  const handleUpdatePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      showToast('Please fill in all password fields', 'error');
      return;
    }

    if (newPassword.length < 6) {
      showToast('New password must be at least 6 characters', 'error');
      return;
    }

    if (newPassword !== confirmPassword) {
      showToast('New passwords do not match', 'error');
      return;
    }

    if (currentPassword === newPassword) {
      showToast('New password cannot be the same as current', 'error');
      return;
    }

    try {
      const success = await onUpdatePassword(currentPassword, newPassword);

      if (success) {
        showToast('Password updated successfully!', 'success');
        // Reset fields
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        showToast('Incorrect current password', 'error');
      }
    } catch (err) {
      showToast('An error occurred. Please try again.', 'error');
    }
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in pb-12 relative">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h2>
        {onBack && (
            <button 
                onClick={onBack}
                className="p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white bg-white dark:bg-gray-800 rounded-full border border-gray-200 dark:border-gray-700 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-all z-20"
                title="Close"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
         )}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b border-gray-200 dark:border-gray-700 overflow-x-auto scrollbar-hide">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-6 py-4 text-sm font-medium transition-colors whitespace-nowrap ${
              activeTab === 'profile'
                ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            Profile & Account
          </button>
          <button
            onClick={() => setActiveTab('preferences')}
            className={`px-6 py-4 text-sm font-medium transition-colors whitespace-nowrap ${
              activeTab === 'preferences'
                ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            Preferences
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`px-6 py-4 text-sm font-medium transition-colors whitespace-nowrap ${
              activeTab === 'security'
                ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            Security
          </button>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          {/* PROFILE TAB */}
          {activeTab === 'profile' && (
            <div className="space-y-8 animate-slide-up">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="relative group">
                  <div className="w-24 h-24 rounded-full border-4 border-gray-100 dark:border-gray-700 shadow-md overflow-hidden bg-gray-100 dark:bg-gray-800">
                     <img 
                        src={user.avatar} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                      />
                  </div>
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-0 right-0 p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 shadow-lg border-2 border-white dark:border-gray-800 transition-transform transform hover:scale-110"
                    title="Change Photo"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </button>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </div>
                <div className="text-center sm:text-left">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{user.name}</h3>
                  <p className="text-gray-500 dark:text-gray-400">{user.email}</p>
                  <div className="mt-2 flex items-center justify-center sm:justify-start gap-2">
                    <span className="inline-block px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-xs font-bold uppercase rounded-full tracking-wider">
                      {user.plan} Plan
                    </span>
                    <button 
                        onClick={() => fileInputRef.current?.click()}
                        className="text-xs text-indigo-600 dark:text-indigo-400 font-medium hover:underline"
                    >
                        Change Photo
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2.5 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                  <input 
                    type="email" 
                    value={user.email} 
                    disabled
                    className="w-full bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2.5 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Bio</label>
                  <textarea 
                    rows={3}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Tell us about yourself..."
                    className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2.5 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all resize-none"
                  />
                </div>
              </div>
              
              <div className="flex justify-end pt-4 border-t border-gray-200 dark:border-gray-700">
                <button 
                  onClick={handleSaveProfile}
                  className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors shadow-md"
                >
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {/* PREFERENCES TAB */}
          {activeTab === 'preferences' && (
             <div className="space-y-6 animate-slide-up">
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700">
                  <div>
                    <h4 className="text-base font-semibold text-gray-900 dark:text-white">Appearance</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Switch between light and dark themes</p>
                  </div>
                  <button 
                    onClick={toggleTheme}
                    className="relative inline-flex h-8 w-14 items-center rounded-full bg-gray-300 dark:bg-indigo-600 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                  >
                    <span className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${isDarkMode ? 'translate-x-7' : 'translate-x-1'}`} />
                  </button>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700">
                   <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-4">Email Notifications</h4>
                   <div className="space-y-3">
                     {['Weekly Digest', 'New Features', 'Security Alerts'].map((item) => (
                       <label key={item} className="flex items-center gap-3 cursor-pointer">
                         <input type="checkbox" defaultChecked className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800" />
                         <span className="text-gray-700 dark:text-gray-300">{item}</span>
                       </label>
                     ))}
                   </div>
                </div>
             </div>
          )}

          {/* SECURITY TAB */}
          {activeTab === 'security' && (
            <div className="space-y-6 animate-slide-up">
               <div className="grid gap-6">
                 <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Current Password</label>
                    <input 
                      type="password" 
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2.5 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none" 
                      placeholder="••••••••" 
                    />
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">New Password</label>
                        <input 
                          type="password" 
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2.5 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none" 
                          placeholder="Min 6 chars" 
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Confirm Password</label>
                        <input 
                          type="password" 
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2.5 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none" 
                          placeholder="••••••••" 
                        />
                    </div>
                 </div>
                 <button 
                  onClick={handleUpdatePassword}
                  className="w-full sm:w-auto px-6 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-medium rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors self-start"
                 >
                   Update Password
                 </button>
               </div>
               
               <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                  <h4 className="text-red-600 font-semibold mb-2">Danger Zone</h4>
                  <button className="text-red-500 hover:text-red-700 text-sm font-medium border border-red-200 dark:border-red-900/30 bg-red-50 dark:bg-red-900/10 px-4 py-2 rounded-lg transition-colors">
                    Delete Account
                  </button>
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};