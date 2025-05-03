/**
 * 判斷值是否為空
 * @description 參考 vee-validate required rule (https://github.com/logaretm/vee-validate/blob/main/packages/rules/src/required.ts)
 * @description 判斷值是否為空，包含 null, undefined, 空字串, 空陣列，不包含物件判斷。
 * @description 因為物件判斷為空 (Object.keys(value).length === 0) 有太多例外狀況， ex:時間物件(Date)，檔案物件 File(File, Blob, Image)，會回傳 true
 *
 * @param value 值
 * @returns 是否為空
 */
export function isEmpty(value: unknown): boolean {
  if (value === null || value === undefined) {
    // null or undefined
    return true
  }

  if (Array.isArray(value)) {
    // empty array
    return value.length === 0
  }

  // empty string
  return !String(value).trim().length
}
