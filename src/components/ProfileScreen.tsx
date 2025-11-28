import { User, Heart, Stethoscope, Phone, Mail, Calendar, MapPin, LogOut, ChevronRight } from 'lucide-react';

interface ProfileScreenProps {
  onLogout: () => void;
  onViewCarePlan: () => void;
}

export function ProfileScreen({ onLogout, onViewCarePlan }: ProfileScreenProps) {
  const profileSections = [
    {
      title: 'Personal Information',
      icon: User,
      items: [
        { label: 'Name', value: 'Mohammad Ahmed' },
        { label: 'Date of Birth', value: 'January 15, 1985' },
        { label: 'Blood Type', value: 'O+' },
        { label: 'Email', value: 'mohammad.ahmed@email.com' },
        { label: 'Phone', value: '+1 (555) 123-4567' },
      ]
    },
    {
      title: 'Surgery Information',
      icon: Heart,
      items: [
        { label: 'Procedure', value: 'Laparoscopic Cholecystectomy' },
        { label: 'Surgery Date', value: 'November 20, 2025' },
        { label: 'Hospital', value: 'City Medical Center' },
        { label: 'Room', value: '304' },
      ]
    },
    {
      title: 'Care Team',
      icon: Stethoscope,
      items: [
        { label: 'Primary Surgeon', value: 'Dr. Sarah Johnson' },
        { label: 'Primary Nurse', value: 'Jennifer Lee, RN' },
        { label: 'Department', value: 'General Surgery' },
        { label: 'Emergency Contact', value: '+1 (555) 999-8888' },
      ]
    },
  ];

  return (
    <div style={{ 
      minHeight: '100vh',
      backgroundColor: 'var(--bg-light)',
      paddingBottom: '88px',
    }}>
      {/* Header */}
      <div style={{ 
        backgroundColor: 'var(--bg-white)',
        padding: '16px',
        paddingTop: '24px',
        borderBottom: '1px solid var(--border-grey)',
      }}>
        <h2>Profile</h2>
      </div>

      <div style={{ padding: '16px' }}>
        {/* Profile Header Card */}
        <div style={{
          backgroundColor: 'var(--bg-white)',
          borderRadius: '16px',
          padding: '20px',
          boxShadow: '0 4px 16px rgba(0,0,0,0.05)',
          marginBottom: '24px',
          textAlign: 'center',
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            backgroundColor: 'var(--primary-blue)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px',
            color: 'white',
            fontSize: '32px',
            fontWeight: '600',
          }}>
            MA
          </div>
          <h2 style={{ marginBottom: '4px' }}>Mohammad Ahmed</h2>
          <p style={{ color: 'var(--muted-text)' }}>Patient ID: #PAT-2025-001</p>
        </div>

        {/* Information Sections */}
        {profileSections.map((section, sectionIndex) => {
          const Icon = section.icon;
          return (
            <div key={sectionIndex} style={{ marginBottom: '16px' }}>
              <div style={{
                backgroundColor: 'var(--bg-white)',
                borderRadius: '16px',
                padding: '16px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.05)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                  <Icon size={20} style={{ color: 'var(--primary-blue)' }} />
                  <h3>{section.title}</h3>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {section.items.map((item, itemIndex) => (
                    <div key={itemIndex} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                      <p style={{ color: 'var(--muted-text)', flex: '0 0 40%' }}>{item.label}</p>
                      <p style={{ textAlign: 'right', flex: '0 0 60%' }}>{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}

        {/* Action Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
          <button
            onClick={onViewCarePlan}
            style={{
              backgroundColor: 'var(--bg-white)',
              border: '1px solid var(--border-grey)',
              borderRadius: '12px',
              padding: '16px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Heart size={20} style={{ color: 'var(--primary-blue)' }} />
              <span style={{ fontWeight: '500' }}>View Full Care Plan</span>
            </div>
            <ChevronRight size={20} style={{ color: 'var(--muted-text)' }} />
          </button>

          <button
            style={{
              backgroundColor: 'var(--bg-white)',
              border: '1px solid var(--border-grey)',
              borderRadius: '12px',
              padding: '16px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Phone size={20} style={{ color: 'var(--primary-blue)' }} />
              <span style={{ fontWeight: '500' }}>Contact Support</span>
            </div>
            <ChevronRight size={20} style={{ color: 'var(--muted-text)' }} />
          </button>
        </div>

        {/* Logout Button */}
        <button
          onClick={onLogout}
          style={{
            width: '100%',
            backgroundColor: '#FEE2E2',
            color: 'var(--error-red)',
            padding: '16px',
            borderRadius: '12px',
            border: 'none',
            cursor: 'pointer',
            fontWeight: '500',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
          }}
        >
          <LogOut size={20} />
          Log Out
        </button>

        {/* App Version */}
        <p className="caption" style={{ textAlign: 'center', color: 'var(--muted-text)', marginTop: '24px' }}>
          Recovery Companion v1.0.0
        </p>
      </div>
    </div>
  );
}
