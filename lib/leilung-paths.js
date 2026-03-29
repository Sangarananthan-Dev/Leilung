export function departmentPath(dept) {
  return `/${dept}`;
}

export function districtPath(dept, districtId) {
  return `/${dept}/${districtId}`;
}

export function foodShopPath(districtId, shopId) {
  return `/food/${districtId}/fps/${shopId}`;
}

export function landCasePath(districtId, caseId) {
  return `/land/${districtId}/case/${caseId}`;
}

export function printingOrderPath(districtId, orderId) {
  return `/printing/${districtId}/order/${orderId}`;
}
