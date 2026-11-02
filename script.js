
class Student {
  constructor(id, name, grades, attendance) {
    this.id = id;
    this.name = name;
    this.grades = grades;
    this.attendance = attendance;
  }

 
  calculateAverage() {
    const sum = this.grades.reduce((total, grade) => total + grade, 0);
    return sum / this.grades.length;
  }

  getGradeLetter(avg) {
    if (avg >= 90) return 'A';
    if (avg >= 80) return 'B';
    if (avg >= 70) return 'C';
    if (avg >= 60) return 'D';
    if (avg >= 50) return 'E';
    return 'F';
  }

  getFinalStatus() {
    const avg = this.calculateAverage();
    if (avg >= 50 && this.attendance >= 75) {
      return 'ناجح';
    } else {
      return 'يحتاج مراجعة';
    }
  }
}


const studentsList = [
  new Student(1, 'أحمد محمد', [85, 90, 88], 90),
  new Student(2, 'سارة علي', [42, 45, 44], 80), // متعثرة
  new Student(3, 'خالد عبد الله', [60, 65, 70], 70),
  new Student(4, 'فاطمة عمر', [46, 48, 43], 85)  // متعثرة
];


function renderMainTable() {
  const mainSection = document.getElementById('mainResultsSection');
  const tableBody = document.getElementById('studentsTableBody');
  
  tableBody.innerHTML = '';

  studentsList.forEach(student => {
    const avg = student.calculateAverage();
    const letter = student.getGradeLetter(avg);
    const status = student.getFinalStatus();
    
    const badgeClass = status === 'ناجح' ? 'bg-success' : 'bg-danger';

    const row = `
      <tr>
        <td>${student.id}</td>
        <td>${student.name}</td>
        <td>${student.grades.join(', ')}</td>
        <td>${student.attendance}%</td>
        <td>${avg.toFixed(2)}</td>
        <td><strong>${letter}</strong></td>
        <td><span class="badge ${badgeClass}">${status}</span></td>
      </tr>
    `;
    tableBody.innerHTML += row;
  });



  mainSection.style.display = 'block';
}


function runMercyCommittee() {

  const strugglingStudents = studentsList.filter(student => {
    const avg = student.calculateAverage();
    return avg >= 40 && avg < 50;
  });



  const boostedStrugglingStudents = strugglingStudents.map(student => {
    const originalAvg = student.calculateAverage();
    const newAvg = originalAvg + 5;
    
    return {
      id: student.id,
      name: student.name,
      originalAverage: originalAvg,
      adjustedAverage: newAvg,
      newGradeLetter: student.getGradeLetter(newAvg),
      newStatus: newAvg >= 50 && student.attendance >= 75 ? 'ناجح (بالرأفة)' : student.getFinalStatus()
    };
  });



  const totalAdjustedAverages = boostedStrugglingStudents.reduce((sum, student) => {
    return sum + student.adjustedAverage;
  }, 0);



  const averageOfBoosted = boostedStrugglingStudents.length > 0 
    ? totalAdjustedAverages / boostedStrugglingStudents.length 
    : 0;



  renderMercyTable(boostedStrugglingStudents, averageOfBoosted);
}



function renderMercyTable(boostedList, avgBoosted) {
  const mercySection = document.getElementById('mercySection');
  const tableBody = document.getElementById('mercyTableBody');
  
  tableBody.innerHTML = '';

  boostedList.forEach(student => {
    const badgeClass = student.newStatus.includes('ناجح') ? 'bg-warning' : 'bg-danger';

    const row = `
      <tr>
        <td>${student.id}</td>
        <td>${student.name}</td>
        <td>${student.originalAverage.toFixed(2)}</td>
        <td><strong>${student.adjustedAverage.toFixed(2)}</strong></td>
        <td>${student.newGradeLetter}</td>
        <td><span class="badge ${badgeClass}">${student.newStatus}</span></td>
      </tr>
    `;
    tableBody.innerHTML += row;
  });

  document.getElementById('boostedCount').innerText = boostedList.length;
  document.getElementById('boostedAvg').innerText = avgBoosted.toFixed(2);



  mercySection.style.display = 'block';
}