export class QueryHelper {
  static selectFields(fields: string, allowedFields: string[]) {
    if (!fields) return '';

    const requestedFields = fields.split(',').map((f) => f.trim());
    const selected = requestedFields.filter((f) => allowedFields.includes(f));

    if (selected.length === 0) return '';

    return selected.join(' ');
  }
}
