import { useState } from 'react';
import { Award, BookOpen, CheckCircle, ChevronDown, Download, TrendingUp } from 'lucide-react';

interface GradeRecord {
  id: string;
  code: string;
  name: string;
  credits: number;
  progressScore: number; // 10%
  midtermScore: number;  // 40%
  finalScore: number;    // 50%
  totalScore10: number;
  letterGrade: string;
  gpaScore: number;
  status: 'Đạt' | 'Chưa đạt';
}

const GRADES_DATA: Record<string, GradeRecord[]> = {
  'hk1_2025': [
    {
      id: '1',
      code: 'MATH101',
      name: 'Toán cao cấp 1',
      credits: 3,
      progressScore: 9.0,
      midtermScore: 8.5,
      finalScore: 8.0,
      totalScore10: 8.3,
      letterGrade: 'A',
      gpaScore: 3.8,
      status: 'Đạt',
    },
    {
      id: '2',
      code: 'CS101',
      name: 'Nhập môn lập trình (C++)',
      credits: 4,
      progressScore: 9.5,
      midtermScore: 9.0,
      finalScore: 8.5,
      totalScore10: 8.8,
      letterGrade: 'A+',
      gpaScore: 4.0,
      status: 'Đạt',
    },
    {
      id: '3',
      code: 'ENG101',
      name: 'Tiếng Anh chuyên ngành 1',
      credits: 3,
      progressScore: 8.0,
      midtermScore: 7.5,
      finalScore: 7.5,
      totalScore10: 7.6,
      letterGrade: 'B',
      gpaScore: 3.0,
      status: 'Đạt',
    },
  ],
  'hk2_2025': [
    {
      id: '4',
      code: 'CS201',
      name: 'Cấu trúc dữ liệu và giải thuật',
      credits: 4,
      progressScore: 9.0,
      midtermScore: 8.0,
      finalScore: 8.5,
      totalScore10: 8.4,
      letterGrade: 'A',
      gpaScore: 3.8,
      status: 'Đạt',
    },
    {
      id: '5',
      code: 'DB101',
      name: 'Hệ cơ sở dữ liệu',
      credits: 3,
      progressScore: 8.5,
      midtermScore: 8.5,
      finalScore: 8.0,
      totalScore10: 8.3,
      letterGrade: 'A',
      gpaScore: 3.8,
      status: 'Đạt',
    },
    {
      id: '6',
      code: 'WEB201',
      name: 'Lập trình ứng dụng Web',
      credits: 3,
      progressScore: 10.0,
      midtermScore: 9.5,
      finalScore: 9.0,
      totalScore10: 9.3,
      letterGrade: 'A+',
      gpaScore: 4.0,
      status: 'Đạt',
    },
  ],
  'hk1_2026': [
    {
      id: '7',
      code: 'IT401',
      name: 'Trí tuệ nhân tạo và ứng dụng',
      credits: 3,
      progressScore: 9.0,
      midtermScore: 8.5,
      finalScore: 0,
      totalScore10: 0,
      letterGrade: 'Đang học',
      gpaScore: 0,
      status: 'Đạt',
    },
    {
      id: '8',
      code: 'IT490',
      name: 'Sinh hoạt Học kỳ doanh nghiệp',
      credits: 0,
      progressScore: 10.0,
      midtermScore: 10.0,
      finalScore: 0,
      totalScore10: 0,
      letterGrade: 'Đang học',
      gpaScore: 0,
      status: 'Đạt',
    },
    {
      id: '9',
      code: 'IT499',
      name: 'Học kỳ doanh nghiệp',
      credits: 12,
      progressScore: 9.0,
      midtermScore: 0,
      finalScore: 0,
      totalScore10: 0,
      letterGrade: 'Đang học',
      gpaScore: 0,
      status: 'Đạt',
    },
  ],
};

