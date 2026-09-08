const fs = require('fs');
let content = fs.readFileSync('src/components/BuyerDashboard.tsx', 'utf8');

content = content.replace(
  "import { buyerMatches } from '../data/mockData';",
  "import { buyerMatches } from '../data/mockData';\nimport { PriceForecast } from './PriceForecast';"
);

content = content.replace(
  "      </div>\n\n      {/* 2. AI Matchmaking Section (Verified Farmers) */}",
  "      </div>\n\n      {/* Price Tracker & AI Forecast Section */}\n      <PriceForecast />\n\n      {/* 2. AI Matchmaking Section (Verified Farmers) */}"
);

fs.writeFileSync('src/components/BuyerDashboard.tsx', content, 'utf8');
