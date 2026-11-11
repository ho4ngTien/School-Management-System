import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Megaphone, 
  ArrowRight, 
  Calendar, 
  Eye, 
  EyeOff, 
  Lock, 
  User, 
  GraduationCap, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
import axios from 'axios';

interface NewsItem {
  id: string;
  title: string;
  date: string;
  tag?: string;
  isImportant?: boolean;
}

const NEWS_DATA: NewsItem[] = [
  {
    id: '1',
    title: 'THÔNG BÁO ĐÓNG BẢO HIỂM Y TẾ NĂM HỌC 2026 - 2027',
    date: '03/11/2026',
    tag: 'Tài chính',
    isImportant: true,
  },
  {
    id: '2',
    title: 'Thông báo V/v Đăng ký tham gia Ngày hội sinh viên năm học 2026 - 2027',
    date: '02/11/2026',
    tag: 'Hoạt động',
  },
  {
    id: '3',
    title: 'Thông báo về việc đăng ký các học phần điều kiện',
    date: '15/10/2026',
    tag: 'Đào tạo',
    isImportant: true,
  },
  {
    id: '4',
    title: 'Thông báo V/v đóng học phí HKI năm học 2026 – 2027',
    date: '05/10/2026',
    tag: 'Học phí',
  },
  {
    id: '5',
    title: 'Thông báo cập nhật thông tin đăng ký khám sức khỏe định kỳ sinh viên năm học 2026 - 2027',
    date: '02/10/2026',
    tag: 'Y tế',
  },
  {
    id: '6',
    title: 'Quy định tổ chức giảng dạy, học tập tiếng Anh và chuẩn đầu ra tiếng Anh đối với sinh viên',
    date: '25/09/2026',
    tag: 'Đào tạo',
  },
  {
    id: '7',
    title: 'Thông báo về việc gia hạn thời gian đăng ký học phần học kỳ 1 năm học 2026-2027',
    date: '15/09/2026',
    tag: 'Đào tạo',
  },
];

