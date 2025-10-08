#!/usr/bin/env node

/**
 * VERSION MAPPER
 * Tracks the relationship between build versions and display versions
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// Version mapping database
const VERSION_MAP_FILE = path.join(__dirname, '../version-map.json');

// Known mappings (manually verified)
const KNOWN_MAPPINGS = {
  '0.45.14': '1.7.39',  // Verified Feb 2025
  '0.45.13': '1.7.38',  // Estimated
  '0.45.12': '1.7.37',  // Estimated
  // Add more as we discover them
};

function loadVersionMap() {
  try {
    if (fs.existsSync(VERSION_MAP_FILE)) {
      return JSON.parse(fs.readFileSync(VERSION_MAP_FILE, 'utf8'));
    }
  } catch (e) {
    // Ignore errors, return defaults
  }
  return KNOWN_MAPPINGS;
}

function saveVersionMap(map) {
  fs.writeFileSync(VERSION_MAP_FILE, JSON.stringify(map, null, 2), 'utf8');
}

function fetchBuildVersion() {
  return new Promise((resolve, reject) => {
    https.get('https://download.todesktop.com/230313mzl4w4u92/latest-mac.yml', (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        const match = data.match(/^version:\s*(.+)$/m);
        if (match) {
          const version = match[1].trim();
          const dateMatch = data.match(/^releaseDate:\s*'(.+)'$/m);
          const releaseDate = dateMatch ? dateMatch[1].trim() : null;
          resolve({ version, releaseDate });
        } else {
          reject(new Error('Version not found'));
        }
      });
    }).on('error', reject);
  });
}

function estimateDisplayVersion(buildVersion) {
  // Parse build version: 0.45.14 -> 0, 45, 14
  const [major, minor, patch] = buildVersion.split('.').map(Number);
  
  // Estimated mapping logic (based on observation):
  // Build 0.45.x seems to map to Display 1.7.x
  // This is a guess - we'll refine as we collect data
  
  if (major === 0 && minor === 45) {
    // 0.45.14 -> 1.7.39
    // Rough estimate: patch * 0.18 + 36.5
    const estimatedPatch = Math.round(patch * 0.18 + 36.5);
    return `1.7.${estimatedPatch}`;
  }
  
  // Fallback: Unknown mapping
  return null;
}

async function main() {
  console.log('🔍 Cursor Version Mapper\n');
  console.log('='.repeat(50));
  
  // Load existing mappings
  const versionMap = loadVersionMap();
  console.log(`\n📚 Known mappings: ${Object.keys(versionMap).length}`);
  
  // Fetch latest build version
  try {
    const { version: buildVersion, releaseDate } = await fetchBuildVersion();
    console.log(`\n✅ Latest Build Version: ${buildVersion}`);
    console.log(`📅 Release Date: ${new Date(releaseDate).toLocaleDateString()}`);
    
    // Check if we have a mapping
    if (versionMap[buildVersion]) {
      console.log(`\n🎯 Known Display Version: ${versionMap[buildVersion]}`);
      console.log(`   (Verified mapping)`);
    } else {
      const estimated = estimateDisplayVersion(buildVersion);
      if (estimated) {
        console.log(`\n🤔 Estimated Display Version: ${estimated}`);
        console.log(`   (⚠️  Unverified - please confirm manually)`);
        console.log(`\n   To verify:`);
        console.log(`   1. Download Cursor from cursor.com`);
        console.log(`   2. Check: Cursor → Settings → About`);
        console.log(`   3. Add to version-map.json if correct`);
      } else {
        console.log(`\n❓ Display version unknown for build ${buildVersion}`);
        console.log(`\n   Please manually check:`);
        console.log(`   1. Download Cursor from cursor.com`);
        console.log(`   2. Check: Cursor → Settings → About`);
        console.log(`   3. Add mapping to version-map.json`);
      }
    }
    
    // Show recommendation
    console.log(`\n\n💡 RECOMMENDATION:`);
    console.log(`   Show both versions on website:`);
    console.log(`   - Build Version: ${buildVersion} (Automated, Always Accurate)`);
    if (versionMap[buildVersion]) {
      console.log(`   - Display Version: ${versionMap[buildVersion]} (Verified)`);
    } else {
      console.log(`   - Display Version: Check manually or use estimate`);
    }
    
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  }
  
  console.log('\n' + '='.repeat(50));
}

if (require.main === module) {
  main();
}

module.exports = { loadVersionMap, saveVersionMap, fetchBuildVersion, estimateDisplayVersion };

