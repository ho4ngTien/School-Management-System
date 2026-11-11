import { useState } from 'react';
import { CheckCircle, PlusCircle, Search } from 'lucide-react';

interface AvailableCourse {
  id: string;
  code: string;
  name: string;
  credits: number;
  capacity: number;
  enrolled: number;
  schedule: string;
  room: string;
  lecturer: string;
  isRegistered?: boolean;
}

const COURSES_DATA: AvailableCourse[] = [
  {
    id: '1',
    code: 'IT401',
    name: 'Trí tuệ nhân tạo và ứng dụng',
    credits: 3,
    capacity: 45,
    enrolled: 42,
    schedule: 'Thứ 2 (Tiết 1-4)',
    room: 'A104',
    lecturer: 'TS. Nguyễn Văn Hùng',
    isRegistered: true,
  },
  {
    id: '2',
    code: 'IT490',
    name: 'Sinh hoạt Học kỳ doanh nghiệp',
    credits: 0,
    capacity: 100,
    enrolled: 95,
    schedule: 'Thứ 6 (Tiết 5-6)',
    room: 'Hội trường B',
    lecturer: 'PGS. TS. Trần Đức',
    isRegistered: true,
  },
  {
    id: '3',
    code: 'IT499',
    name: 'Học kỳ doanh nghiệp (Thực tập tốt nghiệp)',
    credits: 12,
    capacity: 60,
    enrolled: 58,
    schedule: 'Cả tuần',
    room: 'Doanh nghiệp',
    lecturer: 'Mentor Doanh nghiệp',
    isRegistered: true,
  },
  {
    id: '4',
    code: 'IT415',
    name: 'Xử lý ngôn ngữ tự nhiên (NLP)',
    credits: 3,
    capacity: 40,
    enrolled: 25,
    schedule: 'Thứ 3 (Tiết 7-10)',
    room: 'B203',
    lecturer: 'TS. Lê Thị Mai',
    isRegistered: false,
  },
  {
    id: '5',
    code: 'IT422',
    name: 'Thị giác máy tính (Computer Vision)',
    credits: 3,
    capacity: 40,
    enrolled: 38,
    schedule: 'Thứ 5 (Tiết 1-4)',
    room: 'A201',
    lecturer: 'TS. Phan Văn Bảo',
    isRegistered: false,
  },
  {
    id: '6',
    code: 'IT430',
    name: 'Điện toán đám mây & DevOps',
    credits: 3,
    capacity: 45,
    enrolled: 45, // Full
    schedule: 'Thứ 7 (Tiết 7-10)',
    room: 'Lab 401',
    lecturer: 'ThS. Hoàng Quang Minh',
    isRegistered: false,
  },
];

