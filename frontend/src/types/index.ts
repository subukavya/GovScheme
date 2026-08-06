export interface CountryCode {
  code: string;
  country: string;
  flag: string;
  dialCode: string;
}

export interface UserProfile {
  name: string;
  mobile: string;
  countryCode: string;
  state: string;
  district: string;
  age: number | string;
  gender: 'Male' | 'Female' | 'Other' | '';
  occupation: string;
  incomeCategory: string;
  annualIncome: number | string;
  landHolding: number | string; // in acres
  householdSize: number | string;
  category: 'General' | 'OBC' | 'SC' | 'ST' | 'EWS' | '';
  bplStatus: boolean;
  disabilityStatus: boolean;
  kisanCreditCard: boolean;
  concreteHouse: boolean;
}

export interface Scheme {
  id: string;
  name: string;
  nativeName?: string;
  department: string;
  ministry: string;
  category: 'Agriculture' | 'Housing' | 'Pension' | 'Education' | 'Health' | 'Financial Aid' | 'Women & Child';
  matchPercentage: number;
  benefits: string[];
  summary: string;
  eligibilityCriteria: string[];
  documentsRequired: string[];
  applicationUrl?: string;
  isPopular?: boolean;
  tags: string[];
  maxAmount?: string;
}

export interface OCRDocument {
  id: string;
  title: string;
  type: 'aadhaar' | 'income' | 'caste';
  status: 'idle' | 'scanning' | 'verified' | 'error';
  fileName?: string;
  extractedData?: {
    name?: string;
    idNumber?: string;
    dob?: string;
    address?: string;
    income?: string;
    category?: string;
  };
}

export interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  audioDuration?: string;
  isVoice?: boolean;
}
