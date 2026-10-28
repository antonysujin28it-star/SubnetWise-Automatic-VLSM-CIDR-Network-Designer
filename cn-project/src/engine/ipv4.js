/**
 * SubnetWise — IPv4 Mathematics Engine
 * Handles 32-bit unsigned arithmetic, conversions, masks, and binary representation.
 */

// Convert IPv4 string to 32-bit unsigned integer
function ipToInt(ip) {
  if (typeof ip !== 'string') return 0;
  const octets = ip.trim().split('.').map(Number);
  if (octets.length !== 4 || octets.some(o => isNaN(o) || o < 0 || o > 255)) {
    throw new Error(`Invalid IPv4 address: ${ip}`);
  }
  return ((octets[0] << 24) >>> 0) + ((octets[1] << 16) >>> 0) + ((octets[2] << 8) >>> 0) + (octets[3] >>> 0);
}

// Convert 32-bit unsigned integer to IPv4 string
function intToIp(intVal) {
  const uInt = Number(BigInt(intVal) & 0xffffffffn);
  const octet1 = (uInt >>> 24) & 255;
  const octet2 = (uInt >>> 16) & 255;
  const octet3 = (uInt >>> 8) & 255;
  const octet4 = uInt & 255;
  return `${octet1}.${octet2}.${octet3}.${octet4}`;
}

// Validate IPv4 address string
function isValidIp(ip) {
  if (typeof ip !== 'string') return false;
  const parts = ip.trim().split('.');
  if (parts.length !== 4) return false;
  for (const part of parts) {
    if (!/^\d+$/.test(part)) return false;
    const num = Number(part);
    if (num < 0 || num > 255 || (part.length > 1 && part.startsWith('0'))) {
      return false;
    }
  }
  return true;
}

// Validate CIDR prefix length (8 to 30)
function isValidCidr(cidr) {
  const num = Number(cidr);
  return Number.isInteger(num) && num >= 8 && num <= 30;
}

// Convert CIDR prefix (e.g. 24) to 32-bit subnet mask integer
function cidrToMaskInt(cidr) {
  if (cidr === 0) return 0;
  return ((0xffffffff << (32 - cidr)) >>> 0);
}

// Convert CIDR prefix to dotted decimal subnet mask string (e.g. 255.255.255.0)
function cidrToMask(cidr) {
  return intToIp(cidrToMaskInt(cidr));
}

// Convert CIDR prefix to wildcard mask string (e.g. 0.0.0.255)
function cidrToWildcard(cidr) {
  const maskInt = cidrToMaskInt(cidr);
  const wildcardInt = (~maskInt) >>> 0;
  return intToIp(wildcardInt);
}

// Convert IPv4 string to 32-bit dotted binary string (e.g. 11000000.10101000.00001010.00000000)
function ipToBinary(ip) {
  const octets = ip.trim().split('.').map(Number);
  return octets.map(o => o.toString(2).padStart(8, '0')).join('.');
}

// Format binary string with a visual separator between network bits and host bits
function formatBinaryWithSeparator(ip, cidr) {
  const rawBinary = ip.trim().split('.').map(o => Number(o).toString(2).padStart(8, '0')).join('');
  const netBits = rawBinary.slice(0, cidr);
  const hostBits = rawBinary.slice(cidr);
  
  // Group into octets with dot
  const formattedNet = [];
  const formattedHost = [];
  
  for (let i = 0; i < 32; i++) {
    const bit = rawBinary[i];
    const isNet = i < cidr;
    if (isNet) {
      formattedNet.push(bit);
      if ((i + 1) % 8 === 0 && i !== 31 && i + 1 < cidr) {
        formattedNet.push('.');
      }
    } else {
      if ((i) % 8 === 0 && i !== 0 && formattedHost.length > 0) {
        formattedHost.push('.');
      }
      formattedHost.push(bit);
    }
  }

  return {
    rawBinary,
    networkBits: netBits,
    hostBits: hostBits,
    networkBitCount: cidr,
    hostBitCount: 32 - cidr,
    formattedNetworkPart: formattedNet.join(''),
    formattedHostPart: formattedHost.join(''),
    fullWithSeparator: `${formattedNet.join('')} | ${formattedHost.join('')}`
  };
}

