const fs = require('fs');
const path = require('path');

function readFile(filePath){
  return fs.readFileSync(filePath, 'utf8');
}

function parseBlocks(css){
  const blocks = new Map();
  let i = 0;
  const len = css.length;
  while(i < len){
    // skip whitespace
    if(/\s/.test(css[i])){ i++; continue; }
    if(css.startsWith('@', i)){
      // at-rule (e.g., @media) - capture until matching brace pair if present, else until semicolon
      const start = i;
      // read until '{' or ';'
      let headerEnd = css.indexOf('{', i);
      let semi = css.indexOf(';', i);
      if(headerEnd === -1 || (semi !== -1 && semi < headerEnd)){
        // at-rule without block
        const block = css.slice(i, semi+1);
        blocks.set(block.trim(), block);
        i = semi+1;
        continue;
      }
      // header starts at i, find matching brace
      let braceCount = 0;
      let j = headerEnd;
      for(; j < len; j++){
        if(css[j] === '{') braceCount++;
        else if(css[j] === '}'){
          braceCount--;
          if(braceCount === 0){ j++; break; }
        }
      }
      const block = css.slice(start, j);
      // use header as key (trimmed) to match other file
      const header = css.slice(start, headerEnd).trim();
      blocks.set(header, block);
      i = j;
      continue;
    }

    // normal selector block
    // find next '{'
    const brace = css.indexOf('{', i);
    if(brace === -1) break;
    const selector = css.slice(i, brace).trim();
    // find matching closing brace
    let j = brace;
    let count = 0;
    for(; j < len; j++){
      if(css[j] === '{') count++;
      else if(css[j] === '}'){
        count--;
        if(count === 0){ j++; break; }
      }
    }
    const block = css.slice(i, j);
    blocks.set(selector, block);
    i = j;
  }
  return blocks;
}

function syncFiles(refPath, targetPath){
  const refCss = readFile(refPath);
  const targetCss = readFile(targetPath);
  const refBlocks = parseBlocks(refCss);
  const targetBlocks = parseBlocks(targetCss);

  const updatedSelectors = [];
  let newTargetCss = targetCss;

  for(const [selector, refBlock] of refBlocks.entries()){
    if(targetBlocks.has(selector)){
      const targetBlock = targetBlocks.get(selector);
      if(refBlock !== targetBlock){
        // replace first occurrence of targetBlock with refBlock
        const index = newTargetCss.indexOf(targetBlock);
        if(index !== -1){
          newTargetCss = newTargetCss.slice(0, index) + refBlock + newTargetCss.slice(index + targetBlock.length);
          updatedSelectors.push(selector);
        }
      }
    }
  }

  if(updatedSelectors.length === 0){
    console.log('No differing shared selectors found. No changes made.');
    return {updated: [], changed: false};
  }

  // backup original
  const backupPath = targetPath + '.bak.' + Date.now();
  fs.copyFileSync(targetPath, backupPath);
  fs.writeFileSync(targetPath, newTargetCss, 'utf8');
  console.log('Updated selectors:', updatedSelectors.length);
  updatedSelectors.forEach(s => console.log('-', s));
  console.log('\nBackup of original file saved to:', backupPath);
  return {updated: updatedSelectors, changed: true, backup: backupPath};
}

if(require.main === module){
  const ref = process.argv[2];
  const target = process.argv[3];
  if(!ref || !target){
    console.error('Usage: node sync-style-css.js <reference-style.css> <target-style.css>');
    process.exit(2);
  }
  try{
    const result = syncFiles(path.resolve(ref), path.resolve(target));
    if(result.changed) process.exit(0);
    else process.exit(0);
  }catch(err){
    console.error('Error:', err);
    process.exit(1);
  }
}
