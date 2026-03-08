import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { type FullApplication } from '../types/form';

export const generateBlankPDF = (data?: FullApplication, companyName: string = 'Cargo Clarity') => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;
  const contentWidth = pageWidth - (margin * 2);
  let yPos = 15;

  const checkPageBreak = (neededHeight: number) => {
    if (yPos + neededHeight > pageHeight - 20) {
      doc.addPage();
      yPos = 15;
      return true;
    }
    return false;
  };

  const addHeader = () => {
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0);
    doc.text('DRIVER EMPLOYMENT APPLICATION', pageWidth / 2, yPos, { align: 'center' });
    yPos += 8;
    
    doc.setFontSize(10);
    doc.text(companyName, pageWidth / 2, yPos, { align: 'center' });
    yPos += 5;
    doc.setFont('helvetica', 'normal');
    doc.text('An Equal Opportunity Employer', pageWidth / 2, yPos, { align: 'center' });
    yPos += 5;
    doc.setFontSize(8);
    doc.setTextColor(100);
    doc.text('COMPLETE IN FULL OR IT WILL NOT BE CONSIDERED.', pageWidth / 2, yPos, { align: 'center' });
    yPos += 10;
    doc.setTextColor(0);
    doc.setLineWidth(0.5);
    doc.line(margin, yPos, pageWidth - margin, yPos);
    yPos += 10;
  };

  const drawSectionHeader = (title: string) => {
    checkPageBreak(15);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.setFillColor(240, 240, 240);
    doc.rect(margin, yPos - 5, contentWidth, 7, 'F');
    doc.text(title, margin + 2, yPos);
    yPos += 8;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
  };

  const drawField = (label: string, value: string, x: number, y: number, width: number) => {
    doc.setFontSize(7);
    doc.setTextColor(100);
    doc.text(label, x, y);
    doc.setFontSize(9);
    doc.setTextColor(0);
    doc.text(value || '', x, y + 5);
    doc.setDrawColor(200);
    doc.line(x, y + 6, x + width, y + 6);
    return y + 12;
  };

  const drawCheckbox = (label: string, isChecked: boolean, x: number, y: number) => {
    doc.rect(x, y - 3, 3, 3);
    if (isChecked) {
      doc.line(x, y - 3, x + 3, y);
      doc.line(x + 3, y - 3, x, y);
    }
    doc.setFontSize(9);
    doc.setTextColor(0);
    doc.text(label, x + 5, y);
    return x + doc.getTextWidth(label) + 15;
  };

  // PAGE 1
  addHeader();

  drawSectionHeader('APPLICANT INFORMATION');
  drawField('First Name', data?.personal.firstName || '', margin, yPos, 55);
  drawField('Middle Name', data?.personal.middleName || '', margin + 60, yPos, 55);
  drawField('Last Name', data?.personal.lastName || '', margin + 120, yPos, 60);
  yPos += 15;
  
  drawField('Phone Number', data?.personal.phone || '', margin, yPos, 85);
  drawField('Email Address', data?.personal.email || '', margin + 95, yPos, 85);
  yPos += 15;

  drawField('Date of Birth (MM/DD/YYYY)', data?.personal.dob || '', margin, yPos, 55);
  drawField('Social Security Number', data?.personal.ssn || '', margin + 60, yPos, 55);
  drawField('Date of Application', new Date().toLocaleDateString(), margin + 120, yPos, 60);
  yPos += 15;

  drawField('Position Applied For', data?.general.position || '', margin, yPos, 85);
  drawField('Date Available for Work', '', margin + 95, yPos, 85);
  yPos += 15;

  doc.text('Do you have legal right to work in the United States?', margin, yPos);
  drawCheckbox('YES', data?.general.legallyEligible === 'Yes', margin + 95, yPos);
  drawCheckbox('NO', data?.general.legallyEligible === 'No', margin + 115, yPos);
  yPos += 15;

  drawSectionHeader('PREVIOUS THREE YEARS RESIDENCY');
  const residencyRows = [
    ['Current', data?.personal.currentAddress || '', data?.personal.city || '', data?.personal.state || '', data?.personal.zip || '', ''],
  ];
  if (data?.personal.previousAddresses) {
    data.personal.previousAddresses.forEach(addr => {
      residencyRows.push(['Previous', addr.address, addr.city, addr.state, addr.zip, '']);
    });
  }
  while (residencyRows.length < 4) residencyRows.push(['Previous', '', '', '', '', '']);

  autoTable(doc, {
    startY: yPos,
    head: [['Type', 'Street', 'City', 'State', 'Zip', '# Years']],
    body: residencyRows,
    margin: { left: margin },
    tableWidth: contentWidth,
    styles: { fontSize: 8 },
    headStyles: { fillColor: [100, 100, 100] }
  });
  yPos = (doc as any).lastAutoTable.finalY + 15;

  // LICENSE INFORMATION
  drawSectionHeader('LICENSE INFORMATION');
  doc.setFontSize(7);
  const licenseText = "No person who operates a commercial motor vehicle shall at any time have more than one driver's license (49 CFR 383.21). I certify that I do not have more than one motor vehicle license, the information for which is listed below.";
  const lines = doc.splitTextToSize(licenseText, contentWidth);
  doc.text(lines, margin, yPos);
  yPos += (lines.length * 4) + 5;

  const licenseRows = (data?.licenses || []).map(l => [l.state, l.licenseNumber, l.class, l.endorsements.join(', '), l.expirationDate]);
  while (licenseRows.length < 2) licenseRows.push(['', '', '', '', '']);

  autoTable(doc, {
    startY: yPos,
    head: [['State', 'License Number', 'Type / Class', 'Endorsements', 'Expiration Date']],
    body: licenseRows,
    margin: { left: margin },
    tableWidth: contentWidth,
    styles: { fontSize: 8 },
    headStyles: { fillColor: [100, 100, 100] }
  });
  yPos = (doc as any).lastAutoTable.finalY + 15;

  // DRIVING EXPERIENCE
  drawSectionHeader('DRIVING EXPERIENCE');
  const expRows = [
    ['Straight Truck', '', data?.experience.straightTruck.hasExperience === 'Yes' ? 'YES' : 'NO', data?.experience.straightTruck.years || '', ''],
    ['Tractor & Semi-Trailer', '', data?.experience.tractorSemi.hasExperience === 'Yes' ? 'YES' : 'NO', data?.experience.tractorSemi.years || '', ''],
    ['Tractor & 2 Trailers', '', data?.experience.tractorTwoTrailers.hasExperience === 'Yes' ? 'YES' : 'NO', data?.experience.tractorTwoTrailers.years || '', ''],
    ['Tractor & Tanker', '', data?.experience.tanker.hasExperience === 'Yes' ? 'YES' : 'NO', data?.experience.tanker.years || '', ''],
    ['Other', data?.experience.others || '', '', '', ''],
  ];

  autoTable(doc, {
    startY: yPos,
    head: [['Class of Equipment', 'Type Details', 'Exp?', 'Years', 'Approx Miles']],
    body: expRows,
    margin: { left: margin },
    tableWidth: contentWidth,
    styles: { fontSize: 8 },
    headStyles: { fillColor: [100, 100, 100] }
  });
  yPos = (doc as any).lastAutoTable.finalY + 15;

  // FMCSR COMPLIANCE
  drawSectionHeader('FMCSR COMPLIANCE & DRIVER DATA');
  doc.setFontSize(7);
  const fmcsrQuestions = [
    { label: '1. Has any license, permit or privilege ever been denied, suspended or revoked for any reason?', val: data?.fmcsr.deniedSuspended },
    { label: '2. Have you ever been convicted of driving during suspension, revocation, or without a valid license?', val: data?.fmcsr.convictedSuspension },
    { label: '3. Have you ever been convicted for any alcohol or controlled substance related offense?', val: data?.fmcsr.convictedAlcohol },
    { label: '4. Have you been convicted for possession, sale or transfer of an illegal substance while on duty?', val: data?.fmcsr.convictedPossession },
    { label: '5. Have you been convicted of reckless driving, careless driving or operation of a motor vehicle?', val: data?.fmcsr.convictedReckless },
    { label: '6. Have you ever tested positive or refused to test on any DOT-mandated or pre-employment drug test?', val: data?.fmcsr.drugTestPositiveRefused },
  ];

  fmcsrQuestions.forEach(q => {
    checkPageBreak(8);
    doc.text(q.label, margin, yPos);
    drawCheckbox('YES', q.val === 'Yes', margin + 140, yPos);
    drawCheckbox('NO', q.val === 'No', margin + 160, yPos);
    yPos += 6;
  });
  yPos += 5;

  // ACCIDENT RECORD
  drawSectionHeader('ACCIDENT RECORD (Past 3 Years)');
  const accidentRows = (data?.fmcsr.accidents || []).map(a => [a.date, a.type, '', '', a.hazmat]);
  while (accidentRows.length < 1) accidentRows.push(['', '', '', '', '']);
  autoTable(doc, {
    startY: yPos,
    head: [['Date', 'Nature of Accident', 'Fatalities', 'Injuries', 'Hazmat Spill']],
    body: accidentRows,
    margin: { left: margin },
    tableWidth: contentWidth,
    styles: { fontSize: 8 },
    headStyles: { fillColor: [100, 100, 100] }
  });
  yPos = (doc as any).lastAutoTable.finalY + 15;

  // TRAFFIC CONVICTIONS
  drawSectionHeader('TRAFFIC CONVICTIONS (Past 3 Years)');
  const violationRows = (data?.fmcsr.violations || []).map(v => [v.date, v.description, v.state, v.penalties.join(', ')]);
  while (violationRows.length < 1) violationRows.push(['', '', '', '']);
  autoTable(doc, {
    startY: yPos,
    head: [['Date', 'Violation', 'State', 'Penalty']],
    body: violationRows,
    margin: { left: margin },
    tableWidth: contentWidth,
    styles: { fontSize: 8 },
    headStyles: { fillColor: [100, 100, 100] }
  });
  yPos = (doc as any).lastAutoTable.finalY + 15;

  // EMPLOYMENT HISTORY
  drawSectionHeader('EMPLOYMENT HISTORY');
  doc.setFontSize(8);
  const empInfo = "All driver applicants must provide information on all employers during the preceding 3 years, and an additional 7 years for commercial vehicle operation.";
  const lines2 = doc.splitTextToSize(empInfo, contentWidth);
  doc.text(lines2, margin, yPos);
  yPos += (lines2.length * 4) + 10;

  const employments = data?.employment || [];
  if (employments.length === 0) {
    for (let i = 1; i <= 3; i++) {
        checkPageBreak(60);
        doc.setFont('helvetica', 'bold');
        doc.text(`EMPLOYER ${i}`, margin, yPos);
        yPos += 5;
        doc.setFont('helvetica', 'normal');
        drawField('Name', '', margin, yPos, 85);
        drawField('Phone', '', margin + 95, yPos, 85);
        yPos += 15;
        drawField('Address', '', margin, yPos, contentWidth);
        yPos += 15;
        drawField('Position', '', margin, yPos, 55);
        drawField('From', '', margin + 60, yPos, 55);
        drawField('To', '', margin + 120, yPos, 60);
        yPos += 15;
    }
  } else {
    employments.forEach((emp, i) => {
        checkPageBreak(70);
        doc.setFont('helvetica', 'bold');
        doc.text(`EMPLOYER ${i + 1}`, margin, yPos);
        yPos += 5;
        doc.setFont('helvetica', 'normal');
        drawField('Name', emp.company, margin, yPos, 85);
        drawField('Phone', emp.phone, margin + 95, yPos, 85);
        yPos += 15;
        drawField('Address', `${emp.address}, ${emp.city}, ${emp.state} ${emp.zip}`, margin, yPos, contentWidth);
        yPos += 15;
        drawField('Position', emp.position, margin, yPos, 55);
        drawField('From', emp.startDate, margin + 60, yPos, 55);
        drawField('To', emp.endDate, margin + 120, yPos, 60);
        yPos += 15;
        drawField('Reason for Leaving', emp.reasonForLeaving, margin, yPos, contentWidth);
        yPos += 15;
    });
  }

  // EDUCATION
  drawSectionHeader('EDUCATION');
  autoTable(doc, {
    startY: yPos,
    head: [['School', 'Name & Location', 'Course of Study', 'Years Completed', 'Graduate']],
    body: [
      ['High School', '', '', '', ''],
      ['College', data?.education.schoolName || '', data?.education.studyField || '', '', data?.education.graduationDate ? 'YES' : 'NO'],
      ['Truck School', data?.training.schoolName || '', '', '', data?.training.graduated || ''],
    ],
    margin: { left: margin },
    tableWidth: contentWidth,
    styles: { fontSize: 8 },
    headStyles: { fillColor: [100, 100, 100] }
  });
  yPos = (doc as any).lastAutoTable.finalY + 15;

  drawSectionHeader('SUPPORTING DOCUMENTS');
  const docRows = (data?.documents || []).map(d => [d.type, d.fileName, d.description || '', `${Math.round(d.fileSize / 1024)} KB`]);
  while (docRows.length < 1) docRows.push(['', 'No documents uploaded', '', '']);
  autoTable(doc, {
    startY: yPos,
    head: [['Type', 'File Name', 'Description', 'Size']],
    body: docRows,
    margin: { left: margin },
    tableWidth: contentWidth,
    styles: { fontSize: 8 },
    headStyles: { fillColor: [100, 100, 100] }
  });
  yPos = (doc as any).lastAutoTable.finalY + 15;

  // SIGNATURE
  drawSectionHeader('TO BE READ AND SIGNED BY APPLICANT');
  doc.setFontSize(7);
  const legalText = "This certifies that this application was completed by me, and that all entries on it and information in it are true and complete to the best of my knowledge.";
  const lines3 = doc.splitTextToSize(legalText, contentWidth);
  doc.text(lines3, margin, yPos);
  yPos += (lines3.length * 4) + 20;

  drawField('Applicant Signature', data?.signature.signatureName ? `/s/ ${data.signature.signatureName}` : '', margin, yPos, 80);
  drawField('Date', data?.signature.signatureDate || '', margin + 90, yPos, 40);
  drawField('Name (Print)', data?.signature.signatureName || '', margin + 140, yPos, 40);
  yPos += 20;

  const pageCount = (doc as any).internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150);
    doc.text(`Page ${i} of ${pageCount} - ${companyName} © 2026`, pageWidth / 2, 285, { align: 'center' });
  }

  const fileName = data?.personal.lastName 
    ? `${companyName}_Application_${data.personal.lastName}.pdf`
    : `${companyName}_Blank_Application.pdf`;
    
  doc.save(fileName);
};
