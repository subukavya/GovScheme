import express from 'express';
import cors from 'cors';
import { schemesData } from '../src/data/schemes.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

let databaseSchemes = [...schemesData];

// 1. GET /api/schemes - Fetch schemes
app.get('/api/schemes', (req, res) => {
  const { state, category, q } = req.query;
  let result = [...databaseSchemes];

  if (state && state !== 'All') {
    result = result.filter(s => s.state === state || s.state === 'Central');
  }

  if (category && category !== 'All') {
    result = result.filter(s => s.category === category);
  }

  if (q) {
    const term = String(q).toLowerCase();
    result = result.filter(s => s.name.toLowerCase().includes(term) || s.shortDescription.toLowerCase().includes(term));
  }

  res.json({
    success: true,
    total: result.length,
    schemes: result
  });
});

// 2. POST /api/schemes/import - Bulk import scheme data from official government feeds
app.post('/api/schemes/import', (req, res) => {
  const { schemes } = req.body;
  if (!schemes || !Array.isArray(schemes)) {
    return res.status(400).json({ success: false, message: 'Invalid payload. Array of schemes required.' });
  }

  let count = 0;
  schemes.forEach(newSch => {
    if (!databaseSchemes.some(s => s.id === newSch.id)) {
      databaseSchemes.unshift(newSch);
      count++;
    }
  });

  res.json({
    success: true,
    message: `Successfully imported ${count} new government schemes into database.`,
    totalSchemes: databaseSchemes.length
  });
});

// 3. POST /api/ocr/scan - OCR extraction endpoint
app.post('/api/ocr/scan', (req, res) => {
  const { docType } = req.body;
  res.json({
    success: true,
    docType: docType || 'Aadhaar',
    docNumber: '5489 3201 9845',
    confidenceScore: 96,
    extracted: {
      fullName: 'Ramesh Kumar',
      state: 'Tamil Nadu',
      verified: true
    }
  });
});

// 4. GET /api/admin/stats - Admin Dashboard analytics
app.get('/api/admin/stats', (req, res) => {
  res.json({
    success: true,
    stats: {
      totalSchemes: databaseSchemes.length,
      totalCitizens: 12480,
      totalOCRScans: 34910,
      totalDBTDisbursed: "₹4.8 Cr"
    }
  });
});

app.listen(PORT, () => {
  console.log(`GovScheme AI Express Backend running on port ${PORT}`);
});
