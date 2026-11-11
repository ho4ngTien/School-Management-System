import { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  Menu,
  GraduationCap,
  Calendar,
  Bell,
  ChevronDown,
  LayoutDashboard,
  CalendarDays,
  Award,
  BookOpen,
  User,
  LogOut,
  X,
  CreditCard
} from 'lucide-react';
import StudentIDCardModal from '../../shared/components/StudentIDCardModal';

export default function StudentLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [showIdCard, setShowIdCard] = useState(false);

  // Student mock info matching template
  const studentInfo = {
    studentCode: '064205013544',
    fullName: 'Hoàng Tiến',
    cohort: '2023',
    gender: 'Nam',
    dateOfBirth: '14/07/2005',
    degreeLevel: 'Đại học - chính quy',
    placeOfBirth: 'Gia Lai',
    programType: 'Chất lượng cao',
    major: 'Công nghệ thông tin',
    specialization: 'Công nghệ thông tin',
  };

  const navItems = [
    { label: 'Trang chủ', path: '/student', icon: <LayoutDashboard size={18} /> },
    { label: 'Thời khóa biểu', path: '/student/schedule', icon: <CalendarDays size={18} /> },
    { label: 'Kết quả học tập', path: '/student/grades', icon: <Award size={18} /> },
    { label: 'Đăng ký học phần', path: '/student/assignments', icon: <BookOpen size={18} /> },
    { label: 'Hồ sơ sinh viên', path: '/profile', icon: <User size={18} /> },
  ];

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    navigate('/login');
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'var(--font-sans)',
    }}>
      {/* ================= TOP NAVBAR ================= */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e2e8f0',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
      }}>
        <div style={{
          maxWidth: '1360px',
          margin: '0 auto',
          padding: '10px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          {/* Left: Hamburger & Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <button
              type="button"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              style={{
                background: 'none',
                border: 'none',
                padding: '6px',
                borderRadius: '8px',
                cursor: 'pointer',
                color: '#334155',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Menu size={22} />
            </button>

            <div
              onClick={() => navigate('/student')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                cursor: 'pointer',
              }}
            >
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                backgroundColor: '#008689',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
              }}>
                <GraduationCap size={22} />
              </div>
              <div>
                <span style={{
                  fontSize: '17px',
                  fontWeight: 800,
                  color: '#008689',
                  letterSpacing: '0.5px',
                  display: 'block',
                  lineHeight: 1.1,
                }}>
                  E-EDU PORTAL
                </span>
                <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 500 }}>
                  CỔNG THÔNG TIN SINH VIÊN
                </span>
              </div>
            </div>
          </div>

          {/* Right: Badges & Profile Capsule */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Lịch học badge button */}
            <button
              type="button"
              onClick={() => navigate('/student/schedule')}
              title="Lịch học tuần này"
              style={{
                position: 'relative',
                background: '#f1f5f9',
                border: 'none',
                borderRadius: '50%',
                width: '38px',
                height: '38px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#334155',
                transition: 'background-color 0.2s',
              }}
            >
              <Calendar size={18} />
              <span style={{
                position: 'absolute',
                top: '-2px',
                right: '-2px',
                backgroundColor: '#008689',
                color: '#ffffff',
                borderRadius: '10px',
                minWidth: '18px',
                height: '18px',
                padding: '0 4px',
                fontSize: '11px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid #ffffff',
              }}>
                2
              </span>
            </button>

            {/* Thông báo badge button */}
            <button
              type="button"
              title="Thông báo mới"
              style={{
                position: 'relative',
                background: '#f1f5f9',
                border: 'none',
                borderRadius: '50%',
                width: '38px',
                height: '38px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#334155',
                transition: 'background-color 0.2s',
              }}
            >
              <Bell size={18} />
              <span style={{
                position: 'absolute',
                top: '-2px',
                right: '-2px',
                backgroundColor: '#ef4444',
                color: '#ffffff',
                borderRadius: '10px',
                minWidth: '18px',
                height: '18px',
                padding: '0 4px',
                fontSize: '11px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid #ffffff',
              }}>
                2
              </span>
            </button>

            {/* User Dropdown Capsule */}
            <div style={{ position: 'relative' }}>
              <div
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '4px 10px 4px 6px',
                  borderRadius: '24px',
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  cursor: 'pointer',
                  userSelect: 'none',
                }}
              >
                <div style={{
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  backgroundColor: '#008689',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '13px',
                }}>
                  {studentInfo.fullName.charAt(0)}
                </div>
                <span style={{ fontSize: '13.5px', fontWeight: 600, color: '#1e293b' }}>
                  {studentInfo.fullName}
                </span>
                <ChevronDown size={15} color="#64748b" />
              </div>

              {/* Menu Popup */}
              {userMenuOpen && (
                <div style={{
                  position: 'absolute',
                  right: 0,
                  top: '110%',
                  backgroundColor: '#ffffff',
                  borderRadius: '12px',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                  width: '220px',
                  padding: '6px 0',
                  zIndex: 200,
                }}>
                  <div style={{ padding: '8px 16px', borderBottom: '1px solid #f1f5f9' }}>
                    <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#0f172a' }}>
                      {studentInfo.fullName}
                    </div>
                    <div style={{ fontSize: '11.5px', color: '#64748b' }}>
                      MSSV: {studentInfo.studentCode}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setShowIdCard(true);
                      setUserMenuOpen(false);
                    }}
                    style={{
                      width: '100%',
                      padding: '10px 16px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      border: 'none',
                      background: 'none',
                      fontSize: '13px',
                      color: '#334155',
                      cursor: 'pointer',
                      textAlign: 'left',
                    }}
                  >
                    <CreditCard size={16} color="#008689" />
                    <span>Thẻ sinh viên điện tử</span>
                  </button>

                  <button
                    onClick={() => {
                      navigate('/profile');
                      setUserMenuOpen(false);
                    }}
                    style={{
                      width: '100%',
                      padding: '10px 16px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      border: 'none',
                      background: 'none',
                      fontSize: '13px',
                      color: '#334155',
                      cursor: 'pointer',
                      textAlign: 'left',
                    }}
                  >
                    <User size={16} color="#008689" />
                    <span>Hồ sơ cá nhân</span>
                  </button>

                  <button
                    onClick={handleLogout}
                    style={{
                      width: '100%',
                      padding: '10px 16px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      border: 'none',
                      background: 'none',
                      fontSize: '13px',
                      color: '#ef4444',
                      cursor: 'pointer',
                      textAlign: 'left',
                      borderTop: '1px solid #f1f5f9',
                    }}
                  >
                    <LogOut size={16} />
                    <span>Đăng xuất</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* ================= DRAWER / SIDEBAR ================= */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.4)',
            zIndex: 150,
          }}
        />
      )}

      <aside style={{
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        width: '260px',
        backgroundColor: '#ffffff',
        borderRight: '1px solid #e2e8f0',
        zIndex: 160,
        transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 0.25s ease',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '4px 0 24px rgba(0, 0, 0, 0.08)',
      }}>
        {/* Sidebar Header */}
        <div style={{
          padding: '16px 20px',
          borderBottom: '1px solid #f1f5f9',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <span style={{ fontSize: '15px', fontWeight: 700, color: '#008689' }}>
            MENU HỌC VỤ
          </span>
          <button
            onClick={() => setSidebarOpen(false)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#64748b',
              padding: '4px',
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Sidebar Items */}
        <nav style={{ padding: '12px 10px', flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => {
                  navigate(item.path);
                  setSidebarOpen(false);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: isActive ? '#e6f4f4' : 'transparent',
                  color: isActive ? '#008689' : '#334155',
                  fontWeight: isActive ? 700 : 500,
                  fontSize: '14px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'background-color 0.15s',
                }}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div style={{ padding: '16px', borderTop: '1px solid #f1f5f9' }}>
          <button
            onClick={() => {
              setShowIdCard(true);
              setSidebarOpen(false);
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              width: '100%',
              padding: '10px 12px',
              backgroundColor: '#008689',
              color: '#ffffff',
              borderRadius: '8px',
              border: 'none',
              fontWeight: 600,
              fontSize: '13px',
              cursor: 'pointer',
              justifyContent: 'center',
            }}
          >
            <CreditCard size={16} />
            <span>Xem thẻ sinh viên</span>
          </button>
        </div>
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>

      {/* ================= STUDENT ID CARD MODAL ================= */}
      <StudentIDCardModal
        isOpen={showIdCard}
        onClose={() => setShowIdCard(false)}
        student={studentInfo}
      />
    </div>
  );
}
