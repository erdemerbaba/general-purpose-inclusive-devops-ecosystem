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
  const [activeTab, setActiveTab] = useState('profile'); 
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      const mockProfile = {
        name: 'John Doe',
        email: 'john.doe@example.com',
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
            <button className="btn btn-light btn-xs change-avatar" onClick={onChangeAvatarClick}>
              Change
            </button>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={onAvatarSelected}
              style={{ display: 'none' }}
            />
          </div>

          <div className="identity-text">
            <h2 className={`name ${loading ? 'skeleton skeleton-text' : ''}`}>
              {loading ? ' ' : profile.name}
            </h2>
            <div className="meta">
              <span className={`role-badge ${loading ? 'skeleton skeleton-chip' : ''}`}>
                {loading ? ' ' : profile.role || '—'}
              </span>
              <span className={`contact-chip ${loading ? 'skeleton skeleton-chip wide' : ''}`}>
                {loading ? ' ' : profile.email}
              </span>
            </div>
          </div>
        </div>

        <div className="profile-actions">
          <button className="btn btn-outline">Edit Profile</button>
          <button className="btn btn-primary">Save Changes</button>
        </div>
      </section>

      {/* TABS */}
      <nav className="tabs">
        <button
          className={`tab ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          Profile
        </button>
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
      {activeTab === 'profile' && (
        <section className="card grid-2">
          <div className="field">
            <label>Name</label>
            <div className={loading ? 'skeleton skeleton-text' : ''}>
              {loading ? ' ' : profile.name}
            </div>
          </div>
          <div className="field">
            <label>Email</label>
            <div className={loading ? 'skeleton skeleton-text' : ''}>
              {loading ? ' ' : profile.email}
            </div>
          </div>
          <div className="field">
            <label>Role</label>
            <div className={loading ? 'skeleton skeleton-text' : ''}>
              {loading ? ' ' : profile.role}
            </div>
          </div>
          <div className="field">
            <label>Status</label>
            <div className="status">
              <span className="status-dot online" /> Active
            </div>
          </div>
          <div className="field span-2">
            <label>Bio</label>
            <div className="muted">Add a short bio or job description to help teammates know you better.</div>
          </div>
        </section>
      )}

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
