import { createWorker } from 'tesseract.js';
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

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat',
  'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh',
  'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh',
  'Uttarakhand', 'West Bengal', 'Delhi', 'Jammu and Kashmir', 'Ladakh',
];

function parseAadhaar(text: string): string {
  // Match 12-digit Aadhaar: XXXX XXXX XXXX or XXXXXXXXXXXX
  const match = text.match(/\b(\d{4}\s\d{4}\s\d{4}|\d{12})\b/);
  if (match) {
    const digits = match[0].replace(/\s/g, '');
    return `${digits.slice(0, 4)} ${digits.slice(4, 8)} ${digits.slice(8, 12)}`;
  }
  return '';
}

function parsePAN(text: string): string {
  const match = text.match(/\b([A-Z]{5}[0-9]{4}[A-Z])\b/);
  return match ? match[1] : '';
}

function parseName(text: string): string {
  // Try "Name: XYZ" or "नाम: XYZ"
  const patterns = [
    /(?:Name|NAME)\s*[:\-]\s*([A-Z][A-Z\s]{3,40})/i,
    /(?:नाम|ਨਾਮ)\s*[:\-]\s*(\S.{3,30})/,
  ];
  for (const p of patterns) {
    const m = text.match(p);
    if (m) return m[1].trim();
  }
  return '';
}

function parseDOB(text: string): string {
  const match = text.match(/\b(\d{2}[\/\-]\d{2}[\/\-]\d{4}|\d{4}[\/\-]\d{2}[\/\-]\d{2})\b/);
  if (match) {
    const d = match[1];
    // Convert DD/MM/YYYY → YYYY-MM-DD
    if (d.length === 10 && (d[2] === '/' || d[2] === '-')) {
      const [dd, mm, yyyy] = d.split(/[\/\-]/);
      return `${yyyy}-${mm}-${dd}`;
    }
    return d;
  }
  return '';
}

function parseGender(text: string): string {
  if (/\b(Male|MALE|M)\b/.test(text)) return 'Male';
  if (/\b(Female|FEMALE|F)\b/.test(text)) return 'Female';
  if (/\b(Transgender|TRANSGENDER)\b/.test(text)) return 'Transgender';
  return '';
}

function parseState(text: string): string {
  for (const state of INDIAN_STATES) {
    if (text.toLowerCase().includes(state.toLowerCase())) return state;
  }
  return '';
}

function parseIncome(text: string): number | undefined {
  // Match patterns like "Rs. 1,20,000" or "₹95,000" or "95000"
  const patterns = [
    /(?:Rs\.?|INR|₹)\s*([\d,]+)/i,
    /(?:income|Income|INCOME)\s*(?:is|:)?\s*Rs\.?\s*([\d,]+)/i,
    /\b([\d,]{5,10})\s*(?:\/\-|only|per annum|per year|annually)/i,
  ];
  for (const p of patterns) {
    const m = text.match(p);
    if (m) {
      const num = parseInt(m[1].replace(/,/g, ''), 10);
      if (!isNaN(num) && num > 1000 && num < 100000000) return num;
    }
  }
  return undefined;
}

function detectDocumentType(text: string, expectedType: DocumentRecord['type']): {
  label: string;
  isValid: boolean;
  detectedType: string;
} {
  const upper = text.toUpperCase();
  const hasAadhaar = upper.includes('UIDAI') || upper.includes('AADHAAR') || upper.includes('UNIQUE IDENTIFICATION') || /\b\d{4}\s\d{4}\s\d{4}\b/.test(text);
  const hasPAN = upper.includes('INCOME TAX') || upper.includes('PERMANENT ACCOUNT NUMBER') || /\b[A-Z]{5}[0-9]{4}[A-Z]\b/.test(text);
  const hasIncome = upper.includes('INCOME CERTIFICATE') || upper.includes('ANNUAL INCOME') || upper.includes('REVENUE DEPARTMENT');
  const hasRation = upper.includes('RATION CARD') || upper.includes('FAIR PRICE');

  const detected = hasAadhaar ? 'Aadhaar'
    : hasPAN ? 'PAN'
      : hasIncome ? 'Income Certificate'
        : hasRation ? 'Ration Card'
          : expectedType;

  return {
    detectedType: detected,
    isValid: detected === expectedType,
    label: detected === expectedType
      ? `${detected} (Verified ✓)`
      : `${detected} detected — expected ${expectedType}`
  };
}

/**
 * Real OCR scan using Tesseract.js
 * Extracts actual text from the uploaded image and parses government document fields.
 */
export async function performOCRScan(
  file: File,
  expectedType: DocumentRecord['type']
): Promise<OCRScanResult> {
  let rawText = '';
  let confidence = 0;

  try {
    const worker = await createWorker(['eng', 'hin'], 1, {
      logger: () => { } // suppress logs
    });
    const { data } = await worker.recognize(file);
    rawText = data.text || '';
    confidence = Math.round(data.confidence || 0);
    await worker.terminate();
  } catch (err) {
    console.error('Tesseract OCR error:', err);
    rawText = '';
    confidence = 0;
  }

  // Parse extracted fields
  const docInfo = detectDocumentType(rawText, expectedType);
  const aadhaarNum = parseAadhaar(rawText);
  const panNum = parsePAN(rawText);
  const name = parseName(rawText);
  const dob = parseDOB(rawText);
  const gender = parseGender(rawText);
  const state = parseState(rawText);
  const income = parseIncome(rawText);

  // Document number by type
  let docNumber = '';
  if (expectedType === 'Aadhaar') docNumber = aadhaarNum || (rawText.match(/\b\d{12}\b/)?.[0] || '');
  else if (expectedType === 'PAN') docNumber = panNum;
  else if (expectedType === 'Income Certificate') {
    const certNo = rawText.match(/(?:Cert(?:ificate)?\.?\s*No\.?|No\.)\s*[:\-]?\s*([A-Z0-9\-\/]+)/i);
    docNumber = certNo ? certNo[1].trim() : `DOC-${Date.now()}`;
  } else {
    docNumber = rawText.match(/\b[A-Z0-9]{6,20}\b/)?.[0] || `DOC-${Date.now()}`;
  }

  // Fallback if OCR failed entirely
  const isBlank = rawText.trim().length < 10;

  return {
    docType: expectedType,
    docNumber: docNumber || `DOC-${Date.now()}`,
    extractedFields: {
      fullName: isBlank ? undefined : (name || undefined),
      dob: isBlank ? undefined : (dob || undefined),
      annualIncome: isBlank ? undefined : income,
      state: isBlank ? undefined : (state || undefined),
      gender: isBlank ? undefined : (gender || undefined),
      confidenceScore: isBlank ? 0 : confidence,
      issueDate: isBlank ? undefined : undefined,
    },
    isValidDocType: isBlank ? false : docInfo.isValid,
    detectedTypeLabel: isBlank
      ? 'Could not extract text. Please upload a clearer image.'
      : docInfo.label,
    rawTextPreview: isBlank
      ? 'No text could be extracted. Try a cleaner, well-lit image of the document.'
      : rawText.slice(0, 600),
  };
}