export default function GradesPage() {
  const [selectedSemester, setSelectedSemester] = useState('hk2_2025');
  const grades = GRADES_DATA[selectedSemester] || [];

  return (
    <div style={{
      maxWidth: '1360px',
      margin: '0 auto',
      padding: '24px 20px 48px',
      fontFamily: 'var(--font-sans)',
    }}>
      {/* Title */}
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
            KẾT QUẢ HỌC TẬP &amp; BẢNG ĐIỂM
          </h1>
          <p style={{ margin: 0, fontSize: '13.5px', color: '#64748b' }}>
            Tra cứu điểm thi, quá trình học tập và xếp loại học lực toàn khóa
          </p>
        </div>

        <button
          type="button"
          onClick={() => alert('Đang tạo và tải xuống bảng điểm PDF chính thức...')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: '#008689',
            color: '#ffffff',
            border: 'none',
            borderRadius: '10px',
            padding: '10px 16px',
            fontSize: '13.5px',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          <Download size={16} />
          <span>Xuất bảng điểm (PDF)</span>
        </button>
      </div>

      {/* GPA & Summary Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '16px',
        marginBottom: '24px',
      }}>
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          border: '1px solid #e2e8f0',
          padding: '20px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b', fontSize: '13px' }}>
            <Award size={18} color="#008689" />
            <span>Điểm TB tích lũy (Hệ 4)</span>
          </div>
          <div style={{ fontSize: '32px', fontWeight: 800, color: '#008689', margin: '8px 0 4px' }}>
            3.52 <span style={{ fontSize: '16px', color: '#64748b', fontWeight: 500 }}>/ 4.0</span>
          </div>
          <div style={{ fontSize: '12px', color: '#15803d', fontWeight: 600 }}>
            Xếp loại: Giỏi
          </div>
        </div>

        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          border: '1px solid #e2e8f0',
          padding: '20px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b', fontSize: '13px' }}>
            <TrendingUp size={18} color="#ff6600" />
            <span>Điểm TB tích lũy (Hệ 10)</span>
          </div>
          <div style={{ fontSize: '32px', fontWeight: 800, color: '#ff6600', margin: '8px 0 4px' }}>
            8.45 <span style={{ fontSize: '16px', color: '#64748b', fontWeight: 500 }}>/ 10</span>
          </div>
          <div style={{ fontSize: '12px', color: '#64748b' }}>
            Tương đương 84.5%
          </div>
        </div>

        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          border: '1px solid #e2e8f0',
          padding: '20px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b', fontSize: '13px' }}>
            <BookOpen size={18} color="#2563eb" />
            <span>Số tín chỉ tích lũy</span>
          </div>
          <div style={{ fontSize: '32px', fontWeight: 800, color: '#2563eb', margin: '8px 0 4px' }}>
            105 <span style={{ fontSize: '16px', color: '#64748b', fontWeight: 500 }}>/ 120 TC</span>
          </div>
          <div style={{ fontSize: '12px', color: '#059669', fontWeight: 600 }}>
            Tiến độ: 87.5% hoàn thành
          </div>
        </div>
      </div>

      {/* Main Grade Table Card */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        border: '1px solid #e2e8f0',
        padding: '24px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
      }}>
        {/* Semester Filter */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          marginBottom: '20px',
          paddingBottom: '16px',
          borderBottom: '1px solid #f1f5f9',
        }}>
          <div style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>
            Chi tiết bảng điểm học kỳ
          </div>

          <div style={{ position: 'relative' }}>
            <select
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
              style={{
                padding: '8px 32px 8px 12px',
                borderRadius: '8px',
                border: '1.5px solid #cbd5e1',
                backgroundColor: '#ffffff',
                fontSize: '13.5px',
                fontWeight: 600,
                color: '#1e293b',
                cursor: 'pointer',
                appearance: 'none',
              }}
            >
              <option value="hk1_2026">Học kỳ 1 năm học 2026-2027 (Hiện tại)</option>
              <option value="hk2_2025">Học kỳ 2 năm học 2025-2026</option>
              <option value="hk1_2025">Học kỳ 1 năm học 2025-2026</option>
            </select>
            <ChevronDown size={16} color="#64748b" style={{ position: 'absolute', right: '10px', top: '12px', pointerEvents: 'none' }} />
          </div>
        </div>

        {/* Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: '13.5px',
          }}>
            <thead>
              <tr style={{
                backgroundColor: '#f8fafc',
                borderBottom: '2px solid #e2e8f0',
                color: '#475569',
              }}>
                <th style={{ padding: '12px 10px', textAlign: 'center', width: '50px' }}>STT</th>
                <th style={{ padding: '12px 10px', textAlign: 'left', width: '100px' }}>Mã môn</th>
                <th style={{ padding: '12px 10px', textAlign: 'left' }}>Tên môn học</th>
                <th style={{ padding: '12px 10px', textAlign: 'center', width: '70px' }}>Số TC</th>
                <th style={{ padding: '12px 10px', textAlign: 'center', width: '90px' }}>Quá trình</th>
                <th style={{ padding: '12px 10px', textAlign: 'center', width: '90px' }}>Giữa kỳ</th>
                <th style={{ padding: '12px 10px', textAlign: 'center', width: '90px' }}>Cuối kỳ</th>
                <th style={{ padding: '12px 10px', textAlign: 'center', width: '90px' }}>Tổng kết (10)</th>
                <th style={{ padding: '12px 10px', textAlign: 'center', width: '90px' }}>Điểm chữ</th>
                <th style={{ padding: '12px 10px', textAlign: 'center', width: '90px' }}>Kết quả</th>
              </tr>
            </thead>
            <tbody>
              {grades.map((row, index) => (
                <tr
                  key={row.id}
                  style={{
                    borderBottom: '1px solid #f1f5f9',
                    transition: 'background-color 0.15s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f8fafc')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <td style={{ padding: '14px 10px', textAlign: 'center', color: '#64748b' }}>
                    {index + 1}
                  </td>
                  <td style={{ padding: '14px 10px', fontWeight: 600, color: '#008689' }}>
                    {row.code}
                  </td>
                  <td style={{ padding: '14px 10px', fontWeight: 600, color: '#1e293b' }}>
                    {row.name}
                  </td>
                  <td style={{ padding: '14px 10px', textAlign: 'center', fontWeight: 700 }}>
                    {row.credits}
                  </td>
                  <td style={{ padding: '14px 10px', textAlign: 'center' }}>
                    {row.progressScore > 0 ? row.progressScore : '-'}
                  </td>
                  <td style={{ padding: '14px 10px', textAlign: 'center' }}>
                    {row.midtermScore > 0 ? row.midtermScore : '-'}
                  </td>
                  <td style={{ padding: '14px 10px', textAlign: 'center' }}>
                    {row.finalScore > 0 ? row.finalScore : '-'}
                  </td>
                  <td style={{ padding: '14px 10px', textAlign: 'center', fontWeight: 700, color: '#0f172a' }}>
                    {row.totalScore10 > 0 ? row.totalScore10 : '-'}
                  </td>
                  <td style={{ padding: '14px 10px', textAlign: 'center', fontWeight: 700, color: '#008689' }}>
                    {row.letterGrade}
                  </td>
                  <td style={{ padding: '14px 10px', textAlign: 'center' }}>
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '2px 8px',
                      borderRadius: '6px',
                      fontSize: '11.5px',
                      fontWeight: 700,
                      backgroundColor: row.status === 'Đạt' ? '#dcfce7' : '#fee2e2',
                      color: row.status === 'Đạt' ? '#15803d' : '#b91c1c',
                    }}>
                      <CheckCircle size={12} />
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
