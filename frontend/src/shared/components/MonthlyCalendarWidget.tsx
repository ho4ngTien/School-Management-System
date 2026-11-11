import { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock } from 'lucide-react';

interface MonthlyCalendarWidgetProps {
  onDateSelect?: (dateStr: string) => void;
}

export default function MonthlyCalendarWidget({ onDateSelect }: MonthlyCalendarWidgetProps) {
  // Fixed to November 2026 to match template or dynamic
  const [currentYear, setCurrentYear] = useState(2026);
  const [currentMonth, setCurrentMonth] = useState(10); // 10 is November (0-indexed)
  const [selectedDay, setSelectedDay] = useState<number | null>(11);
  const [hoveredDay, setHoveredDay] = useState<number | null>(null);

  const monthNames = [
    'tháng 01', 'tháng 02', 'tháng 03', 'tháng 04', 'tháng 05', 'tháng 06',
    'tháng 07', 'tháng 08', 'tháng 09', 'tháng 10', 'tháng 11', 'tháng 12'
  ];

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // Schedule dates in November 2026: 6, 7, 13, 14, 20, 21, 27
  const studyDays = [6, 7, 13, 14, 20, 21, 27];

  // Days in month calculation
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay(); // 0 is Sunday (CN)

  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanksArray = Array.from({ length: firstDayIndex }, (_, i) => i);

  return (
    <div style={{
      padding: '16px',
      backgroundColor: '#f8fafc',
      borderRadius: '16px',
      border: '1px solid #e2e8f0',
      width: '100%',
      boxSizing: 'border-box',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '14px',
      }}>
        <h3 style={{
          fontSize: '15px',
          fontWeight: 700,
          color: '#008689',
          margin: 0,
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }}>
          <CalendarIcon size={18} />
          Lịch theo tháng
        </h3>

        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <button
            type="button"
            onClick={handlePrevMonth}
            aria-label="Tháng trước"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '28px',
              height: '28px',
              border: '1px solid #cbd5e1',
              borderRadius: '6px',
              backgroundColor: '#ffffff',
              color: '#334155',
              cursor: 'pointer',
              fontSize: '12px',
            }}
          >
            <ChevronLeft size={16} />
          </button>

          <div style={{
            fontSize: '13px',
            fontWeight: 600,
            color: '#1e293b',
            border: '1px solid #cbd5e1',
            borderRadius: '6px',
            backgroundColor: '#ffffff',
            padding: '4px 10px',
            textAlign: 'center',
            minWidth: '120px',
          }}>
            {monthNames[currentMonth]} {currentYear}
          </div>

          <button
            type="button"
            onClick={handleNextMonth}
            aria-label="Tháng sau"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '28px',
              height: '28px',
              border: '1px solid #cbd5e1',
              borderRadius: '6px',
              backgroundColor: '#ffffff',
              color: '#334155',
              cursor: 'pointer',
              fontSize: '12px',
            }}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Weekday Labels: CN, T2, T3, T4, T5, T6, T7 */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        borderBottom: '1px solid #e2e8f0',
        paddingBottom: '8px',
        marginBottom: '8px',
      }}>
        {['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'].map((day, idx) => (
          <div
            key={day}
            style={{
              fontSize: '13px',
              fontWeight: 700,
              color: idx === 0 ? '#ff6600' : '#64748b',
              textAlign: 'center',
              textTransform: 'uppercase',
            }}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Days Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        gap: '4px',
      }}>
        {/* Leading empty cells */}
        {blanksArray.map((_, i) => (
          <div key={`blank-${i}`} style={{ minHeight: '44px' }} />
        ))}

        {/* Days of month */}
        {daysArray.map((day) => {
          const isSunday = (firstDayIndex + day - 1) % 7 === 0;
          const isToday = day === 11 && currentMonth === 10 && currentYear === 2026;
          const isStudyDay = studyDays.includes(day) && currentMonth === 10;
          const isSelected = selectedDay === day;

          return (
            <div
              key={day}
              onMouseEnter={() => setHoveredDay(day)}
              onMouseLeave={() => setHoveredDay(null)}
              onClick={() => {
                setSelectedDay(day);
                if (onDateSelect) {
                  onDateSelect(`${day.toString().padStart(2, '0')}/${(currentMonth + 1).toString().padStart(2, '0')}/${currentYear}`);
                }
              }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '6px 0',
                position: 'relative',
                minHeight: '46px',
                borderRadius: '8px',
                backgroundColor: isStudyDay ? '#ccfbf1' : isSelected ? '#e6f4f4' : '#ffffff',
                border: isToday ? '2px solid #008689' : '1px solid #f1f5f9',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              <span style={{
                fontSize: '13.5px',
                fontWeight: isToday || isSelected ? 700 : 500,
                color: isSunday ? '#ff6600' : isToday ? '#008689' : '#1e293b',
              }}>
                {day}
              </span>

              {/* Study day dot indicator */}
              {isStudyDay && (
                <div style={{
                  display: 'flex',
                  gap: '2px',
                  marginTop: '3px',
                }}>
                  <div style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: '#008689',
                  }} />
                </div>
              )}

              {/* Tooltip on hover */}
              {hoveredDay === day && isStudyDay && (
                <div style={{
                  position: 'absolute',
                  bottom: '100%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  backgroundColor: '#0f172a',
                  color: '#ffffff',
                  padding: '4px 8px',
                  borderRadius: '6px',
                  fontSize: '11px',
                  whiteSpace: 'nowrap',
                  zIndex: 20,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  pointerEvents: 'none',
                }}>
                  Lịch học ngày {day}/11/2026
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Selected day notice */}
      {selectedDay && studyDays.includes(selectedDay) && currentMonth === 10 && (
        <div style={{
          marginTop: '12px',
          padding: '8px 12px',
          borderRadius: '8px',
          backgroundColor: '#f0fdfa',
          border: '1px solid #99f6e4',
          fontSize: '12.5px',
          color: '#008689',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }}>
          <Clock size={14} />
          <span>Ngày {selectedDay}/11/2026 có 2 tiết học: Trí tuệ nhân tạo (07:30 - 11:30)</span>
        </div>
      )}
    </div>
  );
}
