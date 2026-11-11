import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  User,
  GraduationCap,
  Mail,
  ShieldCheck,
  Building
} from 'lucide-react';

export default function ProfilePage() {
  const navigate = useNavigate();

  const student = {
    studentCode: '064205013544',
    fullName: 'Hoàng Tiến',
    gender: 'Nam',
    dateOfBirth: '14/07/2005',
    placeOfBirth: 'Gia Lai',
    ethnicity: 'Kinh',
    religion: 'Không',
    idCardNumber: '064205013544',
    idCardDate: '20/07/2021',
    idCardPlace: 'Cục Cảnh sát QLHC về TTXH',
    
    // Academic Info
    status: 'Đang học',
    degreeLevel: 'Đại học - chính quy',
    programType: 'Chất lượng cao',
    cohort: '2023',
    faculty: 'Công nghệ thông tin',
    major: 'Công nghệ thông tin',
    specialization: 'Kỹ thuật phần mềm & AI',
    homeroomClass: 'CNTT-K23CLC',
    advisor: 'TS. Nguyễn Văn Hùng',

    // Contact Info
    schoolEmail: 'tienh3544@ut.edu.vn',
    personalEmail: 'hoangtien.dev@gmail.com',
    phoneNumber: '0375705551',
    permanentAddress: 'Phường Hoa Lư, TP. Pleiku, Tỉnh Gia Lai',
    contactAddress: 'Ký túc xá Khu B, ĐHQG-HCM, TP. Thủ Đức, TP. Hồ Chí Minh',
  };

  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '32px 20px 60px',
      fontFamily: 'var(--font-sans)',
    }}>
      {/* Back button */}
      <button
        type="button"
        onClick={() => navigate('/student')}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          background: 'none',
          border: 'none',
          color: '#008689',
          fontSize: '14px',
          fontWeight: 600,
          cursor: 'pointer',
          padding: '6px 0',
          marginBottom: '20px',
        }}
      >
        <ArrowLeft size={18} />
        <span>Quay lại trang chủ sinh viên</span>
      </button>

      {/* Main Profile Header Banner */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '20px',
        border: '1px solid #e2e8f0',
        padding: '28px',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)',
        display: 'flex',
        alignItems: 'center',
        gap: '24px',
        flexWrap: 'wrap',
        marginBottom: '24px',
      }}>
        {/* Avatar */}
        <div style={{
          width: '96px',
          height: '96px',
          borderRadius: '50%',
          backgroundColor: '#008689',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '36px',
          fontWeight: 800,
          boxShadow: '0 4px 14px rgba(0, 134, 137, 0.3)',
        }}>
          {student.fullName.charAt(0)}
        </div>

        {/* Name & Quick Badges */}
        <div style={{ flex: 1, minWidth: '240px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
            <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 800, color: '#0f172a' }}>
              {student.fullName}
            </h1>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              padding: '3px 10px',
              borderRadius: '20px',
              backgroundColor: '#dcfce7',
              color: '#15803d',
              fontSize: '12px',
              fontWeight: 700,
            }}>
              <ShieldCheck size={14} /> {student.status}
            </span>
          </div>

          <p style={{ margin: '0 0 8px 0', fontSize: '14.5px', color: '#475569' }}>
            MSSV: <strong style={{ color: '#008689' }}>{student.studentCode}</strong> • Lớp: <strong>{student.homeroomClass}</strong>
          </p>

          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', fontSize: '13px', color: '#64748b' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <GraduationCap size={15} color="#008689" /> {student.major}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Building size={15} color="#008689" /> {student.faculty}
            </span>
          </div>
        </div>
      </div>

      {/* Grid of 2 Cards: Academic Info + Personal Info */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
        gap: '24px',
        marginBottom: '24px',
      }}>
        {/* Card 1: Thông tin học vụ */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          border: '1px solid #e2e8f0',
          padding: '24px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
        }}>
          <h2 style={{
            fontSize: '17px',
            fontWeight: 700,
            color: '#008689',
            marginTop: 0,
            marginBottom: '16px',
            paddingBottom: '12px',
            borderBottom: '1.5px solid #f1f5f9',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}>
            <GraduationCap size={20} />
            Thông tin học vụ
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13.5px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#64748b' }}>Mã số sinh viên:</span>
              <strong style={{ color: '#008689' }}>{student.studentCode}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#64748b' }}>Bậc đào tạo:</span>
              <strong>{student.degreeLevel}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#64748b' }}>Loại hình đào tạo:</span>
              <strong>{student.programType}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#64748b' }}>Khóa tuyển sinh:</span>
              <strong>{student.cohort}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#64748b' }}>Khoa phụ trách:</span>
              <strong>{student.faculty}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#64748b' }}>Ngành đào tạo:</span>
              <strong>{student.major}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#64748b' }}>Chuyên ngành:</span>
              <strong>{student.specialization}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#64748b' }}>Lớp sinh hoạt:</span>
              <strong>{student.homeroomClass}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#64748b' }}>Cố vấn học tập:</span>
              <strong>{student.advisor}</strong>
            </div>
          </div>
        </div>

        {/* Card 2: Thông tin cá nhân */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          border: '1px solid #e2e8f0',
          padding: '24px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
        }}>
          <h2 style={{
            fontSize: '17px',
            fontWeight: 700,
            color: '#008689',
            marginTop: 0,
            marginBottom: '16px',
            paddingBottom: '12px',
            borderBottom: '1.5px solid #f1f5f9',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}>
            <User size={20} />
            Thông tin nhân thân
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13.5px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#64748b' }}>Họ và tên:</span>
              <strong>{student.fullName}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#64748b' }}>Giới tính:</span>
              <strong>{student.gender}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#64748b' }}>Ngày sinh:</span>
              <strong>{student.dateOfBirth}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#64748b' }}>Nơi sinh:</span>
              <strong>{student.placeOfBirth}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#64748b' }}>Dân tộc / Tôn giáo:</span>
              <strong>{student.ethnicity} / {student.religion}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#64748b' }}>Số CCCD / Định danh:</span>
              <strong>{student.idCardNumber}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#64748b' }}>Ngày cấp CCCD:</span>
              <strong>{student.idCardDate}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#64748b' }}>Nơi cấp:</span>
              <strong>{student.idCardPlace}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Card 3: Thông tin liên lạc */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        border: '1px solid #e2e8f0',
        padding: '24px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
      }}>
        <h2 style={{
          fontSize: '17px',
          fontWeight: 700,
          color: '#008689',
          marginTop: 0,
          marginBottom: '16px',
          paddingBottom: '12px',
          borderBottom: '1.5px solid #f1f5f9',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}>
          <Mail size={20} />
          Thông tin liên lạc &amp; Cư trú
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '16px',
          fontSize: '13.5px',
        }}>
          <div>
            <span style={{ color: '#64748b', display: 'block', marginBottom: '4px' }}>Email sinh viên:</span>
            <strong style={{ color: '#008689' }}>{student.schoolEmail}</strong>
          </div>
          <div>
            <span style={{ color: '#64748b', display: 'block', marginBottom: '4px' }}>Email cá nhân:</span>
            <strong>{student.personalEmail}</strong>
          </div>
          <div>
            <span style={{ color: '#64748b', display: 'block', marginBottom: '4px' }}>Số điện thoại:</span>
            <strong>{student.phoneNumber}</strong>
          </div>
          <div style={{ gridColumn: 'span 2' }}>
            <span style={{ color: '#64748b', display: 'block', marginBottom: '4px' }}>Hộ khẩu thường trú:</span>
            <strong>{student.permanentAddress}</strong>
          </div>
          <div style={{ gridColumn: 'span 2' }}>
            <span style={{ color: '#64748b', display: 'block', marginBottom: '4px' }}>Địa chỉ báo tin / Tạm trú:</span>
            <strong>{student.contactAddress}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
