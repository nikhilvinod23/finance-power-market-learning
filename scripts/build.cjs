const fs=require('node:fs'),path=require('node:path');const root=path.join(__dirname,'..');const dist=path.join(root,'dist');fs.mkdirSync(dist,{recursive:true});
for(const name of ['index.html','style.css','colors.css','.nojekyll','app.js','models.js','content','SOURCES.md'])fs.cpSync(path.join(root,name),path.join(dist,name),{recursive:true});
fs.mkdirSync(path.join(dist,'assets'),{recursive:true});fs.copyFileSync(path.join(root,'assets/favicon.svg'),path.join(dist,'assets/favicon.svg'));
console.log('Built static site in dist/');
