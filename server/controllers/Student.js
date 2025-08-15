const mongoose = require('mongoose');
const Student = require('../models/student');
const attendanceSchema = require('../models/attendance.model'); // export schema only, not model

async function HandleInformation(req, res) {
  try {
    const { rollno, batch } = req.body; // or req.body if sent in body

    // 1. Student profile
    const student = await Student.findOne({ rollno });
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    // 2. Pick the correct attendance collection dynamically
    const collectionName = `attendance_${batch.toLowerCase()}`;
    const AttendanceModel = mongoose.model(collectionName, attendanceSchema, collectionName);

    const attendance = await AttendanceModel.findOne({
      rollno: new RegExp(`^${rollno}$`, 'i')
    });

    if (!attendance) {
      return res.status(404).json({ error: 'Attendance record not found' });
    }

    // 3. Last 7 days logs
    const today = new Date();
    const past7Days = new Date(today);
    past7Days.setDate(today.getDate() - 6);

    const dailyLogs = attendance.dailyLogs
      .filter(log => new Date(log.date) >= past7Days)
      .sort((a, b) => new Date(b.date) - new Date(a.date));

    // 4. Send combined data
    res.json({
      profile: student,
      attendance: {
        overallAttendance: attendance.overallAttendance,
        courseAttendance: attendance.courseAttendance,
        dailyLogs
      }
    });

  } catch (err) {
    console.error('Error fetching profile & attendance:', err);
    res.status(500).json({ error: 'Server error' });
  }
}


module.exports={
    HandleInformation
}