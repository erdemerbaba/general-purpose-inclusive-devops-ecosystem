import React, { useState, useEffect, useRef } from 'react';
import './ProfileComponent.css';

const ProfileComponent = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    role: '',
    avatar: ''
  });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('terms'); 
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      const mockProfile = {
        name: 'admin',
        role: 'Administrator',
        avatar: '' 
      };
      setTimeout(() => {
        setProfile(mockProfile);
        setLoading(false);
      }, 500);
    };
    fetchProfile();
  }, []);

  const initials = (profile.name || 'U N')
    .split(' ')
    .filter(Boolean)
    .map(p => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const onChangeAvatarClick = () => fileInputRef.current?.click();
  const onAvatarSelected = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setProfile(p => ({ ...p, avatar: url }));
  };

  return (
    <div className="profile-page">
      {/* HEADER CARD */}
                  <h1 className="about-title">Profile</h1>
            <p className="about-text">
              Login details listed below.
            </p>
      <section className="card profile-header">
        <div className="profile-identity">
          <div className="avatar-wrap">
            {loading ? (
              <div className="avatar skeleton" />
            ) : profile.avatar ? (
              <img src={profile.avatar} alt={`${profile.name} avatar`} className="avatar" />
            ) : (
              <div className="avatar fallback" aria-label="avatar initials">{initials}</div>
            )}
          </div>

          <div className="identity-text">
            <h2 className={`name ${loading ? 'skeleton skeleton-text' : ''}`}>
              {loading ? ' ' : profile.name}
            </h2>
            <div className="meta">
              <span className={`role-badge ${loading ? 'skeleton skeleton-chip' : ''}`}>
                {loading ? ' ' : profile.role || '—'}
              </span>
            </div>
          </div>
        </div>

      </section>

      {/* TABS */}
      <nav className="tabs">
        <button
          className={`tab ${activeTab === 'terms' ? 'active' : ''}`}
          onClick={() => setActiveTab('terms')}
        >
          Terms of Use
        </button>
        <button
          className={`tab ${activeTab === 'privacy' ? 'active' : ''}`}
          onClick={() => setActiveTab('privacy')}
        >
          Privacy Policy
        </button>
      </nav>

      {/* CONTENT CARDS */}
      {activeTab === 'terms' && (
        <section className="card">
          <h3>Terms of Use</h3>
          <p>
            By using this application, you agree to abide by our terms of use, including respecting
            intellectual property rights, refraining from malicious activities, and adhering to all applicable laws.
          </p>
          <ul className="bullet-list">
            <li>No unauthorized data extraction or misuse.</li>
            <li>Comply with company security and privacy policies.</li>
            <li>Use appropriate language and conduct in shared spaces.</li>
          </ul>
        </section>
      )}

      {activeTab === 'privacy' && (
        <section className="card">
          <h3>Privacy Policy</h3>
          <p>
            We value your privacy and are committed to protecting your personal information. This policy outlines
            what data we collect, why we collect it, and how we safeguard it.
          </p>
          <div className="kv">
            <div><strong>Data collected:</strong></div>
            <div>Profile details, usage analytics, device info (as permitted).</div>
            <div><strong>Your controls:</strong></div>
            <div>Download your data, manage consents, request deletion.</div>
          </div>
        </section>
      )}
    </div>
  );
};

export default ProfileComponent;
