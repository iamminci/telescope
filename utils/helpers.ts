export function abridgeAddress(address?: string) {
  if (!address) return address;
  const l = address.length;
  if (l < 20) return address;
  return `${address.substring(0, 6)}...${address.substring(l - 6, l)}`;
}

export function abridgeAddressPie(address?: string) {
  if (!address) return address;
  const l = address.length;
  if (l < 20) return address;
  return `${address.substring(0, 3)}...${address.substring(l - 2, l)}`;
}

export function abridgeMethod(address?: string) {
  if (!address) return address;
  const l = address.length;
  if (l < 20) return address;
  return `${address.substring(0, 17)}...`;
}

export function convertCamelCaseToWords(str: string) {
  return str.replace(/([A-Z])/g, " $1").replace(/^./, function (str) {
    return str.toUpperCase();
  });
}

export function removeWhitespaceAroundString(str: string) {
  return str.replace(/^\s+|\s+$/g, "");
}