export default function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('064205013544');
  const [password, setPassword] = useState('Password@123');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<'student' | 'teacher' | 'admin'>('student');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRoleSelect = (role: 'student' | 'teacher' | 'admin') => {
    setSelectedRole(role);
    if (role === 'student') {
      setUsername('064205013544');
      setPassword('Student@123');
    } else if (role === 'teacher') {
      setUsername('teacher.gv01');
      setPassword('Teacher@123');
    } else {
      setUsername('admin');
      setPassword('Admin@123');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Attempt backend login
      const response = await axios.post('/api/v1/identity/auth/login', {
        username: username.trim(),
        password: password.trim(),
      }).catch(() => null);

      if (response && response.data) {
        localStorage.setItem('auth_token', response.data.accessToken);
        localStorage.setItem('auth_user', JSON.stringify(response.data.user));
      } else {
        // Fallback demo state
        const demoUser = {
          id: 'demo-student-uuid',
          username: username.trim() || '064205013544',
          fullName: selectedRole === 'student' ? 'Hoàng Tiến' : selectedRole === 'teacher' ? 'ThS. Nguyễn Văn Thầy' : 'Quản Trị Viên',
          role: selectedRole,
          studentCode: '064205013544',
        };
        localStorage.setItem('auth_token', 'demo-mock-jwt-token');
        localStorage.setItem('auth_user', JSON.stringify(demoUser));
      }

      // Navigate based on selected role
      if (selectedRole === 'student') {
        navigate('/student');
      } else if (selectedRole === 'teacher') {
        navigate('/teacher');
      } else {
        navigate('/admin');
      }
    } catch (err: unknown) {
      const errorObj = err as { response?: { data?: { message?: string } } };
      setError(errorObj.response?.data?.message || 'Đăng nhập không thành công. Vui lòng kiểm tra lại tài khoản.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f1f5f9',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '32px 16px',
      fontFamily: 'var(--font-sans)',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '1240px',
        margin: '0 auto',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '24px',
          alignItems: 'start',
        }}>
          {/* ================= LEFT: TIN TỨC & THÔNG BÁO ================= */}
          <div style={{
            background: '#ffffff',
            borderRadius: '16px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)',
            padding: '24px',
            gridColumn: 'span 1',
            minWidth: 0,
          }}>
            {/* Header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingBottom: '16px',
              borderBottom: '2px solid #f1f5f9',
              marginBottom: '16px',
              flexWrap: 'wrap',
              gap: '12px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '10px',
                  backgroundColor: '#e6f4f4',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#008689',
                }}>
                  <Megaphone size={22} />
                </div>
                <div>
                  <h2 style={{
                    fontSize: '18px',
                    fontWeight: 700,
                    color: '#0f172a',
                    margin: 0,
                  }}>
                    Tin tức &amp; Thông báo
                  </h2>
                  <span style={{ fontSize: '13px', color: '#64748b' }}>
                    Cập nhật mới nhất từ nhà trường
                  </span>
                </div>
              </div>

              <a
                href="#all-news"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '13.5px',
                  fontWeight: 600,
                  color: '#008689',
                  textDecoration: 'none',
                  transition: 'gap 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.gap = '10px')}
                onMouseLeave={(e) => (e.currentTarget.style.gap = '6px')}
              >
                Xem tất cả <ArrowRight size={16} />
              </a>
            </div>

            {/* News List */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              maxHeight: '520px',
              overflowY: 'auto',
              paddingRight: '6px',
            }}>
              {NEWS_DATA.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    padding: '12px',
                    borderRadius: '12px',
                    backgroundColor: '#f8fafc',
                    border: '1px solid #edf2f7',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#f0fdfa';
                    e.currentTarget.style.borderColor = '#99f6e4';
                    e.currentTarget.style.transform = 'translateX(4px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#f8fafc';
                    e.currentTarget.style.borderColor = '#edf2f7';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}
                >
                  {/* Thumbnail / Tag Icon */}
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '8px',
                    backgroundColor: item.isImportant ? '#fff2e8' : '#e2e8f0',
                    color: item.isImportant ? '#ff6600' : '#475569',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '11px',
                    flexShrink: 0,
                    textAlign: 'center',
                    padding: '4px',
                  }}>
                    {item.tag || 'TIN TỨC'}
                  </div>

                  {/* Title & Date */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h3 style={{
                      fontSize: '14px',
                      fontWeight: 600,
                      color: '#1e293b',
                      lineHeight: 1.4,
                      margin: '0 0 6px 0',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}>
                      {item.title}
                    </h3>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '12px',
                      color: '#64748b',
                    }}>
                      <Calendar size={13} color="#008689" />
                      <span>{item.date}</span>
                    </div>
                  </div>

                  <ArrowRight size={18} color="#94a3b8" />
                </div>
              ))}
            </div>

            {/* Bottom link */}
            <div style={{
              marginTop: '16px',
              paddingTop: '14px',
              borderTop: '1px solid #f1f5f9',
              textAlign: 'center',
            }}>
              <a
                href="#all-news"
                style={{
                  display: 'inline-block',
                  color: '#008689',
                  fontSize: '14px',
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                Xem tất cả thông báo nhà trường →
              </a>
            </div>
          </div>

          {/* ================= RIGHT: ĐĂNG NHẬP HỆ THỐNG ================= */}
          <div style={{
            background: '#ffffff',
            borderRadius: '16px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 10px 30px rgba(0, 134, 137, 0.08)',
            padding: '32px 28px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}>
            {/* Logo and Brand */}
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '64px',
                height: '64px',
                borderRadius: '16px',
                backgroundColor: '#008689',
                color: '#ffffff',
                marginBottom: '12px',
                boxShadow: '0 4px 14px rgba(0, 134, 137, 0.35)',
              }}>
                <GraduationCap size={36} />
              </div>
              <h1 style={{
                fontSize: '22px',
                fontWeight: 800,
                color: '#008689',
                letterSpacing: '0.5px',
                margin: '0 0 4px 0',
              }}>
                ĐĂNG NHẬP HỆ THỐNG
              </h1>
              <p style={{
                fontSize: '13.5px',
                color: '#64748b',
                margin: 0,
              }}>
                Cổng thông tin đào tạo &amp; học vụ E-Edu Portal
              </p>
            </div>

            {/* Quick Role Demo Selector */}
            <div style={{
              marginBottom: '20px',
              background: '#f8fafc',
              padding: '6px',
              borderRadius: '10px',
              display: 'flex',
              gap: '4px',
              border: '1px solid #e2e8f0',
            }}>
              {(['student', 'teacher', 'admin'] as const).map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => handleRoleSelect(role)}
                  style={{
                    flex: 1,
                    padding: '8px 4px',
                    borderRadius: '8px',
                    border: 'none',
                    fontSize: '12.5px',
                    fontWeight: selectedRole === role ? 700 : 500,
                    backgroundColor: selectedRole === role ? '#008689' : 'transparent',
                    color: selectedRole === role ? '#ffffff' : '#64748b',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {role === 'student' ? 'Sinh viên' : role === 'teacher' ? 'Giảng viên' : 'Quản trị'}
                </button>
              ))}
            </div>

            {/* Error Message */}
            {error && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 14px',
                borderRadius: '8px',
                backgroundColor: '#fef2f2',
                border: '1px solid #fecaca',
                color: '#b91c1c',
                fontSize: '13px',
                marginBottom: '18px',
              }}>
                <AlertCircle size={18} style={{ flexShrink: 0 }} />
                <span>{error}</span>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {/* Username Input */}
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '13.5px',
                  fontWeight: 600,
                  color: '#334155',
                  marginBottom: '6px',
                }}>
                  Tài khoản đăng nhập
                </label>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: '#ffffff',
                  border: '1.5px solid #cbd5e1',
                  borderRadius: '10px',
                  padding: '10px 14px',
                  transition: 'border-color 0.2s, box-shadow 0.2s',
                }}>
                  <User size={18} color="#94a3b8" style={{ marginRight: '10px' }} />
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Nhập mã số sinh viên hoặc username"
                    style={{
                      border: 'none',
                      outline: 'none',
                      width: '100%',
                      fontSize: '14.5px',
                      color: '#0f172a',
                      background: 'transparent',
                    }}
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '13.5px',
                  fontWeight: 600,
                  color: '#334155',
                  marginBottom: '6px',
                }}>
                  Mật khẩu
                </label>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: '#ffffff',
                  border: '1.5px solid #cbd5e1',
                  borderRadius: '10px',
                  padding: '10px 14px',
                  transition: 'border-color 0.2s, box-shadow 0.2s',
                }}>
                  <Lock size={18} color="#94a3b8" style={{ marginRight: '10px' }} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Nhập mật khẩu"
                    style={{
                      border: 'none',
                      outline: 'none',
                      width: '100%',
                      fontSize: '14.5px',
                      color: '#0f172a',
                      background: 'transparent',
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: 0,
                      color: '#94a3b8',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  width: '100%',
                  padding: '12px 20px',
                  borderRadius: '10px',
                  border: 'none',
                  backgroundColor: '#008689',
                  color: '#ffffff',
                  fontSize: '15px',
                  fontWeight: 700,
                  cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.7 : 1,
                  boxShadow: '0 4px 12px rgba(0, 134, 137, 0.25)',
                  transition: 'background-color 0.2s, transform 0.1s',
                  marginTop: '6px',
                }}
                onMouseEnter={(e) => {
                  if (!loading) e.currentTarget.style.backgroundColor = '#006b6d';
                }}
                onMouseLeave={(e) => {
                  if (!loading) e.currentTarget.style.backgroundColor = '#008689';
                }}
              >
                {loading ? (
                  'Đang đăng nhập...'
                ) : (
                  <>
                    <span>Đăng nhập</span>
                    <CheckCircle2 size={18} />
                  </>
                )}
              </button>

              {/* Forgot password */}
              <div style={{ textAlign: 'center' }}>
                <a
                  href="#forgot-password"
                  onClick={(e) => {
                    e.preventDefault();
                    alert('Vui lòng liên hệ Phòng Đào tạo hoặc Phòng Công tác sinh viên để được hỗ trợ cấp lại mật khẩu.');
                  }}
                  style={{
                    fontSize: '13.5px',
                    color: '#008689',
                    textDecoration: 'none',
                    fontWeight: 600,
                  }}
                >
                  Quên mật khẩu?
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