// Determine IPv4 address class (A, B, C, D, E)
function getNetworkClass(ip) {
  const firstOctet = Number(ip.split('.')[0]);
  if (firstOctet >= 1 && firstOctet <= 126) return { class: 'A', defaultCidr: 8, defaultMask: '255.0.0.0' };
  if (firstOctet === 127) return { class: 'Loopback', defaultCidr: 8, defaultMask: '255.0.0.0' };
  if (firstOctet >= 128 && firstOctet <= 191) return { class: 'B', defaultCidr: 16, defaultMask: '255.255.0.0' };
  if (firstOctet >= 192 && firstOctet <= 223) return { class: 'C', defaultCidr: 24, defaultMask: '255.255.255.0' };
  if (firstOctet >= 224 && firstOctet <= 239) return { class: 'D (Multicast)', defaultCidr: null, defaultMask: 'N/A' };
  return { class: 'E (Experimental)', defaultCidr: null, defaultMask: 'N/A' };
}

// Check if IP is in RFC 1918 private range
function isPrivateIp(ip) {
  const octets = ip.split('.').map(Number);
  if (octets[0] === 10) return true; // 10.0.0.0/8
  if (octets[0] === 172 && octets[1] >= 16 && octets[1] <= 31) return true; // 172.16.0.0/12
  if (octets[0] === 192 && octets[1] === 168) return true; // 192.168.0.0/16
  return false;
}

// Calculate comprehensive subnet details for any IPv4 address and CIDR prefix
function calculateSubnetDetails(ip, cidr) {
  if (!isValidIp(ip)) {
    throw new Error(`Invalid IP address: ${ip}`);
  }
  const cidrNum = Number(cidr);
  if (!isValidCidr(cidrNum)) {
    throw new Error(`CIDR prefix must be between 8 and 30, got: ${cidr}`);
  }

  const ipIntVal = ipToInt(ip);
  const maskInt = cidrToMaskInt(cidrNum);
  const networkInt = (ipIntVal & maskInt) >>> 0;
  const totalAddresses = 2 ** (32 - cidrNum);
  const broadcastInt = (networkInt + totalAddresses - 1) >>> 0;

  const networkAddress = intToIp(networkInt);
  const broadcastAddress = intToIp(broadcastInt);
  const subnetMask = intToIp(maskInt);
  const wildcardMask = cidrToWildcard(cidrNum);

  let firstHost = '';
  let lastHost = '';
  let usableHosts = 0;

  if (cidrNum <= 30) {
    firstHost = intToIp(networkInt + 1);
    lastHost = intToIp(broadcastInt - 1);
    usableHosts = totalAddresses - 2;
  } else {
    // Edge case if ever passed /31 or /32
    firstHost = networkAddress;
    lastHost = broadcastAddress;
    usableHosts = totalAddresses === 1 ? 1 : 2;
  }

  const binDetails = formatBinaryWithSeparator(networkAddress, cidrNum);
  const netClass = getNetworkClass(ip);

  return {
    ip: ip.trim(),
    cidr: cidrNum,
    network: networkAddress,
    networkInt,
    broadcast: broadcastAddress,
    broadcastInt,
    subnetMask,
    wildcardMask,
    totalAddresses,
    usableHosts,
    firstHost,
    lastHost,
    defaultGateway: firstHost,
    networkBits: cidrNum,
    hostBits: 32 - cidrNum,
    binary: ipToBinary(networkAddress),
    binaryInputIp: ipToBinary(ip),
    binaryDetails: binDetails,
    ipClass: netClass.class,
    defaultClassMask: netClass.defaultMask,
    isPrivate: isPrivateIp(ip)
  };
}

module.exports = {
  ipToInt,
  intToIp,
  isValidIp,
  isValidCidr,
  cidrToMaskInt,
  cidrToMask,
  cidrToWildcard,
  ipToBinary,
  formatBinaryWithSeparator,
  getNetworkClass,
  isPrivateIp,
  calculateSubnetDetails
};
