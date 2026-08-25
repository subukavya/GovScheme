import { UserProfile, Scheme, RuleEvaluationResult } from '../types';

/**
 * Deterministic Rule-Based Eligibility Engine
 * CRITICAL RULE: Legal eligibility is strictly computed using deterministic rules.
 * Never substitute ML for legal eligibility verification.
 */
export function evaluateSchemeEligibility(user: UserProfile, scheme: Scheme): RuleEvaluationResult {
  const rules = scheme.eligibilityRules;
  const matchedCriteria: string[] = [];
  const failedCriteria: string[] = [];
  const missingDocuments: string[] = [];

  // 1. Age Verification
  if (rules.minAge !== undefined || rules.maxAge !== undefined) {
    const minAge = rules.minAge ?? 0;
    const maxAge = rules.maxAge ?? 120;
    if (user.age >= minAge && user.age <= maxAge) {
      matchedCriteria.push(`Age Requirement Met (${user.age} yrs within ${minAge}-${maxAge} range)`);
    } else {
      failedCriteria.push(`Age ${user.age} yrs does not satisfy required range (${minAge}-${maxAge} yrs)`);
    }
  }

  // 2. Gender Verification
  if (rules.allowedGenders && rules.allowedGenders.length > 0 && !rules.allowedGenders.includes('All')) {
    if (rules.allowedGenders.includes(user.gender)) {
      matchedCriteria.push(`Gender requirement met (${user.gender})`);
    } else {
      failedCriteria.push(`Targeted for ${rules.allowedGenders.join(', ')} (User is ${user.gender})`);
    }
  }

  // 3. State / Jurisdiction Verification
  if (scheme.state !== 'Central' && rules.allowedStates && rules.allowedStates.length > 0) {
    const stateMatched = rules.allowedStates.some(s => s.toLowerCase() === user.state.toLowerCase());
    if (stateMatched) {
      matchedCriteria.push(`Resident of ${user.state}`);
    } else {
      failedCriteria.push(`Scheme restricted to ${rules.allowedStates.join(', ')} (User in ${user.state})`);
    }
  } else if (scheme.state === 'Central') {
    matchedCriteria.push(`Central Scheme open across India`);
  }

  // 4. Annual Income Verification
  if (rules.maxAnnualIncome !== undefined) {
    if (user.annualIncome <= rules.maxAnnualIncome) {
      matchedCriteria.push(`Income ₹${user.annualIncome.toLocaleString('en-IN')}/yr below limit of ₹${rules.maxAnnualIncome.toLocaleString('en-IN')}/yr`);
    } else {
      failedCriteria.push(`Income ₹${user.annualIncome.toLocaleString('en-IN')}/yr exceeds upper threshold of ₹${rules.maxAnnualIncome.toLocaleString('en-IN')}/yr`);
    }
  }

  // 5. Occupation Verification
  if (rules.allowedOccupations && rules.allowedOccupations.length > 0) {
    const occupationMatched = rules.allowedOccupations.some(occ => 
      occ.toLowerCase().includes(user.occupation.toLowerCase()) || 
      user.occupation.toLowerCase().includes(occ.toLowerCase())
    );
    if (occupationMatched) {
      matchedCriteria.push(`Occupation matches (${user.occupation})`);
    } else {
      failedCriteria.push(`Requires occupation like ${rules.allowedOccupations.join(', ')} (User is ${user.occupation})`);
    }
  }

  // 6. Land Holding Verification
  if (rules.maxLandHoldingAcres !== undefined) {
    if (user.landHoldingAcres <= rules.maxLandHoldingAcres) {
      matchedCriteria.push(`Land holding ${user.landHoldingAcres} acres within ceiling of ${rules.maxLandHoldingAcres} acres`);
    } else {
      failedCriteria.push(`Land holding ${user.landHoldingAcres} acres exceeds limit of ${rules.maxLandHoldingAcres} acres`);
    }
  }

  // 7. Social Category Verification
  if (rules.allowedCategories && rules.allowedCategories.length > 0 && !rules.allowedCategories.includes('All')) {
    if (rules.allowedCategories.includes(user.category)) {
      matchedCriteria.push(`Social Category requirement met (${user.category})`);
    } else {
      failedCriteria.push(`Restricted to ${rules.allowedCategories.join(', ')} (User category: ${user.category})`);
    }
  }

  // 8. Disability Verification
  if (rules.requiresDisability) {
    if (user.hasDisability) {
      const minPerc = rules.minDisabilityPercentage ?? 40;
      const userPerc = user.disabilityPercentage ?? 40;
      if (userPerc >= minPerc) {
        matchedCriteria.push(`Disability criteria met (${userPerc}% >= ${minPerc}%)`);
      } else {
        failedCriteria.push(`Requires at least ${minPerc}% disability (User certified at ${userPerc}%)`);
      }
    } else {
      failedCriteria.push(`Requires disability certificate`);
    }
  }

  // 9. Document Vault Verification
  const uploadedDocTypes = user.documents.map(d => d.type);
  scheme.requiredDocuments.forEach(reqDoc => {
    const isDocPresent = uploadedDocTypes.some(docType => 
      reqDoc.toLowerCase().includes(docType.toLowerCase()) || docType.toLowerCase().includes(reqDoc.toLowerCase())
    );
    if (!isDocPresent) {
      missingDocuments.push(reqDoc);
    }
  });

  // Calculate Status
  let status: 'Eligible' | 'Conditionally Eligible' | 'Not Eligible';
  let overallReason = '';

  if (failedCriteria.length === 0 && missingDocuments.length === 0) {
    status = 'Eligible';
    overallReason = `Full eligibility verified! All ${matchedCriteria.length} criteria met and all required documents present in Document Vault.`;
  } else if (failedCriteria.length === 0 && missingDocuments.length > 0) {
    status = 'Conditionally Eligible';
    overallReason = `Eligible based on profile criteria, but missing ${missingDocuments.length} document(s) in Document Vault (${missingDocuments.join(', ')}). Upload before applying on official portal.`;
  } else {
    status = 'Not Eligible';
    overallReason = `Does not meet core requirements: ${failedCriteria.join('; ')}`;
  }

  return {
    schemeId: scheme.id,
    status,
    matchedCriteria,
    failedCriteria,
    missingDocuments,
    overallReason
  };
}
