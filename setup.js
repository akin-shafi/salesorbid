const fs = require('fs');
const path = require('path');

// Create directories
const directories = ['app', 'app/components', 'app/pages', 'app/styles', 'public/images'];
directories.forEach((dir) => {
  fs.mkdirSync(dir, { recursive: true });
});

// Create files
const files = [
  'app/components/Header.js',
  'app/components/Footer.js',
  'app/components/SearchBar.js',
  'app/components/AuctionCard.js',
  'app/components/AuctionDetails.js',
  'app/pages/index.js',
  'app/pages/auctions/[categoryId].js',
  'app/pages/auctions/[auctionId].js',
  'app/pages/dashboard.js',
  'app/styles/global.css',
];

files.forEach((file) => {
  fs.writeFileSync(file, '', 'utf8');
});

console.log('Project structure created successfully!');
