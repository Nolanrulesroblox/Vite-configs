import { writeFileSync } from 'fs';
function manifestPlugin() {
  return {
    name: 'vite-plugin-manifest',
    generateBundle(options, bundle) {
      const manifest = {
        entrypoints: [],
        files: {}
      };
      for (const [fileName, file] of Object.entries(bundle)) {
        if (file.isEntry) {
          const entryName = file.name === 'index' ? 'main' : file.name;
          const ext = fileName.split('.').pop();
          const fileType = ext === 'css' ? 'css' : 'js';
          manifest.files[`${entryName}.${fileType}`] = `${fileName}`;
          manifest.entrypoints.push(`${fileName}`);
        } else {
          const ext = fileName.split('.').pop();
          const fileType = ext === 'css' ? 'css' : ext === 'js' ? 'js' : 'media';
          manifest.files[fileName] = `${fileName}`;
        }
      }
      let cssFileName;

      for (const [fileName, _] of Object.entries(bundle)) {
        if (fileName.endsWith('.css')) {
          cssFileName = fileName;
          break; // We only need the first CSS file
        }
      }

      if (cssFileName) {
        manifest.files['main.css'] = cssFileName
      }
        //
        // ADD DIST PATH BELOW.
        //
        //
      writeFileSync('', JSON.stringify(manifest, null, 2));
    }
  };
}
