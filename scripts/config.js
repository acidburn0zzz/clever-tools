'use strict';

const archList = ['linux', 'macos', 'win'];
const nodeVersion = process.versions.node;
const releasesDir = 'releases';
const cellar = {
  host: 'cellar.services.clever-cloud.com',
  bucket: 'clever-tools',
};
const bintray = {
  subject: 'clevercloud',
  user: 'ci-clevercloud',
};
const appInfos = {
  name: 'clever-tools',
  vendor: 'Clever Cloud',
  url: 'https://github.com/CleverCloud/clever-tools',
  description: 'Command Line Interface for Clever Cloud.',
  license: 'MIT',
};

function getVersion (striclyFromTag = false) {
  const version = process.env.GIT_TAG_NAME;
  if (!version) {
    if (striclyFromTag) {
      throw new Error('Could not read version from git tag!');
    }
    return process.env.GIT_BRANCH;
  }
  return version.trim();
}

function getBinaryFilename (arch) {
  return (arch === 'win') ? `clever.exe` : 'clever';
}

function getBinaryFilepath (arch) {
  const version = getVersion();
  const filename = getBinaryFilename(arch);
  return `${releasesDir}/${version}/${arch}/${filename}`;
}

function getArchiveFilepath (arch) {
  const version = getVersion();
  const archiveExt = (arch === 'win') ? '.zip' : '.tar.gz';
  return `${releasesDir}/${version}/${appInfos.name}-${version}_${arch}${archiveExt}`;
}

function getBundleFilepath (type) {
  const version = getVersion();
  return `${releasesDir}/${version}/${appInfos.name}-${version}.${type}`;
}

function getBintrayApiKey () {
  const apiKey = process.env.BINTRAY_API_KEY;
  if (!apiKey) {
    throw new Error('Could not read bintray API key!');
  }
  return apiKey;
}

module.exports = {
  archList,
  nodeVersion,
  releasesDir,
  cellar,
  bintray,
  appInfos,
  getVersion,
  getBinaryFilepath,
  getArchiveFilepath,
  getBundleFilepath,
  getBintrayApiKey,
};