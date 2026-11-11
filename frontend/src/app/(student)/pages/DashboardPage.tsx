import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Bell,
  Calendar as CalendarIcon,
  CreditCard,
  Headphones,
  DollarSign,
  FileText,
  BookOpen,
  ClipboardList,
  CheckSquare,
  ChevronDown,
  ArrowRight,
  TrendingUp,
  Award
} from 'lucide-react';
import MonthlyCalendarWidget from '../../../shared/components/MonthlyCalendarWidget';
import StudentIDCardModal from '../../../shared/components/StudentIDCardModal';

export default function StudentDashboardPage() {
  const navigate = useNavigate();
  const [showIdCard, setShowIdCard] = useState(false);
  const [selectedSemester, setSelectedSemester] = useState('77');

  // Student mock info matching template
  const student = {
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

  // Quick Action Services matching template
  const services = [
    {
      title: 'Hỗ trợ trực tuyến',
      icon: <Headphones size={24} color="#008689" />,
      link: '#support',
      onClick: () => alert('Đang chuyển hướng tới Cổng Hỗ trợ trực tuyến sinh viên.'),
    },
    {
      title: 'Thanh toán khoản thu BHYT',
      icon: <DollarSign size={24} color="#059669" />,
      link: '#bhyt',
      onClick: () => alert('Chức năng thanh toán Bảo hiểm Y tế trực tuyến.'),
    },
    {
      title: 'Cổng thanh toán trực tuyến',
      icon: <DollarSign size={24} color="#2563eb" />,
      link: '#tuition-pay',
      onClick: () => alert('Chức năng thanh toán học phí qua cổng ngân hàng/VNPAY.'),
    },
    {
      title: 'Dịch vụ sinh viên',
      icon: <FileText size={24} color="#7c3aed" />,
      link: '#services',
      onClick: () => alert('Đăng ký cấp giấy xác nhận sinh viên, bảng điểm, đơn từ trực tuyến.'),
    },
    {
      title: 'Chương trình khung',
      icon: <BookOpen size={24} color="#ea580c" />,
      link: '#curriculum',
      onClick: () => navigate('/student/assignments'),
    },
    {
      title: 'Đăng ký học phần',
      icon: <ClipboardList size={24} color="#0891b2" />,
      link: '#registration',
      onClick: () => navigate('/student/assignments'),
    },
    {
      title: 'Đăng ký môn học điều kiện',
      icon: <CheckSquare size={24} color="#d97706" />,
      link: '#conditional',
      onClick: () => alert('Đăng ký môn Giáo dục thể chất / Quốc phòng an ninh / Tiếng Anh chuẩn đầu ra.'),
    },
    {
      title: 'Tra cứu công nợ',
      icon: <TrendingUp size={24} color="#dc2626" />,
      link: '#debt',
      onClick: () => alert('Hiện tại bạn không có khoản nợ học phí nào còn đọng.'),
    },
    {
      title: 'Đăng ký xét tốt nghiệp',
      icon: <Award size={24} color="#4f46e5" />,
      link: '#graduation',
      onClick: () => alert('Chức năng mở vào cuối học kỳ cuối khóa.'),
    },
  ];

  // Enrolled courses in current semester matching template
  const enrolledCourses = [
    { name: 'Trí tuệ nhân tạo và ứng dụng', credits: 3, code: 'IT401' },
    { name: 'Sinh hoạt Học kỳ doanh nghiệp', credits: 0, code: 'IT490' },
    { name: 'Học kỳ doanh nghiệp', credits: 12, code: 'IT499' },
  ];

  return (
    <div style={{
      maxWidth: '1360px',
      margin: '0 auto',
      padding: '24px 20px 48px',
      fontFamily: 'var(--font-sans)',
    }}>
      {/* ================= ROW 1: STUDENT INFO & CALENDAR ================= */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
        gap: '24px',
        marginBottom: '24px',
      }}>
        {/* LEFT COLUMN: Student Info + 2 Quick Cards (Span 7.5 or 8 on desktop) */}
        <div style={{
          gridColumn: 'span 12',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}>
          {/* Main Container Grid: Left (Profile & Quick cards) + Right (Calendar) */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: '24px',
          }}>
            {/* Left Sub-column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Profile Card */}
              <div style={{
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                border: '1px solid #e2e8f0',
                padding: '20px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
              }}>
                {/* Header */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingBottom: '14px',
                  borderBottom: '1px solid #f1f5f9',
                  marginBottom: '16px',
                }}>
                  <h2 style={{
                    fontSize: '17px',
                    fontWeight: 700,
                    color: '#008689',
                    margin: 0,
                  }}>
                    Thông tin sinh viên
                  </h2>

                  <button
                    type="button"
                    onClick={() => setShowIdCard(true)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      backgroundColor: '#e6f4f4',
                      color: '#008689',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '6px 14px',
                      fontSize: '13px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'background-color 0.2s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#ccfbf1')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#e6f4f4')}
                  >
                    <CreditCard size={15} />
                    <span>Thẻ sinh viên</span>
                  </button>
                </div>

                {/* Details layout: Avatar on Left, Metadata Grid on Right */}
                <div style={{
                  display: 'flex',
                  gap: '20px',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                }}>
                  {/* Avatar */}
                  <div style={{
                    width: '84px',
                    height: '84px',
                    borderRadius: '50%',
                    backgroundColor: '#008689',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '32px',
                    fontWeight: 700,
                    boxShadow: '0 4px 12px rgba(0, 134, 137, 0.25)',
                    flexShrink: 0,
                  }}>
                    {student.fullName.charAt(0)}
                  </div>

                  {/* Metadata Grid */}
                  <div style={{
                    flex: 1,
                    minWidth: '240px',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                    gap: '10px 16px',
                    fontSize: '13.5px',
                  }}>
                    <div>
                      <span style={{ color: '#64748b' }}>MSSV: </span>
                      <strong style={{ color: '#008689' }}>{student.studentCode}</strong>
                    </div>
                    <div>
                      <span style={{ color: '#64748b' }}>Khóa học: </span>
                      <strong>{student.cohort}</strong>
                    </div>

                    <div>
                      <span style={{ color: '#64748b' }}>Họ tên: </span>
                      <strong>{student.fullName}</strong>
                    </div>
                    <div>
                      <span style={{ color: '#64748b' }}>Giới tính: </span>
                      <strong>{student.gender}</strong>
                    </div>

                    <div>
                      <span style={{ color: '#64748b' }}>Ngày sinh: </span>
                      <strong>{student.dateOfBirth}</strong>
                    </div>
                    <div>
                      <span style={{ color: '#64748b' }}>Bậc đào tạo: </span>
                      <strong>{student.degreeLevel}</strong>
                    </div>

                    <div>
                      <span style={{ color: '#64748b' }}>Nơi sinh: </span>
                      <strong>{student.placeOfBirth}</strong>
                    </div>
                    <div>
                      <span style={{ color: '#64748b' }}>Loại hình: </span>
                      <strong>{student.programType}</strong>
                    </div>

                    <div style={{ gridColumn: 'span 2' }}>
                      <span style={{ color: '#64748b' }}>Ngành: </span>
                      <strong>{student.major}</strong> ({student.specialization})
                    </div>
                  </div>
                </div>
              </div>

              {/* 2 Quick Cards: Thông báo & Lịch học trong tuần */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '16px',
              }}>
                {/* Thông báo / Sự kiện */}
                <div style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '16px',
                  border: '1px solid #e2e8f0',
                  padding: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                }}>
                  <div>
                    <span style={{ fontSize: '13px', fontWeight: 600, color: '#64748b' }}>
                      Thông báo/ sự kiện
                    </span>
                    <div style={{
                      display: 'flex',
                      alignItems: 'baseline',
                      gap: '8px',
                      margin: '4px 0',
                    }}>
                      <span style={{ fontSize: '26px', fontWeight: 800, color: '#ff6600' }}>
                        2
                      </span>
                      <span style={{ fontSize: '12px', color: '#059669', fontWeight: 600 }}>
                        Mới cập nhật
                      </span>
                    </div>
                    <a
                      href="#notices"
                      onClick={(e) => { e.preventDefault(); alert('Chuyển tới danh sách sự kiện chờ đăng ký.'); }}
                      style={{
                        fontSize: '12.5px',
                        fontWeight: 600,
                        color: '#008689',
                        textDecoration: 'none',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      Xem chi tiết <ArrowRight size={13} />
                    </a>
                  </div>

                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    backgroundColor: '#fff2e8',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ff6600',
                  }}>
                    <Bell size={22} />
                  </div>
                </div>

                {/* Lịch học trong tuần */}
                <div style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '16px',
                  border: '1px solid #e2e8f0',
                  padding: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                }}>
                  <div>
                    <span style={{ fontSize: '13px', fontWeight: 600, color: '#64748b' }}>
                      Lịch học trong tuần
                    </span>
                    <div style={{
                      display: 'flex',
                      alignItems: 'baseline',
                      gap: '8px',
                      margin: '4px 0',
                    }}>
                      <span style={{ fontSize: '26px', fontWeight: 800, color: '#008689' }}>
                        2
                      </span>
                      <span style={{ fontSize: '12px', color: '#64748b' }}>
                        buổi học
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => navigate('/student/schedule')}
                      style={{
                        background: 'none',
                        border: 'none',
                        padding: 0,
                        fontSize: '12.5px',
                        fontWeight: 600,
                        color: '#008689',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      Xem chi tiết <ArrowRight size={13} />
                    </button>
                  </div>

                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    backgroundColor: '#e6f4f4',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#008689',
                  }}>
                    <CalendarIcon size={22} />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Sub-column: Monthly Calendar */}
            <div>
              <MonthlyCalendarWidget
                onDateSelect={(d) => alert(`Đã chọn ngày ${d}. Lịch học trực quan tương ứng đã được tải.`)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ================= ROW 2: QUICK SERVICES / UTILITIES ================= */}
      <div style={{
        marginBottom: '28px',
      }}>
        <h3 style={{
          fontSize: '15px',
          fontWeight: 700,
          color: '#334155',
          marginBottom: '14px',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
        }}>
          Tiện ích &amp; Dịch vụ sinh viên
        </h3>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(135px, 1fr))',
          gap: '12px',
        }}>
          {services.map((svc, idx) => (
            <div
              key={idx}
              onClick={svc.onClick}
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '14px',
                padding: '16px 10px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.02)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.borderColor = '#99f6e4';
                e.currentTarget.style.boxShadow = '0 8px 18px rgba(0, 134, 137, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = '#e2e8f0';
                e.currentTarget.style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.02)';
              }}
            >
              <div style={{
                marginBottom: '10px',
                width: '42px',
                height: '42px',
                borderRadius: '10px',
                backgroundColor: '#f8fafc',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                {svc.icon}
              </div>
              <span style={{
                fontSize: '12.5px',
                fontWeight: 600,
                color: '#1e293b',
                lineHeight: 1.3,
              }}>
                {svc.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ================= ROW 3: KẾT QUẢ, TIẾN ĐỘ & LỚP HỌC PHẦN ================= */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '20px',
      }}>
        {/* Card 1: Kết quả học tập */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          border: '1px solid #e2e8f0',
          padding: '20px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingBottom: '12px',
            borderBottom: '1px solid #f1f5f9',
            marginBottom: '16px',
          }}>
            <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#008689', margin: 0 }}>
              Kết quả học tập
            </h3>

            <div style={{ position: 'relative' }}>
              <select
                value={selectedSemester}
                onChange={(e) => setSelectedSemester(e.target.value)}
                style={{
                  padding: '4px 26px 4px 10px',
                  borderRadius: '6px',
                  border: '1px solid #cbd5e1',
                  backgroundColor: '#ffffff',
                  fontSize: '12px',
                  fontWeight: 600,
                  color: '#334155',
                  cursor: 'pointer',
                  appearance: 'none',
                }}
              >
                <option value="77">Học kỳ 1 năm học 2026-2027</option>
                <option value="76">Học kỳ 2 năm học 2025-2026</option>
                <option value="75">Học kỳ 1 năm học 2025-2026</option>
              </select>
              <ChevronDown size={14} color="#64748b" style={{ position: 'absolute', right: '8px', top: '8px', pointerEvents: 'none' }} />
            </div>
          </div>

          {/* Empty / Not graded state matching template */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '36px 16px',
            textAlign: 'center',
          }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: '#f1f5f9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#94a3b8',
              marginBottom: '12px',
            }}>
              <FileText size={32} />
            </div>
            <p style={{ margin: 0, fontSize: '14px', color: '#64748b', fontWeight: 500 }}>
              Không có dữ liệu điểm cho học kỳ này!
            </p>
            <span style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>
              Điểm số đang được giảng viên chấm và cập nhật
            </span>
          </div>
        </div>

        {/* Card 2: Tiến độ học tập (Donut Chart) */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          border: '1px solid #e2e8f0',
          padding: '20px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
          display: 'flex',
          flexDirection: 'column',
        }}>
          <div style={{
            paddingBottom: '12px',
            borderBottom: '1px solid #f1f5f9',
            marginBottom: '16px',
          }}>
            <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#008689', margin: 0 }}>
              Tiến độ học tập
            </h3>
          </div>

          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '12px 0',
          }}>
            {/* SVG Circular Progress Chart */}
            <div style={{ position: 'relative', width: '150px', height: '150px' }}>
              <svg width="150" height="150" viewBox="0 0 150 150">
                {/* Background Ring */}
                <circle
                  cx="75"
                  cy="75"
                  r="60"
                  fill="none"
                  stroke="#e2e8f0"
                  strokeWidth="12"
                />
                {/* Foreground Ring: 105/120 = 87.5% -> strokeDasharray */}
                <circle
                  cx="75"
                  cy="75"
                  r="60"
                  fill="none"
                  stroke="#008689"
                  strokeWidth="12"
                  strokeDasharray="377"
                  strokeDashoffset="47.1"
                  strokeLinecap="round"
                  transform="rotate(-90 75 75)"
                  style={{ transition: 'stroke-dashoffset 1s ease' }}
                />
              </svg>

              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <span style={{ fontSize: '24px', fontWeight: 800, color: '#008689' }}>
                  87.5%
                </span>
                <span style={{ fontSize: '11px', color: '#64748b' }}>
                  Hoàn thành
                </span>
              </div>
            </div>

            <div style={{
              marginTop: '16px',
              padding: '6px 16px',
              borderRadius: '20px',
              backgroundColor: '#e6f4f4',
              color: '#008689',
              fontWeight: 700,
              fontSize: '13.5px',
            }}>
              Đã đạt: 105 / 120 tín chỉ
            </div>
          </div>
        </div>

        {/* Card 3: Lớp học phần */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          border: '1px solid #e2e8f0',
          padding: '20px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingBottom: '12px',
            borderBottom: '1px solid #f1f5f9',
            marginBottom: '16px',
          }}>
            <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#008689', margin: 0 }}>
              Lớp học phần
            </h3>
            <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>
              HK1 (2026-2027)
            </span>
          </div>

          {/* Table */}
          <div style={{ overflowX: 'auto' }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: '13px',
            }}>
              <thead>
                <tr style={{ borderBottom: '1.5px solid #e2e8f0', color: '#475569' }}>
                  <th style={{ textAlign: 'left', padding: '8px 4px', fontWeight: 600 }}>
                    Môn học
                  </th>
                  <th style={{ textAlign: 'right', padding: '8px 4px', fontWeight: 600 }}>
                    Tín chỉ
                  </th>
                </tr>
              </thead>
              <tbody>
                {enrolledCourses.map((c, i) => (
                  <tr
                    key={i}
                    style={{
                      borderBottom: '1px solid #f1f5f9',
                      transition: 'background-color 0.15s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f8fafc')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    <td style={{ padding: '10px 4px', color: '#1e293b', fontWeight: 500 }}>
                      <div>{c.name}</div>
                      <span style={{ fontSize: '11px', color: '#94a3b8' }}>Mã: {c.code}</span>
                    </td>
                    <td style={{
                      textAlign: 'right',
                      padding: '10px 4px',
                      fontWeight: 700,
                      color: '#008689',
                    }}>
                      {c.credits}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ================= MODAL THẺ SINH VIÊN ================= */}
      <StudentIDCardModal
        isOpen={showIdCard}
        onClose={() => setShowIdCard(false)}
        student={student}
      />
    </div>
  );
}
