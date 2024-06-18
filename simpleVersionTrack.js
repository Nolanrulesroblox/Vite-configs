import { promises as fs } from 'fs';
import path from 'path';

async function incrementMinorVersion(distDir) {
  const versionFilePath = path.resolve(distDir, 'version.txt');
  let version = '1.0.0';

  try {
    await fs.access(versionFilePath);
    const currentVersion = await fs.readFile(versionFilePath, 'utf-8');
    version = currentVersion.trim();
  } catch {
    // If file doesn't exist, default version will be used
  }

  const versionParts = version.split('.').map(Number);
  versionParts[1] += 1; // Increment the minor version
  const newVersion = versionParts.join('.');

  await fs.writeFile(versionFilePath, newVersion, 'utf-8');
  return newVersion;
}

export default function versionPlugin() {
  return {
    name: 'vite-plugin-version',
    async config() {
      const distDir = path.resolve(process.cwd(),"public");
      const version = await incrementMinorVersion(distDir);
      return {
        define: {
          'process.env.VERSION': JSON.stringify(version),
        },
      };
    },
  };
}
