import { X, QrCode, GraduationCap, ShieldCheck } from 'lucide-react';

interface StudentIDCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: {
    studentCode: string;
    fullName: string;
    cohort: string;
    dateOfBirth: string;
    gender: string;
    major: string;
    specialization: string;
    degreeLevel: string;
    programType: string;
    avatarUrl?: string;
  };
}

export default function StudentIDCardModal({ isOpen, onClose, student }: StudentIDCardModalProps) {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(15, 23, 42, 0.75)',
      backdropFilter: 'blur(6px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      padding: '16px',
    }}>
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '20px',
        width: '100%',
        maxWidth: '520px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        overflow: 'hidden',
        position: 'relative',
        animation: 'slideIn 0.3s ease',
      }}>
        {/* Header Bar */}
        <div style={{
          backgroundColor: '#008689',
          color: '#ffffff',
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <GraduationCap size={24} />
            <div>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700 }}>THẺ SINH VIÊN ĐIỆN TỬ</h3>
              <span style={{ fontSize: '11px', opacity: 0.9 }}>E-EDU STUDENT PORTAL SYSTEM</span>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.2)',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#ffffff',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Card Body */}
        <div style={{
          padding: '24px',
          background: 'linear-gradient(135deg, #ffffff 0%, #f0fdfa 100%)',
        }}>
          <div style={{
            display: 'flex',
            gap: '20px',
            alignItems: 'center',
            marginBottom: '20px',
          }}>
            {/* Avatar with photo frame */}
            <div style={{
              width: '100px',
              height: '130px',
              borderRadius: '12px',
              border: '3px solid #008689',
              boxShadow: '0 4px 10px rgba(0, 134, 137, 0.2)',
              overflow: 'hidden',
              backgroundColor: '#e2e8f0',
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              {student.avatarUrl ? (
                <img
                  src={student.avatarUrl}
                  alt={student.fullName}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <div style={{
                  fontSize: '36px',
                  fontWeight: 700,
                  color: '#008689',
                }}>
                  {student.fullName.charAt(0)}
                </div>
              )}
            </div>

            {/* Info */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                padding: '2px 8px',
                borderRadius: '6px',
                backgroundColor: '#dcfce7',
                color: '#15803d',
                fontSize: '11px',
                fontWeight: 700,
                marginBottom: '6px',
              }}>
                <ShieldCheck size={12} /> HỢP LỆ / ACTIVE
              </div>
              <h2 style={{
                margin: '0 0 6px 0',
                fontSize: '20px',
                fontWeight: 800,
                color: '#0f172a',
                textTransform: 'uppercase',
              }}>
                {student.fullName}
              </h2>
              <p style={{ margin: '0 0 4px 0', fontSize: '13.5px', color: '#334155' }}>
                <strong>MSSV:</strong> <span style={{ color: '#008689', fontWeight: 700 }}>{student.studentCode}</span>
              </p>
              <p style={{ margin: '0 0 4px 0', fontSize: '13px', color: '#475569' }}>
                <strong>Ngành:</strong> {student.major}
              </p>
              <p style={{ margin: '0 0 4px 0', fontSize: '13px', color: '#475569' }}>
                <strong>Khóa học:</strong> {student.cohort} ({student.programType})
              </p>
            </div>
          </div>

          {/* Barcode & Security strip */}
          <div style={{
            borderTop: '1px dashed #cbd5e1',
            paddingTop: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#ffffff',
            padding: '12px 16px',
            borderRadius: '12px',
            border: '1px solid #e2e8f0',
          }}>
            <div>
              <div style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase' }}>
                MÃ ĐỊNH DANH HỌC VIÊN
              </div>
              <div style={{
                fontFamily: 'var(--font-mono, monospace)',
                fontWeight: 700,
                letterSpacing: '3px',
                fontSize: '15px',
                color: '#0f172a',
                marginTop: '2px',
              }}>
                * {student.studentCode} *
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <QrCode size={40} color="#008689" />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          padding: '12px 20px',
          backgroundColor: '#f8fafc',
          borderTop: '1px solid #e2e8f0',
          display: 'flex',
          justifyContent: 'flex-end',
        }}>
          <button
            onClick={onClose}
            style={{
              padding: '8px 20px',
              backgroundColor: '#008689',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 600,
              fontSize: '13.5px',
              cursor: 'pointer',
            }}
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
