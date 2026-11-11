import { useState } from 'react';
import { Clock, MapPin, User, ChevronLeft, ChevronRight } from 'lucide-react';

interface ClassSchedule {
  id: string;
  dayOfWeek: number; // 2 to 7 (T2 to T7), 1 is CN
  courseName: string;
  courseCode: string;
  timeSlot: string; // e.g. "Tiết 1 - 3 (07:30 - 09:50)"
  room: string;
  teacher: string;
  type: 'Lý thuyết' | 'Thực hành' | 'Đồ án';
}

const SCHEDULE_DATA: ClassSchedule[] = [
  {
    id: '1',
    dayOfWeek: 2, // Thứ 2
    courseName: 'Trí tuệ nhân tạo và ứng dụng',
    courseCode: 'IT401',
    timeSlot: 'Tiết 1 - 4 (07:30 - 10:45)',
    room: 'Phòng A104 - Cơ sở 1',
    teacher: 'TS. Nguyễn Văn Hùng',
    type: 'Lý thuyết',
  },
  {
    id: '2',
    dayOfWeek: 4, // Thứ 4
    courseName: 'Thực hành Trí tuệ nhân tạo',
    courseCode: 'IT401L',
    timeSlot: 'Tiết 7 - 10 (13:00 - 16:15)',
    room: 'Phòng Lab 302 - Tòa C',
    teacher: 'ThS. Lê Hoàng Long',
    type: 'Thực hành',
  },
  {
    id: '3',
    dayOfWeek: 6, // Thứ 6
    courseName: 'Sinh hoạt Học kỳ doanh nghiệp',
    courseCode: 'IT490',
    timeSlot: 'Tiết 5 - 6 (10:50 - 12:15)',
    room: 'Hội trường B',
    teacher: 'PGS. TS. Trần Đức',
    type: 'Lý thuyết',
  },
  {
    id: '4',
    dayOfWeek: 7, // Thứ 7
    courseName: 'Báo cáo tiến độ Học kỳ doanh nghiệp',
    courseCode: 'IT499',
    timeSlot: 'Tiết 2 - 4 (08:15 - 10:45)',
    room: 'Phòng họp 201 - Doanh nghiệp đối tác',
    teacher: 'Mentor Doanh nghiệp & GVHD',
    type: 'Đồ án',
  },
];

export default function SchedulePage() {
  const [selectedWeek, setSelectedWeek] = useState('Tuần 11 (09/11/2026 - 15/11/2026)');

  const days = [
    { num: 2, label: 'Thứ Hai', date: '09/11' },
    { num: 3, label: 'Thứ Ba', date: '10/11' },
    { num: 4, label: 'Thứ Tư', date: '11/11', isToday: true },
    { num: 5, label: 'Thứ Năm', date: '12/11' },
    { num: 6, label: 'Thứ Sáu', date: '13/11' },
    { num: 7, label: 'Thứ Bảy', date: '14/11' },
    { num: 1, label: 'Chủ Nhật', date: '15/11' },
  ];

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
            LỊCH HỌC &amp; THỜI KHÓA BIỂU
          </h1>
          <p style={{ margin: 0, fontSize: '13.5px', color: '#64748b' }}>
            Học kỳ 1 năm học 2026-2027 — Chương trình đào tạo CNTT
          </p>
        </div>

        {/* Week Selector */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          backgroundColor: '#ffffff',
          padding: '6px 12px',
          borderRadius: '10px',
          border: '1px solid #cbd5e1',
          boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
        }}>
          <button
            type="button"
            onClick={() => setSelectedWeek('Tuần 10 (02/11/2026 - 08/11/2026)')}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#64748b',
              padding: '4px',
            }}
          >
            <ChevronLeft size={18} />
          </button>
          <span style={{ fontSize: '13.5px', fontWeight: 600, color: '#1e293b' }}>
            {selectedWeek}
          </span>
          <button
            type="button"
            onClick={() => setSelectedWeek('Tuần 12 (16/11/2026 - 22/11/2026)')}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#64748b',
              padding: '4px',
            }}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Week Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '14px',
      }}>
        {days.map((day) => {
          const classes = SCHEDULE_DATA.filter((c) => c.dayOfWeek === day.num);

          return (
            <div
              key={day.num}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '14px',
                border: day.isToday ? '2px solid #008689' : '1px solid #e2e8f0',
                boxShadow: day.isToday ? '0 4px 14px rgba(0, 134, 137, 0.12)' : '0 2px 6px rgba(0,0,0,0.03)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                minHeight: '360px',
              }}
            >
              {/* Day Header */}
              <div style={{
                padding: '12px',
                backgroundColor: day.isToday ? '#008689' : '#f8fafc',
                color: day.isToday ? '#ffffff' : '#334155',
                textAlign: 'center',
                borderBottom: '1px solid #e2e8f0',
              }}>
                <div style={{ fontSize: '14px', fontWeight: 700 }}>
                  {day.label}
                </div>
                <div style={{
                  fontSize: '12px',
                  opacity: day.isToday ? 0.9 : 0.7,
                  marginTop: '2px',
                }}>
                  {day.date} {day.isToday && '• Hôm nay'}
                </div>
              </div>

              {/* Class Cards for this Day */}
              <div style={{
                padding: '10px',
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}>
                {classes.length === 0 ? (
                  <div style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#94a3b8',
                    fontSize: '12.5px',
                    fontStyle: 'italic',
                  }}>
                    Không có lịch học
                  </div>
                ) : (
                  classes.map((cls) => (
                    <div
                      key={cls.id}
                      style={{
                        padding: '12px',
                        borderRadius: '10px',
                        backgroundColor: cls.type === 'Thực hành' ? '#f0fdf4' : cls.type === 'Đồ án' ? '#fef3c7' : '#f0fdfa',
                        border: `1px solid ${cls.type === 'Thực hành' ? '#bbf7d0' : cls.type === 'Đồ án' ? '#fde68a' : '#99f6e4'}`,
                      }}
                    >
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '6px',
                      }}>
                        <span style={{
                          fontSize: '11px',
                          fontWeight: 700,
                          padding: '2px 6px',
                          borderRadius: '4px',
                          backgroundColor: cls.type === 'Thực hành' ? '#15803d' : cls.type === 'Đồ án' ? '#b45309' : '#008689',
                          color: '#ffffff',
                        }}>
                          {cls.type}
                        </span>
                        <span style={{ fontSize: '11px', fontWeight: 600, color: '#64748b' }}>
                          {cls.courseCode}
                        </span>
                      </div>

                      <div style={{
                        fontSize: '13px',
                        fontWeight: 700,
                        color: '#0f172a',
                        marginBottom: '8px',
                        lineHeight: 1.3,
                      }}>
                        {cls.courseName}
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '11.5px', color: '#475569' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                          <Clock size={12} color="#008689" />
                          <span>{cls.timeSlot}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                          <MapPin size={12} color="#dc2626" />
                          <span>{cls.room}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                          <User size={12} color="#4f46e5" />
                          <span>{cls.teacher}</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
