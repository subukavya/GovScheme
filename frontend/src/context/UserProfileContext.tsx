import { createContext, useContext, useState, type ReactNode } from "react";
import type { UserProfile } from "../types";

const INITIAL_PROFILE: UserProfile = {
  name: "Ramesh Kumar Sharma",
  mobile: "9876543210",
  countryCode: "+91",
  state: "Uttar Pradesh",
  district: "Varanasi",
  age: 42,
  gender: "Male",
  occupation: "Small Farmer",
  incomeCategory: "₹1,00,000 - ₹2,50,000",
  annualIncome: 145000,
  landHolding: 2.5,
  householdSize: 5,
  category: "OBC",
  bplStatus: true,
  disabilityStatus: false,
  kisanCreditCard: true,
  concreteHouse: false,
};

interface UserProfileContextType {
  profile: UserProfile;
  updateProfile: (data: Partial<UserProfile>) => void;
  fillFromOCR: (data: Record<string, string>) => void;
  calculateProfileCompletion: () => number;
}

const UserProfileContext = createContext<UserProfileContextType | undefined>(undefined);

export const UserProfileProvider = ({ children }: { children: ReactNode }) => {
  const [profile, setProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem("govscheme_user_profile");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Error parsing saved profile", e);
      }
    }
    return INITIAL_PROFILE;
  });

  const updateProfile = (data: Partial<UserProfile>) => {
    setProfile((prev) => {
      const updated = { ...prev, ...data };
      localStorage.setItem("govscheme_user_profile", JSON.stringify(updated));
      return updated;
    });
  };

  const fillFromOCR = (ocrData: Record<string, string>) => {
    const updates: Partial<UserProfile> = {};
    if (ocrData.name) updates.name = ocrData.name;
    if (ocrData.dob) {
      const birthYear = parseInt(ocrData.dob.slice(-4), 10);
      if (!isNaN(birthYear)) {
        updates.age = new Date().getFullYear() - birthYear;
      }
    }
    if (ocrData.income) {
      const incVal = parseInt(ocrData.income.replace(/\D/g, ""), 10);
      if (!isNaN(incVal)) {
        updates.annualIncome = incVal;
        if (incVal <= 100000) updates.incomeCategory = "Below ₹1,00,000";
        else if (incVal <= 250000) updates.incomeCategory = "₹1,00,000 - ₹2,50,000";
        else updates.incomeCategory = "Above ₹2,50,000";
      }
    }
    if (ocrData.category) {
      if (['General', 'OBC', 'SC', 'ST', 'EWS'].includes(ocrData.category)) {
        updates.category = ocrData.category as UserProfile['category'];
      }
    }

    updateProfile(updates);
  };

  const calculateProfileCompletion = (): number => {
    let fieldsCount = 0;
    let filledCount = 0;
    const requiredKeys: (keyof UserProfile)[] = [
      "name",
      "mobile",
      "state",
      "district",
      "age",
      "gender",
      "occupation",
      "incomeCategory",
      "category",
      "landHolding",
      "householdSize"
    ];

    requiredKeys.forEach((key) => {
      fieldsCount++;
      if (profile[key] !== "" && profile[key] !== undefined && profile[key] !== null) {
        filledCount++;
      }
    });

    return Math.round((filledCount / fieldsCount) * 100);
  };

  return (
    <UserProfileContext.Provider
      value={{
        profile,
        updateProfile,
        fillFromOCR,
        calculateProfileCompletion,
      }}
    >
      {children}
    </UserProfileContext.Provider>
  );
};

export const useUserProfile = () => {
  const context = useContext(UserProfileContext);
  if (!context) {
    throw new Error("useUserProfile must be used within a UserProfileProvider");
  }
  return context;
};
