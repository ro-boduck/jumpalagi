const fs = require('fs');
const PNG = require('pngjs').PNG;

fs.createReadStream('public/JL LOGO.png')
  .pipe(new PNG())
  .on('parsed', function() {
    const colors = {};
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const idx = (this.width * y + x) << 2;
        const r = this.data[idx];
        const g = this.data[idx + 1];
        const b = this.data[idx + 2];
        const a = this.data[idx + 3];

        if (a > 100) {
          const hex = '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
          colors[hex] = (colors[hex] || 0) + 1;
        }
      }
    }
    
    const sorted = Object.entries(colors).sort((a, b) => b[1] - a[1]).slice(0, 20);
    console.log(sorted);
  });