export default function AssignmentsPage() {
  const [courses, setCourses] = useState<AvailableCourse[]>(COURSES_DATA);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'registered'>('all');

  const filteredCourses = courses.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          c.code.toLowerCase().includes(searchTerm.toLowerCase());
    if (activeTab === 'registered') {
      return matchesSearch && c.isRegistered;
    }
    return matchesSearch;
  });

  const handleRegister = (id: string) => {
    setCourses((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          if (c.enrolled >= c.capacity) {
            alert('Lớp học phần đã đầy sĩ số!');
            return c;
          }
          alert(`Đăng ký thành công môn học: ${c.name}`);
          return { ...c, isRegistered: true, enrolled: c.enrolled + 1 };
        }
        return c;
      })
    );
  };

  const handleCancelRegister = (id: string) => {
    if (window.confirm('Bạn có chắc chắn muốn hủy đăng ký học phần này?')) {
      setCourses((prev) =>
        prev.map((c) => {
          if (c.id === id) {
            return { ...c, isRegistered: false, enrolled: Math.max(0, c.enrolled - 1) };
          }
          return c;
        })
      );
    }
  };

  return (
    <div style={{
      maxWidth: '1360px',
      margin: '0 auto',
      padding: '24px 20px 48px',
      fontFamily: 'var(--font-sans)',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
        marginBottom: '24px',
      }}>
        <div>
          <h1 style={{
            fontSize: '22px',
            fontWeight: 800,
            color: '#008689',
            margin: '0 0 4px 0',
          }}>
            ĐĂNG KÝ HỌC PHẦN &amp; CHƯƠNG TRÌNH KHUNG
          </h1>
          <p style={{ margin: 0, fontSize: '13.5px', color: '#64748b' }}>
            Học kỳ 1 năm học 2026-2027 — Đợt đăng ký chính thức
          </p>
        </div>

        {/* Tab switch */}
        <div style={{
          display: 'flex',
          backgroundColor: '#ffffff',
          borderRadius: '10px',
          border: '1px solid #cbd5e1',
          padding: '4px',
          gap: '4px',
        }}>
          <button
            type="button"
            onClick={() => setActiveTab('all')}
            style={{
              padding: '6px 14px',
              borderRadius: '6px',
              border: 'none',
              fontSize: '13px',
              fontWeight: activeTab === 'all' ? 700 : 500,
              backgroundColor: activeTab === 'all' ? '#008689' : 'transparent',
              color: activeTab === 'all' ? '#ffffff' : '#475569',
              cursor: 'pointer',
            }}
          >
            Tất cả học phần mở
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('registered')}
            style={{
              padding: '6px 14px',
              borderRadius: '6px',
              border: 'none',
              fontSize: '13px',
              fontWeight: activeTab === 'registered' ? 700 : 500,
              backgroundColor: activeTab === 'registered' ? '#008689' : 'transparent',
              color: activeTab === 'registered' ? '#ffffff' : '#475569',
              cursor: 'pointer',
            }}
          >
            Đã đăng ký ({courses.filter(c => c.isRegistered).length})
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        padding: '12px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '20px',
        boxShadow: '0 2px 6px rgba(0,0,0,0.02)',
      }}>
        <Search size={18} color="#94a3b8" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Tìm kiếm môn học theo tên hoặc mã học phần (ví dụ: IT401, Trí tuệ nhân tạo)..."
          style={{
            border: 'none',
            outline: 'none',
            width: '100%',
            fontSize: '14px',
            color: '#1e293b',
          }}
        />
      </div>

      {/* Course Cards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
        gap: '18px',
      }}>
        {filteredCourses.map((c) => {
          const isFull = c.enrolled >= c.capacity && !c.isRegistered;

          return (
            <div
              key={c.id}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '14px',
                border: c.isRegistered ? '1.5px solid #008689' : '1px solid #e2e8f0',
                padding: '20px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '10px',
                }}>
                  <span style={{
                    fontSize: '12px',
                    fontWeight: 700,
                    padding: '2px 8px',
                    borderRadius: '6px',
                    backgroundColor: '#e6f4f4',
                    color: '#008689',
                  }}>
                    {c.code}
                  </span>
                  <span style={{
                    fontSize: '12px',
                    fontWeight: 600,
                    color: isFull ? '#dc2626' : '#15803d',
                  }}>
                    Sĩ số: {c.enrolled} / {c.capacity} {isFull && '(ĐÃ ĐẦY)'}
                  </span>
                </div>

                <h3 style={{
                  fontSize: '16px',
                  fontWeight: 700,
                  color: '#0f172a',
                  margin: '0 0 10px 0',
                  lineHeight: 1.3,
                }}>
                  {c.name}
                </h3>

                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                  fontSize: '13px',
                  color: '#475569',
                  marginBottom: '16px',
                }}>
                  <div><strong>Số tín chỉ:</strong> {c.credits} TC</div>
                  <div><strong>Lịch học:</strong> {c.schedule} • {c.room}</div>
                  <div><strong>Giảng viên:</strong> {c.lecturer}</div>
                </div>
              </div>

              {/* Action Button */}
              <div>
                {c.isRegistered ? (
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <div style={{
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      backgroundColor: '#dcfce7',
                      color: '#15803d',
                      fontSize: '13px',
                      fontWeight: 700,
                    }}>
                      <CheckCircle size={15} />
                      Đã đăng ký
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCancelRegister(c.id)}
                      style={{
                        padding: '8px 14px',
                        borderRadius: '8px',
                        border: '1px solid #fecaca',
                        backgroundColor: '#fef2f2',
                        color: '#dc2626',
                        fontSize: '12.5px',
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      Hủy môn
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    disabled={isFull}
                    onClick={() => handleRegister(c.id)}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      padding: '10px 16px',
                      borderRadius: '8px',
                      border: 'none',
                      backgroundColor: isFull ? '#cbd5e1' : '#008689',
                      color: '#ffffff',
                      fontSize: '13.5px',
                      fontWeight: 700,
                      cursor: isFull ? 'not-allowed' : 'pointer',
                    }}
                  >
                    <PlusCircle size={16} />
                    {isFull ? 'Lớp đã đầy' : 'Đăng ký học phần'}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
