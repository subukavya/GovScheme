import { DocumentRecord } from '../types';

export interface OCRScanResult {
  docType: DocumentRecord['type'];
  docNumber: string;
  extractedFields: {
    fullName?: string;
    dob?: string;
    annualIncome?: number;
    state?: string;
    gender?: string;
    confidenceScore: number;
    issueDate?: string;
  };
  isValidDocType: boolean;
  detectedTypeLabel: string;
  rawTextPreview: string;
}

/**
 * Advanced OCR Scanning and Extraction Service
 * Simulates high-precision optical character recognition on government document images.
 * Detects document types, validates numbers (Aadhaar 12-digit, PAN 10-char), checks confidence,
 * and extracts data to auto-fill user profiles.
 */
export async function performOCRScan(
  file: File,
  expectedType: DocumentRecord['type']
): Promise<OCRScanResult> {
  // Simulate OCR scan delay
  await new Promise(resolve => setTimeout(resolve, 2200));

  const fileName = file.name.toLowerCase();

  // Heuristic mock extraction based on doc type & file name hints
  if (expectedType === 'Aadhaar') {
    const isMismatch = fileName.includes('pan') || fileName.includes('income');
    const confidence = isMismatch ? 42 : 96;
    
    return {
      docType: 'Aadhaar',
      docNumber: '5489 3201 9845',
      extractedFields: {
        fullName: 'Ramesh Kumar',
        dob: '1984-05-12',
        state: 'Tamil Nadu',
        gender: 'Male',
        confidenceScore: confidence,
        issueDate: '2019-11-04'
      },
      isValidDocType: !isMismatch,
      detectedTypeLabel: isMismatch ? 'PAN Card detected instead of Aadhaar' : 'Aadhaar Card (UIDAI Verified)',
      rawTextPreview: `GOVERNMENT OF INDIA\nUNIQUE IDENTIFICATION AUTHORITY OF INDIA\nName: Ramesh Kumar\nDOB: 12/05/1984\nGender: Male\nAadhaar: 5489 3201 9845\nAddress: 42, South Car St, Madurai, Tamil Nadu - 625001`
    };
  } else if (expectedType === 'PAN') {
    return {
      docType: 'PAN',
      docNumber: 'ABCDE1234F',
      extractedFields: {
        fullName: 'Ramesh Kumar',
        dob: '1984-05-12',
        confidenceScore: 94,
        issueDate: '2018-03-15'
      },
      isValidDocType: true,
      detectedTypeLabel: 'Permanent Account Number (INCOME TAX DEPT)',
      rawTextPreview: `INCOME TAX DEPARTMENT\nGOVT OF INDIA\nName: RAMESH KUMAR\nFather's Name: SURESH KUMAR\nDOB: 12/05/1984\nPAN: ABCDE1234F`
    };
  } else if (expectedType === 'Income Certificate') {
    return {
      docType: 'Income Certificate',
      docNumber: 'TN-INC-2026-98124',
      extractedFields: {
        fullName: 'Ramesh Kumar',
        annualIncome: 95000,
        state: 'Tamil Nadu',
        confidenceScore: 92,
        issueDate: '2026-01-10'
      },
      isValidDocType: true,
      detectedTypeLabel: 'Revenue Department Income Certificate',
      rawTextPreview: `REVENUE DEPARTMENT - GOVT OF TAMIL NADU\nCertificate No: TN-INC-2026-98124\nThis is to certify that Shri Ramesh Kumar annual income from all sources is Rs. 95,000/- (Ninety Five Thousand Only).\nValid till: 2027`
    };
  } else {
    return {
      docType: expectedType,
      docNumber: 'DOC-8841-2026',
      extractedFields: {
        fullName: 'Ramesh Kumar',
        confidenceScore: 90,
        issueDate: '2025-09-01'
      },
      isValidDocType: true,
      detectedTypeLabel: `${expectedType} (Official Document)`,
      rawTextPreview: `GOVERNMENT OF INDIA - OFFICIAL DOCUMENT\nDocument Type: ${expectedType}\nName: Ramesh Kumar\nVerified Stamp: OK`
    };
  }
}
