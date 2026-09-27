const fs = require('fs');
const code = fs.readFileSync('sahna_bundle.js', 'utf8');

// Find all text within jsx or strings
const regex = /["`']([^"`'\\]{3,100})["`']/g;
let match;
const set = new Set();
while ((match = regex.exec(code)) !== null) {
  const str = match[1];
  if (/[a-zA-Z]/.test(str)) {
    if (['bosh', 'afisha', 'teatr', 'konsert', 'chipta', 'zal', 'repertuar', 'sevimli', 'joy', 'bron', 'savat', 'sozlam', 'profil', 'sahna', 'aloqa', 'haqida', 'page', 'tab', 'filter', 'kategoriya'].some(k => str.toLowerCase().includes(k))) {
      set.add(str);
    }
  }
}

console.log('Found:', set.size);
console.log(Array.from(set).slice(0, 80));
